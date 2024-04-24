import { View, TextInput, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const Gproduct = [
    { id: 1, name: 'Apple', price: '$2.99', quantity: '5', image: require('../Images/Vege/Image4.png.jpg') },
    { id: 2, name: 'Banana', price: '$1.99', quantity: '3', image: require('../Images/Vege/Image6.png.jpg') },
    { id: 3, name: 'Orange', price: '$3.49', quantity: '4', image: require('../Images/Vege/Image8.png.jpg') },
    { id: 4, name: 'Grapes', price: '$4.99', quantity: '2', image: require('../Images/Vege/Image1.png.jpg') },
  ];
  const route = useRoute()
  const navigation = useNavigation();
  const sellerId = route?.params?.sellerId
  const [data,setData] = useState()
  
  const fetchSellerProducts = async()=>{
    console.log("Called")
   const {data,status} =  await api.getSellersProducts('consumer/sellers',sellerId)
   if(status === 200){
    setData(data.data)
    console.log(data.data[0].userId.averageRating)
    
   }
  }
  const addToCart = async(id)=>{
    console.log("called")
    AsyncStorage.getItem('token',async(err,result)=>{
      if(result){
      console.log(result)
      
        const {response,status} = await api.addCart('consumer/cart',id,JSON.parse(result))
   
        if(status == 200){
          navigation.navigate("MyCart")
        }
      }
    })
  }
  useEffect(()=>{
    fetchSellerProducts()
  },[sellerId])


  


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
                <Text className="text-gray-800 text-lg font-bold tracking-wider mb-1">
                  {/* {data.users[0].firstName} */}
                </Text>
                <View className="flex-row items-center flex-wrap">
                  <Entypo name="location-pin" size={20} color="black" />
                  <Text className="text-gray-700 text-base ml-1">Kathmandu, Nepal</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-700 text-base font-semibold mr-1">{data && data[0] && data[0]?.userId && data[0]?.userId.averageRating}</Text>
                  <View className="flex-row">
                  {
  data && data[0] && data[0]?.userId && data[0]?.userId.averageRating ? (
    <>
      {Array.from({ length: Math.floor(data[0]?.userId.averageRating) }).map((_, index) => (
        <MaterialIcons key={index} name="star" size={18} color="#FFD700" />
      ))}
      {data[0]?.userId.averageRating % 1 !== 0 && (
        <FontAwesome name="star-half" size={18} color="#FFD700" />
      )}
      {Array.from({ length: 5 - Math.ceil(data[0]?.userId.averageRating) }).map((_, index) => (
        <MaterialIcons key={`empty-${index}`} name="star-border" size={18} color="#FFD700" />
      ))}
    </>
  ) : (
    <Text>No rating available</Text>
  )
}

          
                  </View>
                  <Text className="text-gray-700 text-base ml-1">{data && data[0] && data[0]?.userId && data[0]?.userId.averageRating } reviews </Text>
                </View>
              </View>
            </View>
          </View>
          
         
    
        </View>
        <TouchableOpacity
              onPress={() => navigation.navigate('Rate',{sellerId})}
              className="flex-row mt-8 items-center  justify-center bg-green-700"
              
            >
              <Text className="text-white text-base font-semibold">Rate Seller</Text>
            </TouchableOpacity>
      </View>
    

      {/* Content of the farmer product */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 25, flexGrow: 1}}contentContainerClassName="py-20">
        {data?.map(product => (
          <View key={product?._id} className="flex-row items-center mt-20">
            <Image source={{uri : product?.productImage}} className="w-40 h-32 rounded-xl ml-10" />
            <View className="ml-10">
              <Text className="text-gray text-lg">{product?.productName}</Text>
              <Text className="text-gray text-lg">Price: {product?.productPrice}</Text>
              <Text className="text-gray text-lg">Quantity: {product?.productStockQty}</Text>
              <TouchableOpacity className="bg-green-700 rounded-lg py-3 px-6" activeOpacity={0.8} onPress={()=>addToCart(product._id)}>
                <Text className="text-white font-bold text-lg">Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed icons at the bottom of the screen */}
      <View style={{ bottom: 0, left: 0, right: 0 }}>
        <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Entypo name="home" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black">Home</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Payment')}>
              <MaterialIcons name="payment" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black">Payment</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Location')}>
              <Entypo name="location-pin" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black">Location</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('MyCart')}>
              <Entypo name="shopping-cart" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black">My Cart</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Account')}>
              <MaterialCommunityIcons name="account" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black">Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}