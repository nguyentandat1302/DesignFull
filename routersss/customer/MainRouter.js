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
import Welcome from "../../screensss/customer/Welcome";
import DetailMovie from "../../screensss/customer/DetailMovie";
import FavouriteMovie from "../../screensss/customer/FavouriteMovie";
import FilterByDate from "../../screensss/customer/FilterByDate";
import Paypal from "../../screensss/customer/Paypal";
import Checkout from "../../screensss/customer/Checkout";
import CornPopDetail from "../../screensss/admin/CornPopDetail";
import CornDetail from "../../screensss/customer/CornDetail";
import Bill from "../../screensss/customer/Bill";
import BillCorn from "../../screensss/customer/BillCorn";

const Stack = createStackNavigator();

const MainRouter = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
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
      <Stack.Screen name="detailmovie" component={DetailMovie} />
      <Stack.Screen name="favouritemovie" component={FavouriteMovie} />
      <Stack.Screen name="FilterByDate" component={FilterByDate} />
      <Stack.Screen name="paypal" component={Paypal} />
      <Stack.Screen name="checkout" component={Checkout} />
      <Stack.Screen name="cornpopdetail" component={CornPopDetail} />
      <Stack.Screen name="corndetail" component={CornDetail} />
      <Stack.Screen name="bill" component={Bill} />
      <Stack.Screen name="billcorn" component={BillCorn} />












    </Stack.Navigator>
  );
};

export default MainRouter;
