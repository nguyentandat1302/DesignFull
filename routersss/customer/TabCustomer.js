import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "../../routersss/customer/RouterServiceCustomer";
import Setting from "../../screensss/admin/Setting";
import Appointments from "../../screensss/customer/Appointments";

const Tab = createMaterialBottomTabNavigator()

const TabCustomer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RouterServiceCustomer" component={RouterServiceCustomer}
        options={{
          tabBarIcon: "home",
          title: "Home",
        }}
      />
      <Tab.Screen name="appointments" component={Appointments}
        options={{
          tabBarIcon: "cash",
        }}
      />
     
      <Tab.Screen name="setting"  component={Setting}
        options={{
          tabBarIcon: "cog",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabCustomer;
