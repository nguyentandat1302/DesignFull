import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditService = ({ route, navigation }) => {
  const { serviceName: initialServiceName, price: initialPrice } = route.params;

  const [serviceName, setServiceName] = useState(initialServiceName);
  const [price, setPrice] = useState(initialPrice);

  const handleEditService = () => {
    // Xử lý logic cập nhật dịch vụ tại đây
    console.log(`Updated Service Name: ${serviceName}, Updated Price: ${price}`);
    // Bạn có thể thêm logic để quay lại hoặc thông báo thành công
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề màn hình */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Service</Text>
      </View>

      {/* Form nhập thông tin dịch vụ */}
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Input a service name"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Nút cập nhật dịch vụ */}
        <TouchableOpacity style={styles.updateButton} onPress={handleEditService}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#F50057',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditService;
