import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const transactions = [
  { id: '1', name: 'Facial Treatment', price: '250.000 ₫', date: '2024-10-01', status: 'Completed' },
  { id: '2', name: 'Hair Spa', price: '150.000 ₫', date: '2024-10-05', status: 'Pending' },
  { id: '3', name: 'Skin Care', price: '300.000 ₫', date: '2024-10-07', status: 'Completed' },
  { id: '4', name: 'Massage', price: '400.000 ₫', date: '2024-10-08', status: 'Cancelled' },
];

const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        selectedTransaction === item.id && styles.selectedTransaction,
      ]}
      onPress={() => setSelectedTransaction(item.id)}
    >
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionPrice}>{item.price}</Text>
      </View>
      <View style={styles.transactionMeta}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text
          style={[
            styles.transactionStatus,
            item.status === 'Completed'
              ? styles.completed
              : item.status === 'Pending'
              ? styles.pending
              : styles.cancelled,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    color: '#F50057',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionItem: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderColor: '#F50057',
  },
  selectedTransaction: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F50057',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completed: {
    color: '#4CAF50',
  },
  pending: {
    color: '#FF9800',
  },
  cancelled: {
    color: '#F44336',
  },
});

export default Transaction;
