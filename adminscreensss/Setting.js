import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';

const Setting = ({ navigation }) => {
  const [isNotificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [isDarkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.option}>
          <Text style={styles.optionText}>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>Language</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Text style={[styles.optionText, { color: '#F44336' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    color: '#F50057',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Setting;
