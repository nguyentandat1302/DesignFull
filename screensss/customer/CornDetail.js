import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TextInput, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CornDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params; // Lấy dữ liệu từ tham số (đã được truyền từ ServicesCustomer)

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Lưu ngày tháng và thông tin vào Firestore
  const saveToFirestore = async () => {
    try {
      const serviceDetails = {
        serviceName: item.serviceName,
        price: item.price,
        image: item.image,
        selectedDate,
        selectedTime,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection('PAYMENTS').doc(item.id).set(serviceDetails);
  
      console.log('Data saved successfully!');
      navigation.navigate('billcorn', {
        serviceName: item.serviceName,
        price: item.price,
        selectedDate,
        selectedTime,
        image: item.image,
      }); // Điều hướng đến màn hình BillCorn với dữ liệu
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };
  

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị hình ảnh và thông tin dịch vụ */}
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.serviceName}>{item.serviceName}</Text>
      <Text style={styles.price}>{item.price} VND</Text>

      {/* Chọn ngày */}
      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {selectedDate.toLocaleDateString() || 'Choose Date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={selectedDate}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Chọn giờ */}
      <Text style={styles.label}>Select Time</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeButtonText}>
          {selectedTime.toLocaleTimeString() || 'Choose Time'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={selectedTime}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Nút thanh toán */}
      <Button title="Proceed to Payment" onPress={saveToFirestore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  dateButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timeButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CornDetail;
