import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
const MyContext = createContext() 

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
            break;
        case "LOGOUT":
            return{...state, userLogin: null}
            break;
        default:
            throw new Error(`${action.type} không tồn tại`);
    }
}

const MyContextControllerProvider = ({children}) => {
    const initialStates = {
        userLogin: {
            userName: "admin",
            fillName: " Nguyen Tan Dat"
        },
        shoppingCart: {}
    }

    const [controller, dispatch] = useReducer(reducer,initialStates);
    const value = useMemo (()=>[controller,dispatch],[controller,dispatch])

    return (
        <MyContext.Provider value={value}>  
            {children}  
        </MyContext.Provider>
    )
}
/// use context (Store)

const useMyContextController = () =>{
    const context = useContext(MyContext);
    if (!context) {
        throw new Error
        (
            "useMyContextController su dung trong MyContextController"
        )
    }
    return context
}


 // khai bao cac collection
  const cUSERS = firestore().collection("USERS")
  const cSERVICES = firestore().collection("SEVICES")


  //action

  const login = (dispatch, userName, password) =>{
    auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
            cUSERS.doc(email)
            .onSnapshot((doc) =>{
                dispatch({type:"USER_LOGIN",value: doc.data()})
            })
    })
    .catch(e => console.log(e))
  }

  const logout = (dispatch) =>{
    //userLogin = null
    auth().signOut()
    .then(() => dispatch({type:"LOGOUT"}))
  }
// dinh nghia
  export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
  }