import { createStackNavigator } from "@react-navigation/stack";
import Login from "../adminscreensss/Login";
import Register from "../adminscreensss/Register";
import Home from "../adminscreensss/Home";
import AddService from "../adminscreensss/AddService";
import ServiceDetail from "../adminscreensss/ServiceDetail";
import EditService from "../adminscreensss/EditService";
import { useMyContextController } from "../Context";

const Stack = createStackNavigator() 

const MainRouter=() =>{
    const [controller,dispatch] = useMyContextController()
    const {userLogin} = controller
    console.log(userLogin)
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="addService" component={AddService} />
            <Stack.Screen name="servicedetail" component={ServiceDetail} />
            <Stack.Screen name="editservice" component={EditService} />

        </Stack.Navigator>
    )
}
export default MainRouter