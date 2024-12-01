import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const BillCorn = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { serviceName, price, selectedDate, selectedTime, image } = route.params;

  // State cho hoạt hình
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Hiệu ứng scale cho hình tròn
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Hiệu ứng vòng tròn */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.checkMark}>✓</Text>
        </Animated.View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment Successful</Text>
      </View>

      {/* Hóa đơn */}
      <View style={styles.billContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.label}>Service Name:</Text>
          <Text style={styles.value}>{serviceName}</Text>

          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{price} VND</Text>

          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(selectedDate).toLocaleDateString()}
          </Text>

          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {new Date(selectedTime).toLocaleTimeString()}
          </Text>
        </View>
      </View>

      {/* Nút điều hướng */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('servicescustomer')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  checkMark: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  billContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BillCorn;
