import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper"; 
import Contact from "./screens/Contact";
import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigator from "./routers/ButtomTabNavigator";
import MyStack from "./routers/MyStack";
import Firestore, { firebase }  from "@react-native-firebase/firestore";
import TodoApp from "./android/screens/ToDoApp";
import { MyContextControllerProvider } from "./Context";
import auth from "@react-native-firebase/auth"
import Home from "./adminscreensss/Home"
import MainRouter from "./routersss/MainRouter";
import AddService from "./adminscreensss/AddService";
import ServiceDetail from "./adminscreensss/ServiceDetail";
import EditService from "./adminscreensss/EditService";
import Register from "./adminscreensss/Register";

const inital = () =>{
  const cUSERS = Firestore().collection("USERS")
  const admin = {
    name: " Nguyen Tan Dat",
    phone: "0587944658",
    address: "Phu Yen",
    email:"datnguyen13021302@gmail.com",
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
          <BottomTabNavigator/>
          {/* <MyStack/>  */}
          {/* <TodoApp/> */}
        </PaperProvider>
      </NavigationContainer>

      // <NavigationContainer>
      //   <PaperProvider>
      //     <MyContextControllerProvider>
      //       {/* <Home /> */}
      //       {/* <AddService/> */}
      //       {/* <ServiceDetail/> */}
      //       <MainRouter/>
      //       {/* <EditService/> */}
      //     </MyContextControllerProvider>
      //   </PaperProvider>
      // </NavigationContainer>
   
  );
};

export default App;

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
