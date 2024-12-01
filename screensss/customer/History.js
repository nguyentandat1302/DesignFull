import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const navigation = useNavigation();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu từ Firestore
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const snapshot = await firestore().collection('PAYMENTS').get();
        const paymentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPayments(paymentData);
      } catch (err) {
        setError('Failed to load payment history');
        console.error('Error fetching payment history: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Render dữ liệu
  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentItem}
      onPress={() => {
        // Điều hướng tới màn hình Bill hoặc BillCorn tùy vào trường "billType"
        if (item.billType === 'bill') {
          navigation.navigate('bill', {
            serviceName: item.serviceName,
            amount: item.amount,
            selectedSeats: item.selectedSeats,
            selectedTime: item.selectedTime,
          });
        } else if (item.billType === 'billcorn') {
          navigation.navigate('billCorn', {
            serviceName: item.serviceName,
            amount: item.amount,
            selectedSeats: item.selectedSeats,
            selectedTime: item.selectedTime,
          });
        }
      }}
    >
      <Text style={styles.paymentText}>Service: {item.serviceName}</Text>
      <Text style={styles.paymentText}>Amount: {item.amount} VND</Text>
      <Text style={styles.paymentText}>Date: {new Date(item.paymentDate?.toDate()).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  // Nếu đang tải hoặc có lỗi
  if (loading) {
    return <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        renderItem={renderPaymentItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  paymentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default History;
