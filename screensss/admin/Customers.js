import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Customers = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("USERS")
            .onSnapshot(snapshot => {
                const userList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            });

        return () => unsubscribe();
    }, []);

    const deleteUser = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await firestore().collection("USERS").doc(id).delete();
                            Alert.alert("Success", "User deleted successfully.");
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete user.");
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <TouchableOpacity
                onPress={() => navigation.navigate("customerdetail", { userId: item.id })}
                style={{ flex: 1 }}
            >
                <Text style={styles.textBold}>Full Name: {item.fullName}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Phone: {item.phone}</Text>
                <Text>Address: {item.address}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(item.id)}
            >
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Users</Text>
            <FlatList
                data={users}
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
    userCard: {
        flexDirection: "row",
        alignItems: "center",
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
    deleteButton: {
        marginLeft: 10,
        backgroundColor: "#e74c3c",
        borderRadius: 50,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
    deleteButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Customers;
