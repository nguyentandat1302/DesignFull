import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const customers = [
  { id: '1', name: 'Nguyen Van A', phone: '0987654321', address: '123 Nguyen Trai' },
  { id: '2', name: 'Tran Thi B', phone: '0976543210', address: '456 Le Loi' },
  { id: '3', name: 'Le Van C', phone: '0965432109', address: '789 Phan Chu Trinh' },
  // Thêm các khách hàng khác
];

const Customer = ({ navigation }) => {
  
  const renderCustomer = ({ item }) => (
    <View style={styles.customerCard}>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerPhone}>Phone: {item.phone}</Text>
        <Text style={styles.customerAddress}>Address: {item.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditCustomer', { customerId: item.id })}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDelete = (id) => {
    // Logic để xóa khách hàng
    alert(`Deleted customer with ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer List</Text>
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F50057',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  customerCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flex: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  customerPhone: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  customerAddress: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Customer;
