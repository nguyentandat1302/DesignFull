import "react-native-gesture-handler"
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper"; 
import { NavigationContainer } from "@react-navigation/native"
import Firestore  from "@react-native-firebase/firestore";
import { MyContextControllerProvider } from "./Context";
import auth from "@react-native-firebase/auth"
import MainRouter from "./routersss/customer/MainRouter";


const inital = () =>{
  const cUSERS = Firestore().collection("USERS")
  const admin = {
    name: " Nguyen Tan Dat",
    phone: "0587944658",
    address: "Phu Yen",
    email:"abcdef@gmail.com",
    role:'admin'
  }
  cUSERS.doc(admin.email)
  .onSnapshot((doc) =>{
      if(!doc.exists)
      {// Dang ky user name
        auth().createUserWithEmailAndPassword(admin.email,"123456")
        .then(()=>{
          cUSERS.doc(admin.email).set(admin)
          console.log("Create New Account Admin")
        })
        .catch(e => console.log(e))
      }
      
  })
}
const App = () => {
  useEffect(() =>inital(),[])
  return (
    

      <NavigationContainer>
        <PaperProvider>
          <MyContextControllerProvider>
            {/* <Home /> */}
            {/* <AddService/> */}
            {/* <ServiceDetail/> */}
            <MainRouter/>
            {/* <EditService/> */}
          </MyContextControllerProvider>
        </PaperProvider>
      </NavigationContainer>
   
  );
};

export default App;

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
