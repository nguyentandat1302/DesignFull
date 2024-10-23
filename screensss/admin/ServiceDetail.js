import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Button, Dialog, HelperText, IconButton, Portal, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
// Em chỉnh sua hết nhé
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { useMyContextController } from "../../Context";

    const ServiceDetail = ({ navigation, route }) => {
      const {id} = route.params.item
      const [controller] = useMyContextController();
      const { userLogin } = controller;
      const [service,setServices] = useState ({})
      const hasErrorServiceName = () => service.serviceName === "";
      const hasErrorPrice = () => service.price <= 0 || service.price === "";
      const SERVICES = firestore().collection("SERVICES");

      const [visible, setVisible] = useState(false)
      const hideDialog = () => setVisible(false)

      useEffect(() =>{
        SERVICES.doc(id)
        .onSnapshot(response => setServices(response.data()))
    },[])

      const handleUpdateService = () =>{
          const refImage = storage().ref("/services/" + id + ".png")
          refImage.putFile(service.image)
          .then(() =>{
            refImage.getDownloadURL()
            .then(link =>{
              SERVICES.doc(id)
               .update({...service, create: userLogin.email, image: link})
            })
            navigation.navigate("services")
          })
          .catch(e => console.log(e.message))
      }

      const handleUploadImage = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 300,
          cropping: true,
          mediaType: "photo",
        })
          .then(response => setServices({...service, image: response.path}))
          .catch(e => console.log("Image picker error: ", e.message));
      };
      useLayoutEffect(()=>{
          navigation.setOptions({
            headerRight: (props) => <IconButton icon={"delete"} {...props} 
                onPress={()=> setVisible(true)}
            />
          })
      },[])


     const  handleDeleteService = () =>{
          SERVICES.doc(id).delete()
          .then(() => navigation.navigate("services"))
     }

      return (
        (service!=null)&& 
        <View style={{ flex: 1, padding: 10 }}>
          <Button mode="contained" onPress={handleUploadImage}>
            Upload Image
          </Button>

          {((service.image !== "") && (<Image source={{ uri: service.image }}
              style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }}
            /> ))}

          <TextInput
            label="Input service name"
            value={service.serviceName}
            onChangeText={(text) => setServices({...service,serviceName: text})} 
            style={{ marginTop: 10 }}
          />
          <HelperText type="error" visible={hasErrorServiceName()}>
            Service Name cannot be empty
          </HelperText>

          <TextInput
            label="Input price"
            value={service.price}
            onChangeText={(text) => setServices({...service, price: text})} 
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
            <Portal>
                <Dialog visible={visible} onDismiss = {hideDialog}>
                <Dialog.Title>Confirm Delete Service</Dialog.Title>
                <Dialog.Content>
                <Text variant="bodyMedium">Do you want delete Service ?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={handleDeleteService}>Yes</Button>
                <Button onPress={hideDialog}>No</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
      );
    };

export default ServiceDetail;
