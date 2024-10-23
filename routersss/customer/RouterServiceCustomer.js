import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../../context";
import { Avatar, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import ServicesCustomer from "../../screensss/customer/ServicesCustomer";
import AddNewAppointment from "../../screensss/customer/AddNewAppointment";
import AppointmentDetail from "../../screensss/customer/AppointmentDetail";

const Stack = createStackNavigator();
const RouterServiceCustomer = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen name="servicescustomer" component={ServicesCustomer} />
      <Stack.Screen name="addnewappointment" component={AddNewAppointment} />
      <Stack.Screen name="appointmentdetail" component={AppointmentDetail} />

    </Stack.Navigator>
  );
};

export default RouterServiceCustomer;
