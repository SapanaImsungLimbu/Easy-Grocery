import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';

export default function SignUp() {

  const navigation = useNavigation();
  const [userData,setUserData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    address : ""
})
const [role,setRole] = useState('consumer')
const handleInputChange = (name,text)=>{
    setUserData({
        ...userData,
        [name] : text
    })
}
const handleRegister = async ()=>{
  const userDataFinal = {
    ...userData,
    role
  }
  console.log(userDataFinal)
    const {data,status}  = await api.add("register",userDataFinal)
    console.log(data,status)
   
    if(status === 200){
        Alert.alert("User Created", "The user was created successfully",[
            {
                text : "OK" , onPress : ()=>{
                    
                    setUserData({
                        userDataName : "",
                        userDataDescription : "",
                        userDataImage : ""
                    })
                    navigation.navigate('Login')
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
            <Text className="text-green-600 font-bold tracking-wider text-4xl">Welcome</Text>
          </View>
          {/***************Form********************/}
          <View className="flex items-center mx-4 space-y-4">
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='First Name'
                placeholderTextColor={'gray'}
                value={userData.firstName}
                onChangeText={(text)=>handleInputChange('firstName',text)}

              />
            </View>
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='Last Name'
                placeholderTextColor={'gray'}
                value={userData.lastName}
                onChangeText={(text)=>handleInputChange('lastName',text)}

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
                placeholder='Address'
                placeholderTextColor={'gray'}
                value={userData.address}
                onChangeText={(text)=>handleInputChange('address',text)}

              />
            </View>
            <View className="bg-gray-200 p-3 rounded-2xl w-full">
              <TextInput
                placeholder='Password'
                placeholderTextColor={'gray'}
                secureTextEntry
                value={userData.password}
                onChangeText={(text)=>handleInputChange('password',text)}

              />
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="font-semibold">Choose your role</Text>
              <View className="flex flex-row space-x-4">
                <TouchableOpacity
                  className={`p-2 rounded-md ${role == 'Seller' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onPress={() => setRole('seller')}
                >
                  <Text className="font-semibold">Seller</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`p-2 rounded-md ${role == 'Consumer' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onPress={() => setRole('consumer')}
                >
                  <Text className="font-semibold">Consumer</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleRegister}
              >
                <Text className="text-xl font-bold text-white text-center">Create Account</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('Login')}>
                <Text className="text-green-600 font-semibold"> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
