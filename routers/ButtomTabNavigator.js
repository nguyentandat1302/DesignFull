import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import Contact from "../screens/Contact"
import Favorite from "../screens/Favorite"
import User from "../screens/User"
import HomeStackNavigator from "./HomeStackNavigator"

const Tab = createMaterialBottomTabNavigator()
const BottomTabNavigator = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Home" component={HomeStackNavigator} 
            options={{
                tabBarIcon: "home"
            }}
            />
            <Tab.Screen name = "Favorite" component={Favorite} 
            options={{
                tabBarIcon: "star"
            }}
            />
            <Tab.Screen name = "Users" component={User} 
            options={{
                title:"Setting",
                tabBarIcon: "account"
            }}
            />

        </Tab.Navigator>

    )
}

export default BottomTabNavigator;