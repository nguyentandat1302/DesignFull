import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PayPal = ({ route, navigation }) => {
  const { serviceName, amount, time, date, seats } = route.params;

  const handleConfirmPayment = () => {
    // Logic for confirming payment
    alert("Payment confirmed! Thank you for your purchase.");
    navigation.navigate("Home"); // Navigate back to home or another screen after payment
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon name="payment" size={40} color="#fff" />
        <Text style={styles.headerText}>Payment Details</Text>
      </View>
      <View style={styles.detailsCard}>
        <Text style={styles.label}>Service Name:</Text>
        <Text style={styles.value}>{serviceName}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{amount} VND</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.label}>Selected Seats:</Text>
        <Text style={styles.value}>{seats.join(", ")}</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmText}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FF5722",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PayPal;
