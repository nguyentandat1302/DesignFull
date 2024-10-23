import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { useMyContextController } from "../../Context";

    const AddService = ({ navigation }) => {
      const [controller] = useMyContextController();  
      const { userLogin } = controller;
      const [serviceName, setServiceName] = useState("");
      const [price, setPrice] = useState("");
      const [image, setImage] = useState("");

      const hasErrorServiceName = () => serviceName === "";
      const hasErrorPrice = () => price <= 0 || price === "";

      const SERVICES = firestore().collection("SERVICES");

      const handleAddNewService = () => {
        if (hasErrorServiceName() || hasErrorPrice()) {
          Alert.alert("Invalid Input", "Please fill all fields correctly.");
          return;
        }

        SERVICES.add({
          serviceName,
          price: parseFloat(price),
          create: userLogin.email,
        })
          .then(response => {
            const refImage = storage().ref(`/services/${response.id}.png`);

            if (image !== "") {
              refImage
                .putFile(image)
                .then(() => {
                  return refImage.getDownloadURL();
                })
                .then(link => {
                  SERVICES.doc(response.id).update({
                    id: response.id,
                    image: link,
                  });
                  navigation.navigate("services");
                })
                .catch(e => console.log("Image upload error: ", e.message));
            } else {
              SERVICES.doc(response.id).update({
                id: response.id,
              });
              navigation.navigate("services");
            }
          })
          .catch(e => console.log("Service creation error: ", e.message));
      };

      const handleUploadImage = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 300,
          cropping: true,
          mediaType: "photo",
        })
          .then(image => {
            setImage(image.path);
          })
          .catch(e => console.log("Image picker error: ", e.message));
      };

      return (
        <View style={{ flex: 1, padding: 10 }}>
          <Button mode="contained" onPress={handleUploadImage}>
            Upload Image
          </Button>

          {image !== "" && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }}
            />
          )}

          <TextInput
            label="Input service name"
            value={serviceName}
            onChangeText={setServiceName}
            style={{ marginTop: 10 }}
          />
          <HelperText type="error" visible={hasErrorServiceName()}>
            Service Name cannot be empty
          </HelperText>

          <TextInput
            label="Input price"
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
            onPress={handleAddNewService}
            disabled={hasErrorServiceName() || hasErrorPrice()}
            style={{ marginTop: 20 }}
          >
            Add New Service
          </Button>
        </View>
      );
    };

export default AddService;
