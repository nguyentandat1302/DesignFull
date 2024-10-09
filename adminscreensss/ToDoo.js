import { FlatList, ScrollView, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react";

const ToDoo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const user = auth().currentUser; 


  const userDocRef = firestore().collection('USERS').doc(user.email);

  const addNewTodo = () => {
    if (user) {
   
      userDocRef.collection('todos')
        .add({
          title: todo,
          complete: false,
        })
        .then(doc => {
          doc.update({ id: doc.id }); 
          console.log("Added new todo");
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    if (user) {
      
      const unsubscribe = userDocRef.collection('todos')
        .onSnapshot((querySnapshot) => {
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          setTodos(result); 
        });

      return () => unsubscribe();
    }
  }, [user]);

  const updateTodo = (item) => {
    userDocRef.collection('todos').doc(item.id).update({
      complete: !item.complete,
    })
    .then(() => console.log("Updated todo"))
    .catch(e => console.log(e));
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Button 
          icon={item.complete ? "check" : "close"}
          style={{ alignItems: "flex-start" }}
          labelStyle={{ color: "black" }}
          onPress={() => updateTodo(item)}
        >
          {item.title}
        </Button>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "blue" }}>
        <Appbar.Content 
          title={"Todos List"} 
          color="white" 
          style={{ alignItems: "center" }} 
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={todos}
          keyExtractor={item => item.id} 
          renderItem={renderItem}
        />
      </ScrollView>
      <TextInput 
        value={todo}
        placeholder="Input todo"
        onChangeText={setTodo}
      />
      <Button onPress={addNewTodo}>Add Todo</Button>
    </View>
  );
};

export default ToDoo;
