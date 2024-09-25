import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => (
  <View style={styles.centered}>
    <Text style={styles.title}>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.centered}>
    <Text style={styles.title}>Settings Screen</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()} // Open Drawer
      >
        <MaterialIcons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Home Screen</Text>

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // Navigate to Profile Screen
      />

      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')} // Navigate to Settings Screen
        color="green"
      />

      <Button
        title="Logout"
        onPress={() => alert('Logging out...')}
        color="red"
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, // Ẩn tiêu đề ở trang HomeScreen
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    
      <Drawer.Navigator initialRouteName="HomeStack">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
});

export default App;
