import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Payment from './screens/Payment';
import Location from './screens/Location';
import MyCart from './screens/MyCart';
import Account from './screens/Account';
import SellerDetails from './screens/ProductEx';
import Farmer from './screens/Farmer';
import Fruit from './screens/Fruit';
import Vegetable from './screens/Vegetable';
import Lentils from './screens/Lentils';
import AddProduct from './screens/AddProduct';
import AdminScreen from './screens/AdminScreen'
import ViewProduct from './screens/ViewProduct';
import SellerScreen from './screens/SellerScreen'
import CustomerScreen from './screens/CustomerScreen'
import AdminProduct from './screens/AdminProductsScreen'
import AdminProductSingle from './screens/AdminProductSingle'
import SellerProductSingle from './screens/SellerProductSingle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkout from './screens/Checkout';
import MyOrder from './screens/MyOrders';
import SingleOrder from './screens/SingleOrder';
import Notification from './screens/Notification';
import Khalti from './screens/Khalti';
import Orders from './screens/Orders';
import SingleOrders from './screens/SingleOrders';
import UpdateLocation from './screens/UpdateLocation';
import Rate from './screens/Rate';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    // Fetch role from AsyncStorage
    const fetchRole = async () => {
      try {
        const data = await AsyncStorage.getItem('data');
        const storedRole = JSON.parse(data).role;
        console.log(storedRole, "sr");
        if (storedRole !== null) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error('Error retrieving role from AsyncStorage:', error);
      }
    };

    fetchRole();
  }, []);

  console.log(role);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {role === 'seller' && (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Farmer" component={Farmer} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="UpdateLocation" component={UpdateLocation} />
            <Stack.Screen name="ViewProduct" component={ViewProduct} />
            <Stack.Screen name="sellerProductDetails" component={SellerProductSingle} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="ProductEx" component={SellerDetails} />
            <Stack.Screen name="Fruit" component={Fruit} />
            <Stack.Screen name="Vegetable" component={Vegetable} />
            <Stack.Screen name="Lentils" component={Lentils} />
            <Stack.Screen name="products" component={AdminProduct} />
            <Stack.Screen name="productDetails" component={AdminProductSingle} />
            <Stack.Screen name="sellerDetails" component={SellerDetails} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="myOrder" component={MyOrder} />
            <Stack.Screen name="singleOrder" component={SingleOrder} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="SingleOrders" component={SingleOrders} />
            <Stack.Screen name="Rate" component={Rate} />
            <Stack.Screen name="Khalti" component={Khalti} />
            <Stack.Screen name="EditProfile" component={EditProfile} />



          </>
        )}
        {role === 'admin' && (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Farmer" component={Farmer} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="sellerProductDetails" component={SellerProductSingle} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="UpdateLocation" component={UpdateLocation} />
            <Stack.Screen name="EditProfile" component={EditProfile} />

            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="ViewProduct" component={ViewProduct} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="ProductEx" component={SellerDetails} />
            <Stack.Screen name="Fruit" component={Fruit} />
            <Stack.Screen name="Vegetable" component={Vegetable} />
            <Stack.Screen name="Lentils" component={Lentils} />
            <Stack.Screen name="myOrder" component={MyOrder} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="SingleOrders" component={SingleOrders} />
            <Stack.Screen name="Khalti" component={Khalti} />
          
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="seller" component={SellerScreen} />
            <Stack.Screen name="customer" component={CustomerScreen} />
            <Stack.Screen name="products" component={AdminProduct} />
            <Stack.Screen name="productDetails" component={AdminProductSingle} />
            <Stack.Screen name="sellerDetails" component={SellerDetails} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="singleOrder" component={SingleOrder} />
           
            <Stack.Screen name="Rate" component={Rate} />
            
            {/* Add admin-specific screens here */}
          </>
        )}
        {role !== 'seller' && role !== 'admin' && (
          <>
            {/* <Stack.Screen name="UpdateLocation" component={UpdateLocation} /> */}

            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} /> */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Farmer" component={Farmer} />
            <Stack.Screen name="sellerProductDetails" component={SellerProductSingle} />
            <Stack.Screen name="ProductEx" component={SellerDetails} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Khalti" component={Khalti} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="SingleOrders" component={SingleOrders} />
            <Stack.Screen name="Rate" component={Rate} />
            <Stack.Screen name="EditProfile" component={EditProfile} />

            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="ViewProduct" component={ViewProduct} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="sellerDetails" component={SellerDetails} />
            <Stack.Screen name="Fruit" component={Fruit} />
            <Stack.Screen name="Vegetable" component={Vegetable} />
            <Stack.Screen name="Lentils" component={Lentils} />
            <Stack.Screen name="products" component={AdminProduct} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="myOrder" component={MyOrder} />
            <Stack.Screen name="singleOrder" component={SingleOrder} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
