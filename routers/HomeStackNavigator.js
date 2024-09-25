import { createStackNavigator } from "@react-navigation/stack"
import Contact from "../screens/Contact"
import Profile from "../screens/Profile"

const Stack = createStackNavigator()
const HomeStackNavigator = () =>{
    return(

        <Stack.Navigator>
            <Stack.Screen name= "Contact" component={Contact} />
            <Stack.Screen name= "Profile" component={Profile} />

        </Stack.Navigator>
    )
}

export default HomeStackNavigator