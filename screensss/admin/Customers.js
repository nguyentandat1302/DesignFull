import { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Customers = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("USERS")
            .where("role", "==", "customer") 
            .onSnapshot(snapshot => {
                const customerList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCustomers(customerList);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.customerCard}
            onPress={() => navigation.navigate("customerdetail", { customerId: item.id })}
        >
            <Text style={styles.textBold}>Full Name: {item.fullName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Address: {item.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Customers</Text>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f4f6f7", 
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#2c3e50", 
        textAlign: "center", 
    },
    customerCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#dfe6e9", 
        backgroundColor: "#ffffff", 
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4, 
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#34495e",
    },
});

export default Customers;
