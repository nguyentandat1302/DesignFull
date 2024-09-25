import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper"; 
import Contact from "./screens/Contact";
import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigator from "./routers/ButtomTabNavigator";
import MyStack from "./routers/MyStack";
import Firestore  from "@react-native-firebase/firestore";
import TodoApp from "./android/screens/ToDoApp";

const App = () => {
  
  return (
    
      <NavigationContainer>
        <PaperProvider>
          {/* <BottomTabNavigator/> */}
          {/* <MyStack/> */}
          {/* <Text>Hello</Text> */}
          <TodoApp/>
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
