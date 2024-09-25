import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../components/LoginScreen"
import CreateNewAccount from "../components/CreateNewAccount"
import ForgotPassword from "../components/ForgotPassword"
import HomeScreen from "../components/HomeScreen"



const Stack = createStackNavigator()

const MyStack = ()=> {
    return(
        <Stack.Navigator
    initialRouteName="login"
    screenOptions={{
        headerShown: false
    }}
    >
        
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="create" component={CreateNewAccount} />
            <Stack.Screen name="forgot" component={ForgotPassword} />
            <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
    )
    
}

export default MyStack