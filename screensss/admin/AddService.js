import React, { useState } from "react";
import { Alert, Image, Text, View, FlatList, ScrollView } from "react-native";
import { Button, HelperText, TextInput, Checkbox, Dialog, Portal, Chip } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker"; // used for image and video picker
import Video from 'react-native-video'; // Import video component
import { useMyContextController } from "../../Context";

const AddService = ({ navigation }) => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [addressVietNam, setAddressVietNam] = useState(""); // Input field for address
  const [addresses, setAddresses] = useState([]); // Array to hold multiple addresses
  const [image, setImage] = useState("");
  const [video, setVideo] = useState(""); // New state for video
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimes, setShowTimes] = useState({});
  const [timeInput, setTimeInput] = useState("");
  const [visible, setVisible] = useState(false);

  const SERVICES = firestore().collection("SERVICES");

  const hasErrorServiceName = () => serviceName === "";
  const hasErrorPrice = () => price <= 0 || price === "";
  const hasErrorDescription = () => description === "";
  const hasErrorDuration = () => duration <= 0 || duration === "";
  const hasErrorAddress = () => addresses.length === 0;

  const handleAddNewService = () => {
    if (
      hasErrorServiceName() ||
      hasErrorPrice() ||
      hasErrorDescription() ||
      hasErrorDuration() ||
      hasErrorAddress()
    ) {
      Alert.alert("Invalid Input", "Please fill all fields correctly.");
      return;
    }

    SERVICES.add({
      serviceName,
      price: parseFloat(price),
      description,
      duration: parseInt(duration),
      addresses, // Save multiple addresses
      showTimes,
      create: userLogin.email,
    })
      .then(response => {
        const refImage = storage().ref(`/services/${response.id}.png`);
        const refVideo = storage().ref(`/services/${response.id}_trailer.mp4`); // New reference for video

        // Handle image upload
        if (image !== "") {
          refImage
            .putFile(image)
            .then(() => refImage.getDownloadURL())
            .then(link => {
              SERVICES.doc(response.id).update({
                id: response.id,
                image: link,
              });
            })
            .catch(e => console.log("Image upload error: ", e.message));
        }

        // Handle video upload
        if (video !== "") {
          refVideo
            .putFile(video)
            .then(() => refVideo.getDownloadURL())
            .then(link => {
              SERVICES.doc(response.id).update({
                trailer: link, // Store video URL as trailer
              });
              navigation.navigate("services");
            })
            .catch(e => console.log("Video upload error: ", e.message));
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
      .then(image => setImage(image.path))
      .catch(e => console.log("Image picker error: ", e.message));
  };

  const handleUploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video", // Specify media type as video
    })
      .then(video => setVideo(video.path))
      .catch(e => console.log("Video picker error: ", e.message));
  };

  const addAddress = () => {
    if (addressVietNam.trim() !== "") {
      setAddresses([...addresses, addressVietNam]);
      setAddressVietNam("");
    }
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleAddTime = (day) => {
    if (timeInput) {
      setShowTimes(prevShowTimes => ({
        ...prevShowTimes,
        [day]: [...(prevShowTimes[day] || []), timeInput]
      }));
      setTimeInput("");
      setVisible(false);
    }
  };

  const renderDayCheckbox = (day) => (
    <View key={day} style={{ flexDirection: "row", alignItems: "center" }}>
      <Checkbox
        status={selectedDays.includes(day) ? "checked" : "unchecked"}
        onPress={() => toggleDaySelection(day)}
      />
      <Text>{day}</Text>
      {selectedDays.includes(day) && (
        <Button onPress={() => setVisible(day)} mode="outlined" style={{ marginLeft: 10 }}>
          Add Time
        </Button>
      )}
      <FlatList
        data={showTimes[day] || []}
        renderItem={({ item }) => <Text style={{ marginLeft: 40 }}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Button mode="contained" onPress={handleUploadImage}>Upload Image</Button>
      {image !== "" && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }} />
      )}

      <Button mode="contained" onPress={handleUploadVideo}>Upload Trailer Video</Button>
      {video !== "" && (
        <View style={{ marginVertical: 10 }}>
          <Video
            source={{ uri: video }} // Display the video from the selected path
            ref={(ref) => { this.player = ref }} // Optional: you can manage the video player ref
            style={{ width: '100%', height: 200 }} // Adjust video player dimensions
            controls={true} // Show video controls (play, pause, etc.)
            resizeMode="contain" // Fit the video within the container
          />
        </View>
      )}

      <TextInput label="Input service name" value={serviceName} onChangeText={setServiceName} style={{ marginTop: 10 }} />
      <HelperText type="error" visible={hasErrorServiceName()}>Service Name cannot be empty</HelperText>

      <TextInput label="Input price" value={price} onChangeText={setPrice} keyboardType="numeric" style={{ marginTop: 10 }} />
      <HelperText type="error" visible={hasErrorPrice()}>Price must be greater than 0</HelperText>

      <TextInput label="Input description" value={description} onChangeText={setDescription} multiline style={{ marginTop: 10 }} />
      <HelperText type="error" visible={hasErrorDescription()}>Description cannot be empty</HelperText>

      <TextInput label="Input duration (in minutes)" value={duration} onChangeText={setDuration} keyboardType="numeric" style={{ marginTop: 10 }} />
      <HelperText type="error" visible={hasErrorDuration()}>Duration must be greater than 0</HelperText>

      <TextInput label="Add Address" value={addressVietNam} onChangeText={setAddressVietNam} style={{ marginTop: 10 }} />
      <Button mode="outlined" onPress={addAddress} style={{ marginTop: 10 }}>Add Address</Button>
      <HelperText type="error" visible={hasErrorAddress()}>At least one address is required</HelperText>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {addresses.map((addr, index) => (
          <Chip key={index} onClose={() => removeAddress(index)} style={{ margin: 4 }}>{addr}</Chip>
        ))}
      </View>

      <Text style={{ marginTop: 20, fontSize: 16 }}>Select Days & Times:</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(renderDayCheckbox)}

      <Button mode="contained" onPress={handleAddNewService} style={{ marginTop: 20 }} disabled={hasErrorServiceName() || hasErrorPrice() || hasErrorDescription() || hasErrorDuration() || hasErrorAddress()}>
        Add New Service
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Add Show Time</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Input Show Time"
              value={timeInput}
              onChangeText={setTimeInput}
              keyboardType="numeric"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => handleAddTime(selectedDays[selectedDays.length - 1])}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default AddService;
