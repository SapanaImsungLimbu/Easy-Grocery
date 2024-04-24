import { View, TextInput, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';

import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account() {
  // let role
  const [role,setRole] = useState(null)
  const [data,setData] = useState({})
  async function fetchStorage(){
    
    const data = await AsyncStorage.getItem('data')
     setRole(data.role)
     console.log(data)
     setData(JSON.parse(data))
   
  }


  const navigation = useNavigation();
  useEffect( ()=>{
    fetchStorage()
  },[])
  const handleLogout = async () => {
    try {
      // Clear authentication data from AsyncStorage
      await AsyncStorage.clear();
      // Navigate to the login page
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <View className="bg-white-0 h-full flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Fixed search bar */}
        <View className="bg-green-600 h-16 px-4 flex flex-row items-center">
          <Text className="text-gray text-3xl font-bold tracking-wider">Your Profile</Text>
        </View>

        {/* Middle-top part with image */}
        <View className="px-4 mt-8 flex items-center">
          <View className="w-60 h-60 rounded-full flex justify-center items-center">
            <Image className="w-1/2 h-1/2 rounded-full" source={require('../Images/Vege/Image9.png.jpg')} />
          </View>
        </View>

        <View className="flex items-center mx-4 space-y-4 mt-8">
          <View className="bg-black/5 p-3 rounded-2xl w-full">
            <TextInput editable={false} placeholder={data?.firstName} placeholderTextColor={'gray'} />
          </View>
          <View className="bg-black/5 p-3 rounded-2xl w-full">
            <TextInput editable={false} placeholder={data?.email} placeholderTextColor={'gray'} />
          </View>

          {/* Edit Profile Button */}
          <View className="w-3/4">
            <TouchableOpacity className="w-full bg-green-400 p-3 rounded-2xl mb-3" onPress={()=>navigation.navigate('EditProfile')}>
              <Text className="text-xl font-bold text-white text-center">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        {
          role === 'seller' ? ( 
            <View className="w-3/4">
            <TouchableOpacity className="w-full bg-green-400 p-3 rounded-2xl mb-3" onPress={()=>navigation.navigate('ViewProduct')}>
              <Text className="text-xl font-bold text-white text-center">My Order</Text>
            </TouchableOpacity>
          </View> ) : 
          (
            <View className="w-3/4">
            <TouchableOpacity className="w-full bg-green-400 p-3 rounded-2xl mb-3" onPress={()=>navigation.navigate('myOrder')}>
              <Text className="text-xl font-bold text-white text-center">My Orders</Text>
            </TouchableOpacity>
          </View>
          )
          
        }

          {/* Logout Button */}
          <View className="w-3/4">
            <TouchableOpacity onPress={handleLogout} className="w-full bg-green-400 p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fixed icons that is used for navigation at the bottom of the screen */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
            <View>
              <TouchableOpacity onPress={() => navigation.push('Home')}>
                <Entypo name="home" color={"green"} size={22} />
                <Text className="text-xs font-bold text-green"> Home</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.push('Payment')}>
                <MaterialIcons name="payment" color={"black"} size={22} />
                <Text className="text-xs font-bold text-black"> Payment</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.push('Location')}>
                <Entypo name="location-pin" color={"black"} size={22} />
                <Text className="text-xs font-bold text-black"> Location</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.push('MyCart')}>
                <Entypo name="shopping-cart" color={"black"} size={22} />
                <Text className="text-xs font-bold text-black"> My Cart</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.push('Account')}>
                <MaterialCommunityIcons name="account" color={"green"} size={22} />
                <Text className="text-xs font-bold text-black"> Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}