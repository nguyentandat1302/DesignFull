import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import ContactThumbnail from "../components/ContactThumbnail";
import { fetchUserContact } from '../utils/api';

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation(); // Hook to use navigation

  // Load data when the component mounts
  useEffect(() => {
    fetchUserContact()
      .then(users => {
        setUser(users);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Option')}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3524/3524636.png' }} 
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oops! Something went wrong.</Text>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png' }} 
            style={styles.errorImage} 
          />
        </View>
      )}

      {!loading && !error && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00FFFF", 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: "#FFD700", // Gold color for loading text
    fontSize: 16,
    fontStyle: 'italic',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: "#FF6347", // Red-orange for error text
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorImage: {
    width: 80,
    height: 80,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

export default User;
