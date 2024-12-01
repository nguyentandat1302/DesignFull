import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const CustomerDetail = ({ route, navigation }) => {
    const { userId } = route.params; // Lấy ID người dùng từ navigation
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doc = await firestore().collection("USERS").doc(userId).get();
                if (doc.exists) {
                    setUserData(doc.data());
                } else {
                    Alert.alert("Error", "User data not found.");
                    navigation.goBack(); // Quay lại màn hình trước nếu không tìm thấy người dùng
                }
            } catch (error) {
                Alert.alert("Error", "Failed to fetch user data.");
            }
        };
        fetchData();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            await firestore().collection("USERS").doc(userId).update(userData);
            Alert.alert("Success", "User data updated successfully.");
            navigation.goBack(); // Quay lại màn hình trước sau khi cập nhật thành công
        } catch (error) {
            Alert.alert("Error", "Failed to update user data.");
        }
    };

    const handleChange = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Edit User Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={userData.fullName}
                onChangeText={(value) => handleChange("fullName", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={userData.email}
                keyboardType="email-address"
                onChangeText={(value) => handleChange("email", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={userData.phone}
                keyboardType="phone-pad"
                onChangeText={(value) => handleChange("phone", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={userData.address}
                onChangeText={(value) => handleChange("address", value)}
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
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
    input: {
        height: 50,
        borderColor: "#dfe6e9",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: "#ffffff",
        fontSize: 16,
    },
    updateButton: {
        backgroundColor: "#27ae60",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    updateButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default CustomerDetail;
