import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View, FlatList } from "react-native"; 
import { Button, Dialog, HelperText, IconButton, Portal, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { useMyContextController } from "../../Context";

const ServiceDetail = ({ navigation, route }) => {
  const { id } = route.params.item;
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  const [service, setService] = useState({
    serviceName: '',
    description: '',
    price: 0,
    duration: 0,
    image: '', 
    showTimes: {},
  });
  const [visible, setVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const SERVICES = firestore().collection("SERVICES");

  const hideDialog = () => setVisible(false);

  const hasErrorServiceName = () => service.serviceName.trim() === "";
  const hasErrorDescription = () => service.description.trim() === "";
  const hasErrorPrice = () => service.price <= 0 || service.price === "";
  const hasErrorDuration = () => service.duration <= 0 || service.duration === "";

  useEffect(() => {
    // Fetch service details
    const unsubscribeService = SERVICES.doc(id).onSnapshot(response => {
      setService(prevService => ({
        ...prevService,
        ...response.data(),
      }));
    });

    // Fetch addresses
    const unsubscribeAddress = SERVICES.doc(id).collection("addresses").onSnapshot(querySnapshot => {
      const fetchedAddresses = [];
      querySnapshot.forEach(doc => fetchedAddresses.push({ id: doc.id, ...doc.data() }));
      setAddresses(fetchedAddresses);
    });

    return () => {
      unsubscribeService();
      unsubscribeAddress();
    };
  }, [id]);

  const saveShowTimes = (updatedShowTimes) => {
    SERVICES.doc(id).update({ showTimes: updatedShowTimes })
      .catch((e) => console.error("Error updating show times: ", e.message));
  };

  const handleUpdateService = () => {
    if (!service.image) {
      console.error("Service image is missing");
      return;
    }

    const refImage = storage().ref(`/services/${id}.png`);
    refImage.putFile(service.image)
      .then(() => refImage.getDownloadURL())
      .then(link => {
        SERVICES.doc(id).update({ ...service, create: userLogin.email, image: link });
        navigation.navigate("services");
      })
      .catch(e => console.error("Update error: ", e.message));
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      mediaType: "photo",
    })
      .then(response => setService({ ...service, image: response.path }))
      .catch(e => console.error("Image picker error: ", e.message));
  };

  const handleDeleteService = async () => {
    try {
      if (service.image) {
        const refImage = storage().ref(`/services/${id}.png`);
        await refImage.delete();
      }
      await SERVICES.doc(id).delete();
      navigation.navigate("services");
    } catch (error) {
      Alert.alert("Error", "There was an issue deleting the service. Please try again.");
      console.error("Delete service error: ", error.message);
    }
  };

  const handleUpdateShowTime = (day, index, newTime) => {
    const updatedShowTimes = { ...service.showTimes };
    updatedShowTimes[day][index] = newTime;
    setService({ ...service, showTimes: updatedShowTimes });
    saveShowTimes(updatedShowTimes);
  };

  const handleAddShowTime = (day) => {
    const updatedShowTimes = { ...service.showTimes };
    updatedShowTimes[day] = [...(updatedShowTimes[day] || []), ""];
    setService({ ...service, showTimes: updatedShowTimes });
    saveShowTimes(updatedShowTimes);
  };

  const handleRemoveShowTime = (day, index) => {
    const updatedShowTimes = { ...service.showTimes };
    updatedShowTimes[day].splice(index, 1);
    setService({ ...service, showTimes: updatedShowTimes });
    saveShowTimes(updatedShowTimes);
  };

  const handleAddDay = (day) => {
    const updatedShowTimes = { ...service.showTimes, [day]: [""] };
    setService({ ...service, showTimes: updatedShowTimes });
    saveShowTimes(updatedShowTimes);
  };

  const handleRemoveDay = (day) => {
    const updatedShowTimes = { ...service.showTimes };
    delete updatedShowTimes[day];
    setService({ ...service, showTimes: updatedShowTimes });
    saveShowTimes(updatedShowTimes);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="delete" onPress={() => setVisible(true)} />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Button mode="contained" onPress={handleUploadImage}>Upload Image</Button>
      {service.image && (
        <Image source={{ uri: service.image }} style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }} />
      )}

      <TextInput
        label="Service Name"
        value={service.serviceName}
        onChangeText={(text) => setService({ ...service, serviceName: text })}
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorServiceName()}>Service Name cannot be empty</HelperText>

      <TextInput
        label="Price"
        value={service.price ? service.price.toString() : ""}
        onChangeText={(text) => setService({ ...service, price: parseInt(text) })}
        keyboardType="numeric"
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorPrice()}>Price must be greater than 0</HelperText>

      <TextInput
        label="Description"
        value={service.description}
        onChangeText={(text) => setService({ ...service, description: text })}
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorDescription()}>Description cannot be empty</HelperText>

      <TextInput
        label="Duration (minutes)"
        value={service.duration ? service.duration.toString() : ""}
        onChangeText={(text) => setService({ ...service, duration: parseInt(text) })}
        keyboardType="numeric"
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={hasErrorDuration()}>Duration must be greater than 0</HelperText>

      <Text style={{ marginTop: 20, fontSize: 16 }}>Show Times:</Text>
      {service.showTimes && Object.keys(service.showTimes).map(day => (
        <View key={day} style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>{day}:</Text>
            <IconButton icon="minus-circle" onPress={() => handleRemoveDay(day)} />
          </View>
          {service.showTimes[day].map((time, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <TextInput
                value={time}
                onChangeText={(newTime) => handleUpdateShowTime(day, index, newTime)}
                placeholder="Enter time"
                style={{ flex: 1, marginRight: 5 }}
              />
              <IconButton icon="minus-circle" onPress={() => handleRemoveShowTime(day, index)} />
            </View>
          ))}
          <Button onPress={() => handleAddShowTime(day)} mode="outlined" style={{ marginTop: 5 }}>Add Time</Button>
        </View>
      ))}

      <Text style={{ marginTop: 10 }}>Add New Day:</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
        !service.showTimes?.[day] && <Button key={day} onPress={() => handleAddDay(day)}>{day}</Button>
      ))}

      <Text style={{ marginTop: 20, fontSize: 16 }}>Addresses:</Text>
      <FlatList
        data={addresses}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />

      <Button mode="contained" onPress={handleUpdateService} style={{ marginTop: 10 }}>Save</Button>
      
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this service?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDeleteService}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default ServiceDetail;
