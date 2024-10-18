import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

const Option = () => {
    const handleUpdateProfile = () => {
        Alert.alert("Update Profile clicked");
    };

    const handleChangeLanguage = () => {
        Alert.alert("Change Language clicked");
    };

    const handleSignOut = () => {
        Alert.alert("Sign Out clicked");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.itemContainer} onPress={handleUpdateProfile}>
                <Text style={styles.itemText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={handleChangeLanguage}>
                <Text style={styles.itemText}>Change Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={handleSignOut}>
                <Text style={styles.itemText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Light gray background for better contrast
        padding: 20,
    },
    itemContainer: {
        padding: 15,
        backgroundColor: '#ffffff', // White background for each item
        borderRadius: 10, // Rounded corners
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 15, // Space between items
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold', // Bold text for better visibility
    },
});

export default Option;
