import { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../../Context";

const Profile = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(true); 

  useEffect(() => {
    if (userLogin) {
      const userRef = firestore().collection("USERS").doc(userLogin.email);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setFullName(data.fullName);
          setPhone(data.phone);
          setAddress(data.address);
          setGender(data.gender);
        }
      });
    }
  }, [userLogin]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.info}>{fullName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>{phone}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}>{address}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.info}>{gender !== undefined ? (gender ? "Male" : "Female") : "N/A"}</Text> 
      </View>

      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={() => navigation.navigate('editprofile')}
      >
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",  
  },
  title: {
    color: "#2E86C1", 
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#ffffff",  
    borderRadius: 10,  
    shadowColor: "#000",  
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",  
  },
  info: {
    fontSize: 18,
    color: "#7F8C8D", 
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#28B463",  
    borderRadius: 10,  
  },
});

export default Profile;
