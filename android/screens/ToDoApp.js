import { FlatList, ScrollView, View } from "react-native"
import { Appbar, Button, Text, TextInput } from "react-native-paper"
import firestore, { doc } from "@react-native-firebase/firestore"

import { useEffect, useState } from "react"

const cTodos =firestore ().collection("Todos")
const TodoApp =() =>{
   const [todos, setTodos] = useState([])
   const [todo, setTodo] = useState([])
   const addNewTodo = () => {
    cTodos.add({
        title:todo,
        complete: false
    })
    .then(doc =>
    {
        doc.update({id: doc.id})
        console.log(" Add new todo")
    }
    )
    .catch(e => console.log(e))
   }
    
   useEffect(() => {
        cTodos.onSnapshot((Todos) =>{
            let result =[]
            Todos.forEach((doc) =>{
             result.push(doc.data())
            })
            setTodos(result)
            console.log(todos)
        })
   },[cTodos])

   const updateTodo =(item) =>{
        cTodos.doc(item.id).update({
            complete:  !item.complete
        })
        .then(()=> console.log("update todo"))
        .catch(e => console.log(e))
   }
   const renderItem = ({item})=>{
    return(
        <View>
           <Button icon={(item.complete)? "check" : "close"}
            style = {{
                alignItems:"flex-start",
            }}
            labelStyle = {{
                color:"black"
            }}
            onPress={()=>updateTodo(item)}
            >
            {item.title}
            </Button>
        </View>
    )
   }
    return(
        <View style ={{flex:1}}>
        <Appbar.Header style={{
            backgroundColor:"blue",

            }}>
            <Appbar.Content title={"Todos List"}
             color="white" 
            style ={{
                alignItems: "center",
            }} /> 
        </Appbar.Header>
        <ScrollView style={{flex:1}}>
            <FlatList
            data={todos}
            keyExtractor={item => item.id} 
            renderItem={renderItem}/>
        </ScrollView>
         <TextInput 
            value={todo}
            placeholder="Input todo"
            onChangeText={setTodo}
            />
            <Button onPress={addNewTodo}>Add Todo</Button>
        </View>
    )
}
export default TodoApp