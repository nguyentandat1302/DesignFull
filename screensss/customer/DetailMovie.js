import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import Modal from "react-native-modal";

const DetailMovie = ({ route, navigation }) => {
  const { item } = route.params;
  const [serviceData, setServiceData] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState({});
  const [showTimes, setShowTimes] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceDoc = await firestore().collection("SERVICES").doc(item.id).get();
        if (serviceDoc.exists) {
          const data = serviceDoc.data();
          setServiceData(data);
          setTrailerUrl(data.trailer);
          setShowTimes(data.showTimes || {});
        }

        const bookedSeatsSnapshot = await firestore().collection("BOOKED_SEATS").doc(item.id).get();
        if (bookedSeatsSnapshot.exists) {
          setBookedSeats(bookedSeatsSnapshot.data()?.seats || {});
        }
      } catch (error) {
        console.error("Error fetching service data: ", error);
      }
    };

    fetchServiceData();
  }, [item.id]);

  const toggleFavorite = async () => {
    try {
      const newFavoriteStatus = !favorite;
      setFavorite(newFavoriteStatus);

      await firestore().collection("FAVORITES").doc(item.id).set({
        ...serviceData,
        isFavorite: newFavoriteStatus,
      });
    } catch (error) {
      console.error("Error updating favorite: ", error);
    }
  };

  const handleSeatSelect = (seatNumber) => {
    if (!bookedSeats[selectedTime]?.includes(seatNumber)) {
      setSelectedSeats((prev) =>
        prev.includes(seatNumber) ? prev.filter((seat) => seat !== seatNumber) : [...prev, seatNumber]
      );
    }
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0 || !selectedTime) {
      alert("Please select a seat and a time.");
      return;
    }

    try {
      await firestore().collection("PAYMENTS").add({
        serviceId: item.id,
        userId: "USER_ID",
        paymentDate: firestore.FieldValue.serverTimestamp(),
        seats: selectedSeats,
        time: selectedTime,
      });

      await firestore().collection("BOOKED_SEATS").doc(item.id).set(
        {
          seats: {
            ...bookedSeats,
            [selectedTime]: [...(bookedSeats[selectedTime] || []), ...selectedSeats],
          },
        },
        { merge: true }
      );

      setBookedSeats((prev) => ({
        ...prev,
        [selectedTime]: [...(prev[selectedTime] || []), ...selectedSeats],
      }));

      setSelectedSeats([]);
      setSelectedTime(null);

      // Navigate to Bill.js with payment details
      navigation.navigate("bill", {
        serviceName: serviceData.serviceName,
        amount: serviceData.price,
        selectedSeats: selectedSeats,
        selectedTime: selectedTime,
      });
    } catch (error) {
      console.error("Error processing payment: ", error);
    }
  };

  const renderSeat = (seatLabel) => {
    const isBooked = bookedSeats[selectedTime]?.includes(seatLabel);
    const isSelected = selectedSeats.includes(seatLabel);
    return (
      <TouchableOpacity
        key={seatLabel}
        style={[
          styles.seatOption,
          isBooked ? styles.seatBooked : isSelected ? styles.seatSelected : styles.singleSeat,
        ]}
        onPress={() => handleSeatSelect(seatLabel)}
        disabled={isBooked}
      >
        <Icon name="event-seat" size={24} color={isBooked ? "#BDBDBD" : "#FFF"} />
        <Text style={styles.seatText}>{seatLabel}</Text>
      </TouchableOpacity>
    );
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  if (!serviceData) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: serviceData.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{serviceData.serviceName}</Text>
        <Text style={styles.price}>{serviceData.price} VND</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon name={favorite ? "favorite" : "favorite-border"} size={30} color={favorite ? "red" : "gray"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookNowButton} onPress={showModal}>
          <Text style={styles.bookNowText}>Watch Trailer</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{serviceData.description}</Text>
      <Text style={styles.duration}>Duration: {serviceData.duration}</Text>

      <Modal isVisible={isModalVisible} onBackdropPress={hideModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Trailer</Text>
          {trailerUrl ? (
            <Video source={{ uri: trailerUrl }} style={styles.video} controls={true} resizeMode="contain" />
          ) : (
            <Text>No trailer available.</Text>
          )}
          <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.sectionTitle}>Select Time</Text>
      {Object.keys(showTimes).length > 0 ? (
        Object.keys(showTimes).map((day, index) => (
          <View key={index} style={styles.timeSection}>
            <Text style={styles.dayText}>{day}</Text>
            <ScrollView horizontal style={styles.timeContainer}>
              {showTimes[day].map((time, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.timeButton, selectedTime === time ? styles.timeSelected : null]}
                  onPress={() => handleSelectTime(time)}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))
      ) : (
        <Text style={styles.noTimeText}>No showtimes available</Text>
      )}

      <Text style={styles.sectionTitle}>Select Seats</Text>
      <View style={styles.seatSection}>
        {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
          <View key={row} style={styles.row}>
            {[1, 2, 3, 4, 5].map((num) => renderSeat(`${row}${num}`))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentText}>PAYMENT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  duration: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginVertical: 10,
  },
  seatSection: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  seatOption: {
    width: 60,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  seatBooked: {
    backgroundColor: "#BDBDBD",
  },
  seatSelected: {
    backgroundColor: "#FF5722",
  },
  singleSeat: {
    backgroundColor: "#2196F3",
  },
  seatText: {
    marginTop: 5,
    color: "#FFF",
    fontSize: 14,
  },
  timeSection: {
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
  },
  timeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#2196F3",
    marginRight: 10,
  },
  timeSelected: {
    backgroundColor: "#FF5722",
  },
  timeText: {
    color: "#FFF",
  },
  noTimeText: {
    fontSize: 16,
    color: "#888",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  video: {
    width: 320,
    height: 180,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 5,
  },
  closeText: {
    color: "#FFF",
    fontSize: 16,
  },
  bookNowButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 5,
    alignItems: "center",
  },
  bookNowText: {
    color: "#FFF",
    fontSize: 18,
  },
  paymentButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  paymentText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default DetailMovie;
