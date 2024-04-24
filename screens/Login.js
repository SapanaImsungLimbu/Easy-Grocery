import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation=useNavigation();
  const [userData,setUserData] = useState({
    email : "",
    password : ""
})
const handleInputChange = (name,text)=>{
    setUserData({
        ...userData,
        [name] : text
    })
}
const handleLogin = async ()=>{
    const {data,status}  = await api.add("login",userData)
    console.log(data,"Data")
    if(status == 200){
        Alert.alert("User Logged In", "The user was logged successfully",[
            {
                text : "OK" , onPress : async ()=>{
                  setUserData({
                    email : "",
                    password : "",
 
                  })
                  await AsyncStorage.setItem('data', JSON.stringify(data.data[0]) );
                  await AsyncStorage.setItem('token', JSON.stringify(data.token) );
                 
                  if(data.data[0].role === 'seller'){

                    navigation.navigate('Farmer',{sellerId:data.data[0]?._id})
                  }else if(data.data[0].role == 'admin'){
                    navigation.navigate("Admin")
                  }
                  else{
                    console.log(data.data[0])
                    navigation.navigate('Home')
                  }
                }
            }
        ])
    }
}


  return (
    <View className="bg-white-200 h-full w-full">
      {/***********************Title and form******************/}
      <View className="h-full w-full flex justify-around pt-30 pb-10">
        {/***************Title********************/}
        <View className="flex items-center">
          <Text className="text-Green font-bold tracking-wider text-5xl">Welcome </Text>
        </View>
        {/***************Form********************/}
        <View className="flex items-center mx-4 space-y-4">

          <View className="bg-black/5 p-3 rounded-2xl w-full">
            <TextInput 
              placeholder='Email' 
              placeholderTextColor={'gray'}
              onChangeText={(text)=>handleInputChange('email',text)}
            />
          </View>
          <View className="bg-black/5 p-3 rounded-2xl w-full">
            <TextInput 
              placeholder='Password' 
              placeholderTextColor={'gray'} 
              secureTextEntry
              onChangeText={(text)=>handleInputChange('password',text)}
            />
          </View>
          <View className="w-full">
            <TouchableOpacity 
              onPress={handleLogin} 
              className="w-full bg-green-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">LogIn</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text>Do not have an account.</Text>
            <TouchableOpacity onPress={()=>navigation.push('SignUp')}>
              <Text className="text-green-400">SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
