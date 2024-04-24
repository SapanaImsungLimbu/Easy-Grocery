import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function UpdateLocation() {
  
  const navigation = useNavigation();
    const route = useRoute()
    const orderId = route?.params?.orderId
    const [currentAddress,setCurrentAddress] = useState('')

const handleSubmit = async ()=>{

      const response = await axios.patch(`http://10.0.2.2:3000/api/consumer/order/${orderId}`,{currentAddress})

      if(response.status === 200){

        Alert.alert("Location", "The location was updated successfully",[
            {
                text : "OK" , onPress : ()=>{
                    
               
                    navigation.navigate('UpdateLocation')
                }
            }
        ])
    }else{
      alert('Something went wrong')
    }
    }
    

   




  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="bg-white-300 h-full w-full flex justify-center items-center">
        {/***********************Title and form******************/}
        <View className="h-full w-full flex justify-around pt-10 pb-10">
          {/***************Title********************/}
          <View className="flex items-center mb-6">
            <Text className="text-green-600 font-bold tracking-wider text-4xl">Where are you ?</Text>
          </View>
          {/***************Form********************/}
          <View className="flex items-center mx-4 space-y-4">
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='Current Address'
                placeholderTextColor={'gray'}
                value={currentAddress}
                onChangeText={(text)=>setCurrentAddress(text)}

              />
            </View>

            <View className="w-full">
              <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleSubmit}
              >
                <Text className="text-xl font-bold text-white text-center">Update Location</Text>
              </TouchableOpacity>
            </View>
        

          </View>
        </View>
      </View>
    </ScrollView>
  )
}
