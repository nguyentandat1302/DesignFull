import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon"; // Confetti effect

const Bill = ({ route }) => {
  const navigation = useNavigation();
  const { serviceName, amount, selectedSeats, selectedTime } = route.params || {};
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const paymentSnapshot = await firestore()
          .collection("PAYMENTS")
          .where("serviceId", "==", serviceName)
          .get();

        if (!paymentSnapshot.empty) {
          const paymentData = paymentSnapshot.docs[0].data();
          setPaymentDetails(paymentData);
        } else {
          setPaymentDetails(null);
        }
      } catch (err) {
        setError("Error fetching payment details.");
        console.error("Error fetching payment details: ", err);
      } finally {
        setLoading(false);
        setConfettiActive(true);
      }
    };

    fetchPaymentDetails();
  }, [serviceName]);

  if (loading) {
    return <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {confettiActive && (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut={true} />
      )}

      <View style={styles.card}>
        <FontAwesome name="check-circle" size={50} color="green" style={styles.icon} />
        <Text style={styles.title}>Payment Succeeded!</Text>
        <Text style={styles.subtitle}>
          Thank you for processing your most recent payment.
        </Text>
        <Text style={styles.subtitle}>
          Your premium subscription will expire on{" "}
          {paymentDetails?.paymentDate?.toDate().toLocaleDateString() || "N/A"}.
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.infoText}>Service: {serviceName || "N/A"}</Text>
        <Text style={styles.infoText}>Amount: {amount || "N/A"} VND</Text>
        <Text style={styles.infoText}>Time: {selectedTime || "N/A"}</Text>
        <Text style={styles.infoText}>
          Seats: {selectedSeats?.join(", ") || "N/A"}
        </Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("servicescustomer")}
      >
        <Text style={styles.buttonText}>Your Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 24,
  },
  details: {
    width: "90%",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    lineHeight: 22,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Bill;
