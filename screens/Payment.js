import { View, TextInput, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';


import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../http/ApiService';


export default function Home() {
  const navigation = useNavigation();
  const [payments,setPayments] = useState([])
  async function fetchProducts() {
    AsyncStorage.getItem('token', async (err, result) => {
    const { data, status } = await api.getPayments('consumer/orders/payment', JSON.parse(result));
   
    try {
      if (status == 200) {
        setPayments(data.data);

      }
    } catch (error) {
      console.log(error);
    }
  })
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  console.log(payments)
  return (
    <View className="bg-white-500 h-full w-full mt-12">
      {/* Your content here */}
 {
  payments.length > 0 && payments.map((payment)=>{
    return (
      <TouchableOpacity >
      <View className="bg-[#236b18] rounded-lg mx-2 mb-5 p-2 flex-row items-center" >
    <View className="flex-1 pr-2">
      <Text className="text-white font-bold text-base mb-1">{payment._id}</Text>
      <Text className="text-white text-sm">{payment?.paymentDetails?.status}</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-white font-bold text-base mr-1">Rs.{payment?.totalAmount}</Text>

    
      </View>
    </View>
    
    <Image source={require('../Images/Vege/Image2.png.jpg')} style={{ width: 80, height: 80 }} />
  </View>
  </TouchableOpacity>
    )
  })
 }
      {/* Fixed icons at the bottom of the screen */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Entypo name="home" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Home</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Payment')}>
              <MaterialIcons name="payment" color={"green"} size={22}/>
              <Text className="text-xs font-bold text-green"> Payment</Text>      
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Location')}>
              <Entypo name="location-pin" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Location</Text>     
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('MyCart')}>
              <Entypo name="shopping-cart" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> My Cart</Text>     
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Account')}>
              <MaterialCommunityIcons name="account" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Account</Text>   
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
