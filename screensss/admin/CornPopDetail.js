import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { Button, HelperText, TextInput, IconButton } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";

const CornPopDetail = ({ route, navigation }) => {
  const { item } = route.params; // Dữ liệu được truyền từ danh sách
  const [serviceName, setServiceName] = useState(item.serviceName || "");
  const [price, setPrice] = useState(item.price.toString() || "");
  const [image, setImage] = useState(item.image || "");
  const [newImage, setNewImage] = useState(""); // Lưu trữ hình ảnh mới nếu có

  const CORNPOP = firestore().collection("CORNPOP");

  const hasErrorServiceName = () => serviceName === "";
  const hasErrorPrice = () => price <= 0 || price === "";

  // Lấy dữ liệu chi tiết dịch vụ (nếu cần thiết)
  useEffect(() => {
    const fetchData = async () => {
      const doc = await CORNPOP.doc(item.id).get();
      if (doc.exists) {
        const data = doc.data();
        setServiceName(data.serviceName);
        setPrice(data.price.toString());
        setImage(data.image);
      }
    };
    fetchData();
  }, [item.id]);

  const handleUpdateService = async () => {
    if (hasErrorServiceName() || hasErrorPrice()) {
      Alert.alert("Invalid Input", "Please fill all fields correctly.");
      return;
    }

    const updatedData = {
      serviceName,
      price: parseFloat(price),
    };

    if (newImage !== "") {
      const refImage = storage().ref(`/services/${item.id}.png`);
      try {
        await refImage.putFile(newImage);
        const link = await refImage.getDownloadURL();
        updatedData.image = link; // Cập nhật link hình ảnh mới
      } catch (e) {
        console.log("Image upload error: ", e.message);
        Alert.alert("Error", "Failed to upload image.");
        return;
      }
    }

    try {
      await CORNPOP.doc(item.id).update(updatedData);
      Alert.alert("Success", "Service updated successfully.");
      navigation.goBack(); // Quay về trang trước đó
    } catch (e) {
      console.log("Update error: ", e.message);
      Alert.alert("Error", "Failed to update service.");
    }
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      mediaType: "photo",
    })
      .then(image => {
        setNewImage(image.path);
      })
      .catch(e => console.log("Image picker error: ", e.message));
  };

  const handleDeleteService = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this service?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Xóa ảnh nếu có
              if (image) {
                const refImage = storage().ref(`/services/${item.id}.png`);
                await refImage.delete();
              }

              // Xóa dữ liệu Firestore
              await CORNPOP.doc(item.id).delete();
              Alert.alert("Success", "Service deleted successfully.");
              navigation.goBack(); // Quay lại màn hình trước
            } catch (e) {
              console.log("Delete error: ", e.message);
              Alert.alert("Error", "Failed to delete service.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button mode="contained" onPress={handleUploadImage}>
          Upload New Image
        </Button>
        <IconButton
          icon="delete"
          color="red"
          size={30}
          onPress={handleDeleteService}
        />
      </View>

      {newImage !== "" ? (
        <Image
          source={{ uri: newImage }}
          style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }}
        />
      ) : (
        image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }}
          />
        )
      )}

      <TextInput
        label="Service Name"
        value={serviceName}
        onChangeText={setServiceName}
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorServiceName()}>
        Service Name cannot be empty
      </HelperText>

      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorPrice()}>
        Price must be greater than 0
      </HelperText>

      <Button
        mode="contained"
        onPress={handleUpdateService}
        disabled={hasErrorServiceName() || hasErrorPrice()}
        style={{ marginTop: 20 }}
      >
        Update Service
      </Button>
    </ScrollView>
  );
};

export default CornPopDetail;
