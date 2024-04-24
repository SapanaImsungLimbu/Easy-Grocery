import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile() {

  const navigation = useNavigation();
  const [userData,setUserData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    address : ""
})
const handleInputChange = (name,text)=>{
    setUserData({
        ...userData,
        [name] : text
    })
}
const handleEdit = async ()=>{

    console.log(userData)
  
       try {
        const response = await axios.patch(`http://10.0.2.2:3000/api/consumer/profile`,userData,{
            headers : {
                "Content-Type" : "application/json",
                'Authorization' :  JSON.parse(await AsyncStorage.getItem('token'))
            }
        })
    
    
          if(response.status === 200){
        
            Alert.alert("Profile Edited", "The profile was updated successfully",[
                {
                    text : "OK" , onPress : ()=>{
                        
                   
                        navigation.navigate('Account')
                    }
                }
            ])
        }else{
          alert('Something went wrong')
        }
       } catch (error) {
        console.log(error)
        alert(error?.response?.data?.message)
       }
      }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="bg-white-300 h-full w-full flex justify-center items-center">
        {/***********************Title and form******************/}
        <View className="h-full w-full flex justify-around pt-10 pb-10">
          {/***************Title********************/}
          <View className="flex items-center mb-6">
            <Text className="text-green-600 font-bold tracking-wider text-4xl">Edit Profile</Text>
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
    
            <View className="w-full">
              <TouchableOpacity className="w-full bg-green-600 p-3 rounded-2xl mb-3" onPressIn={handleEdit}
              >
                <Text className="text-xl font-bold text-white text-center">Edit Profile</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  )
}
