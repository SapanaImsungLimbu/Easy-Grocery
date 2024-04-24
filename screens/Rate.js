import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Rate() {

  const route = useRoute()
  const sellerId = route.params.sellerId
  const navigation = useNavigation();
  const [userData,setUserData] = useState({

    rating : null,

})




const handleInputChange = (name,text)=>{
    setUserData({
        ...userData,
        [name] : text
    })
}  

const handleRate = async ()=>{


   try {
    const response = await axios.post(`http://10.0.2.2:3000/api/consumer/rate/${sellerId}`,userData,{
        headers : {
            "Content-Type" : "application/json",
            'Authorization' :  JSON.parse(await AsyncStorage.getItem('token'))
        }
    })


      if(response.status === 200){

        Alert.alert("Rate Success", "The seller was rated successfully",[
            {
                text : "OK" , onPress : ()=>{
                    
           
                    navigation.navigate('ProductEx',{sellerId})
                }
            }
        ])
    }else{
      alert('Something went wrong')
    }
   } catch (error) {
    alert(error.response.data.message)
   }
    }
    

   




  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="bg-white-300 h-full w-full flex justify-center items-center">
        {/***********************Title and form******************/}
        <View className="h-full w-full flex justify-around pt-10 pb-10">
          {/***************Title********************/}
          <View className="flex items-center mb-6">
            <Text className="text-green-600 font-bold tracking-wider text-4xl">Rate seller</Text>
          </View>
          {/***************Form********************/}
          <View className="flex items-center mx-4 space-y-4">

            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
              keyboardType='numeric'
                placeholder='Enter your rating'
                placeholderTextColor={'gray'}
                secureTextEntry
                value={userData.rating}
                onChangeText={(text)=>handleInputChange('rating',text)}

              />
            </View>

            <View className="w-full">

            <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleRate}
            >
              <Text className="text-xl font-bold text-white text-center">Rate</Text>
            </TouchableOpacity>

            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  )
}
