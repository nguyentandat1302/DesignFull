import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const Checkout = ({ route, navigation }) => {
  const { serviceName, price, selectedTime, selectedSeats } = route.params;

  const handleConfirm = () => {
    // Xử lý logic thanh toán hoặc điều hướng về trang khác
    alert("Payment successful!");
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Service Name:</Text>
        <Text style={styles.value}>{serviceName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{price} VND</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{selectedTime}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Seats:</Text>
        <Text style={styles.value}>{selectedSeats.join(", ")}</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Payment</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  confirmText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Checkout;
