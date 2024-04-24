import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Checkout({route}) {
  console.log(route)
  const navigation = useNavigation();
  const [userData,setUserData] = useState({
    email : "",
    shippingAddress : "",
    phoneNumber : null,
    items : route?.params?.products,
    totalAmount : route?.params?.total
})



const [paymentType,setPaymentType] = useState('cod')
const handleInputChange = (name,text)=>{
    setUserData({
        ...userData,
        [name] : text
    })
}  

const handleRegister = async ()=>{
  const userDataFinal = {
    ...userData,
    paymentType
  }
  
  console.log(await AsyncStorage.getItem('token'))
  console.log(userDataFinal)

      const response = await axios.post(`http://10.0.2.2:3000/api/consumer/order`,userDataFinal,{
        headers : {
            "Content-Type" : "application/json",
            'Authorization' :  JSON.parse(await AsyncStorage.getItem('token'))
        }
    })


      if(response.status === 200){
        if(response.data.url){
          console.log(response.data.url)
          navigation.navigate('Khalti',{url : response.data.url})
          return 
        }
        Alert.alert("Order Created", "The order was created successfully",[
            {
                text : "OK" , onPress : ()=>{
                    
                    setUserData({
                      email : "",
                      shippingAddress : "",
                      phoneNumber : "",
                      items : [],
                      totalAmount : 0
                    })
                    navigation.navigate('myOrder',{id:"a"})
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
            <Text className="text-green-600 font-bold tracking-wider text-4xl">Your Order Details</Text>
          </View>
          {/***************Form********************/}
          <View className="flex items-center mx-4 space-y-4">
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='Shipping Address'
                placeholderTextColor={'gray'}
                value={userData.firstName}
                onChangeText={(text)=>handleInputChange('shippingAddress',text)}

              />
            </View>

            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='Email'
                placeholderTextColor={'gray'}
                value={userData.email}
                onChangeText={(text)=>handleInputChange('email',text)}

              />
            </View>
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
              keyboardType='numeric'
                placeholder='Phone Number'
                placeholderTextColor={'gray'}
                secureTextEntry
                value={userData.password}
                onChangeText={(text)=>handleInputChange('phoneNumber',text)}

              />
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="font-semibold">Payment Type</Text>
              <View className="flex flex-row space-x-4">
                <TouchableOpacity
                  className={`p-2 rounded-md ${paymentType == 'cod' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onPress={() => setPaymentType('cod')}
                >
                  <Text className="font-semibold">COD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`p-2 rounded-md ${paymentType == 'khalti' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onPress={() => setPaymentType('khalti')}
                >
                  <Text className="font-semibold">Khalti</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full">
       {
        paymentType == "cod" ? ( 
            <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleRegister}
            >
              <Text className="text-xl font-bold text-white text-center">Order</Text>
            </TouchableOpacity>
        ): (
            <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleRegister}
            >
              <Text className="text-xl font-bold text-white text-center">Pay with khalti</Text>
            </TouchableOpacity>
        )
       }
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  )
}
