import { Settings } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/lib/typescript/react-navigation";

const Tab = createMaterialBottomTabNavigator();
const MyButtonTab = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
            options={{
                tabBarIcon:'home',
                tabBarBadge: 4,
                title:"Trang Chu"
            }}
            />

            <Tab.Screen name="Profile" component={Profle}/>
            <Tab.Screen name="Profile" component={Setting}/>


        </Tab.Navigator>
    )
}


