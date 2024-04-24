import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../http/ApiService';

export default function MyOrders() {
    const route = useRoute()
    const change = route?.params?.id
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]); // State for background colors
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items

  async function fetchProducts() {
    console.log("called")

    AsyncStorage.getItem('token', async (err, result) => {
    const { data, status } = await api.getMyProducts('consumer/order', JSON.parse(result));
        
    try {
      if (status == 200) {
     
        setProducts(data.data);
        // Initialize background colors array with default values
        setBackgroundColors(Array(data.data.length).fill('white'));
      }
    } catch (error) {
      console.log(error);
    }
  })
  }



  useEffect( () => {

          fetchProducts();

  }, [change]);



  const handleCirclePress = (index) => {
    // Toggle background color for the clicked product
    const updatedColors = [...backgroundColors];
    updatedColors[index] = updatedColors[index] === 'white' ? 'black' : 'white';
    setBackgroundColors(updatedColors);

    // Toggle selected item
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  }


  return (
    <View className="bg-white-0 h-full w-full">
      {/* Fixed Navbar? */}
      <View className="bg-green-600 h-16 px-4 flex flex-row items-center justify-between">
        <Text className="text-gray text-3xl font-bold tracking-wider">My Orders</Text>
        <View className="flex flex-row items-center">
          <Text className="text-gray text-2xl font-bold tracking-wider mr-2">Delete</Text>
          <MaterialCommunityIcons name="delete" color={"brown"} size={22} />
        </View>
      </View>

      {/* Customer cart list */}
      <ScrollView className="px-4" >
        {
          products.map((product, index) => {
        
            return (
              <React.Fragment key={index._id}>
              <TouchableOpacity onPress={()=>navigation.navigate('singleOrder',{orderId : product._id})}>
              <View className="flex flex-row items-center mt-4"  >
      

      <View className="ml-10">
        <Text className="text-gray text-xl">orderId : {product?._id}</Text>
        <Text className="text-gray text-xl">Price: Rs {product?.totalAmount}</Text>
      </View>
    </View>
              </TouchableOpacity>

              </React.Fragment>
            )
          })
        }

      </ScrollView>

      {/* Place that will have the total of customer purchase */}
  

      {/* fixed icons at the buttom of screen */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Entypo name="home" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Home</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Payment')}>
              <MaterialIcons name="payment" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Payment</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Location')}>
              <Entypo name="location-pin" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Location</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('MyCart')}>
              <Entypo name="shopping-cart" color={"green"} size={22} />
              <Text className="text-xs font-bold text-green"> My Cart</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Account')}>
              <MaterialCommunityIcons name="account" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  )
}
