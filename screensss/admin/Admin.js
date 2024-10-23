import Transaction from "./Transaction";
import Setting from "./Setting";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterHome from "./RouterHome";
import Customer from "../customer/Customer";

const Tab = createMaterialBottomTabNavigator()

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="routerhome" component={RouterHome}
        options={{
          tabBarIcon: "home",
          title: "Home",
        }}
      />
      <Tab.Screen name="transaction" component={Transaction}
        options={{
          tabBarIcon: "cash",
        }}
      />
      <Tab.Screen name="customer" component={Customer}
        options={{
          tabBarIcon: "account",
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

export default Admin;
