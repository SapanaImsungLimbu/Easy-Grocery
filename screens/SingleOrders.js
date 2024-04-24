import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleOrders() {
  const Gproduct = [
    { id: 1, name: 'Apple', price: '$2.99', quantity: '5', image: require('../Images/Vege/Image4.png.jpg') },
    { id: 2, name: 'Banana', price: '$1.99', quantity: '3', image: require('../Images/Vege/Image6.png.jpg') },
    { id: 3, name: 'Orange', price: '$3.49', quantity: '4', image: require('../Images/Vege/Image8.png.jpg') },
    { id: 4, name: 'Grapes', price: '$4.99', quantity: '2', image: require('../Images/Vege/Image1.png.jpg') },
  ];
  const route = useRoute()
  const navigation = useNavigation();
  const orderId = route?.params?.orderId
  console.log(orderId)
  const [data,setData] = useState(null)
  async function fetchOrders() {
  
    const { data, status } = await api.getSingleOrder('consumer/order',orderId);
        
    try {
      if (status == 200) {
     
        setData(data.data);
     
        // Initialize background colors array with default values

      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(()=>{
    
    fetchOrders()
  },[orderId])

  
console.log(data)

  return (
    <View className="bg-white h-full flex-1">
      {/* User shop profile */}
      <View className="relative">
        <Image className="w-full h-64" source={require('../Images/Vege/Image5.png.jpg')}resizeMode="cover"/>
        <View className="absolute top-40 bg-white w-11/12 rounded-2xl shadow-lg mx-4 mb-8 overflow-hidden"style={{
            borderWidth: 4,
            borderColor: '#4CAF50',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className=" flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                source={require('../Images/Vege/logo2.jpg')}
              />
              <View>
                <Text className="text-gray-800 text-sm font-bold tracking-wider mb-1">
                  {data?._id}
                </Text>
                <View className="flex-row items-center flex-wrap">
                    
                  <Entypo name="location-pin" size={20} color="black" />
                  <Text className="text-gray-700 text-base ml-1">{data?.user?.address || "Kathmandu"}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-700 text-base font-semibold mr-1">orderBy : {data?.user?.firstName}</Text>
                </View>
              </View>
            </View>
          </View>

         
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('UpdateLocation',{orderId})} style={{marginTop:30}}>
                <Text style={{textAlign:'center'}}>Update Location</Text>

                </TouchableOpacity>

      {/* Content of the farmer product */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 25, flexGrow: 1 }} contentContainerClassName="py-20">
  {
    data && data.items.map(( product , productIndex) => (
       
      <View key={`${productIndex}`} className="flex-row items-center mt-20">
        <Image source={{ uri: product?.productImage }} className="w-40 h-32 rounded-xl ml-10" />
        <View className="ml-10">
        
          <Text className="text-gray text-lg">{product?.product?.productName}</Text>
          <Text className="text-gray text-lg">Price: {product?.product?.productPrice}</Text>
          <Text className="text-gray text-lg">Quantity: {product?.product?.productStockQty}</Text>
          {/* <TouchableOpacity className="bg-green-700 rounded-lg py-3 px-6" activeOpacity={0.8} onPress={() => addToCart(product._id)}>
            <Text className="text-white font-bold text-lg">Add to cart</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    ))
  }
</ScrollView>


      {/* Fixed icons at the bottom of the screen */}
  
    </View>
  )
}