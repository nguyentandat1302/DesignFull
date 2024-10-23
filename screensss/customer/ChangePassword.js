import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    const user = auth().currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    // Check if new password matches confirmation
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);

    user.reauthenticateWithCredential(credential)
      .then(() => {
        user.updatePassword(newPassword)
          .then(() => {
            Alert.alert("Success", "Password has been updated.");
            navigation.navigate('setting');  // Navigate to Profile or another screen after success
          })
          .catch(error => {
            console.error("Error updating password: ", error);
            Alert.alert("Error", error.message);
          });
      })
      .catch(error => {
        console.error("Re-authentication Error: ", error);
        Alert.alert("Error", "The old password is incorrect.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Change Password</Text>

      <Text style={styles.label}>Old Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your old password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your new password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
        <Text style={styles.changeButtonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F50057',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  changeButton: {
    backgroundColor: '#F50057',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
