import { createStackNavigator } from "@react-navigation/stack";
import TabAdmin from "./TabAdmin";
import TabCustomer from "./TabCustomer";
import Login from "../../screensss/customer/Login";
import Register from "../../screensss/customer/Register";
import ResetPassword from "../../screensss/customer/ResetPassword";
import ChangePassword from "../../screensss/customer/ChangePassword";
import Profile from "../../screensss/customer/Profile";
import EditProfile from "../../screensss/customer/EditProfile";
import Customers from "../../screensss/admin/Customers";
import CustomerDetail from "../../screensss/admin/CustomerDetail";

const Stack = createStackNavigator();

const MainRouter = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="tabadmin" component={TabAdmin} />
      <Stack.Screen name="tabcustomer" component={TabCustomer} />
      <Stack.Screen name="resetpassword" component={ResetPassword} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="editprofile" component={EditProfile} />
      <Stack.Screen name="changepassword" component={ChangePassword} />
      <Stack.Screen name="customers" component={Customers} />
      <Stack.Screen name="customerdetail" component={CustomerDetail} />



    </Stack.Navigator>
  );
};

export default MainRouter;
