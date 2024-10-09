import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ServiceDetail = ({ route, navigation }) => {
  // Dữ liệu nhận từ route khi điều hướng từ màn hình khác (ví dụ: từ danh sách dịch vụ)
  const { serviceName, price } = route.params;

  return (
    <View style={styles.container}>
      {/* Tiêu đề màn hình */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Detail</Text>
      </View>

      {/* Chi tiết dịch vụ */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Service Name</Text>
        <Text style={styles.value}>{serviceName}</Text>

        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>{price} ₫</Text>
      </View>

      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#F50057',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  detailContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#F50057',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceDetail;
