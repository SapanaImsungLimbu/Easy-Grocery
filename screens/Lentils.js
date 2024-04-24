import { View, TextInput, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import React from 'react';
import {Entypo} from '@expo/vector-icons';

import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


export default function Home() {
  const navigation = useNavigation();
  return (
    <View className="bg-white-100 h-full w-full">
      {/* Your content here */}
      
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
              <MaterialIcons name="payment" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Payment</Text>      
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
