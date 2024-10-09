import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const services = [
  { id: '1', name: 'Chăm sóc da mặt và dưỡng ẩm tự nhiên', price: '250.000 đ' },
  { id: '2', name: 'Gội đầu dưỡng sinh trung hoa', price: '150.000 đ' },
  { id: '3', name: 'Lột mụn', price: '40.000 đ' },
  { id: '4', name: 'Gội đầu dưỡng sinh trọn gói tất cả dịch vụ', price: '400.000 đ' },
  { id: '5', name: 'Dịch vụ rửa mặt', price: '100.000 đ' },
  { id: '6', name: 'Dịch vụ đánh răng', price: '50.000 đ' },
];

const ServiceScreen = () => {

  const renderItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tiêu đề và biểu tượng người dùng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUYỀN TRINH</Text>
        <Text style={styles.userIcon}>👤</Text>
      </View>

      {/* Logo */}
      <Image source={require('../image/Spa.png')} style={styles.logo} />


      {/* Danh sách dịch vụ */}
      <View style={styles.serviceListContainer}>
        <Text style={styles.serviceListTitle}>Danh sách dịch vụ</Text>
        <Text style={styles.addIcon}>➕</Text>
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.serviceList}
      />

      {/* Thanh điều hướng dưới */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💳</Text>
          <Text>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👥</Text>
          <Text>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#F50057',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  userIcon: {
    fontSize: 30,
    color: '#fff',
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  serviceListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  serviceListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addIcon: {
    fontSize: 24,
    color: '#F50057',
  },
  serviceList: {
    paddingHorizontal: 20,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F50057',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});

export default ServiceScreen;
