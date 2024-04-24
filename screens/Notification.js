import { View, TextInput, Image, Text, ScrollView,TouchableOpacity, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
    const [notifications,setNotifications] = useState([])
    const [change,setChange] = useState(false)
    const [token,setToken] = useState(null)
    async function fetchProducts(token){
        console.log("triggered")
      const {data,status} = await api.getNotifications('admin/notification',token)
    console.log(data)
    try {
      if(status == 200){
        console.log(data.data)
        setNotifications(data.data)
      }
    } catch (error) {
      console.log(error)
    }
    }

  
    useEffect(()=>{
      AsyncStorage.getItem('token',async(err,result)=>{
        if(result){
        
        // setToken(JSON.parse(result))
          await fetchProducts(JSON.parse(result))
        }
      })
    },[change])
    const updateNotification = async (id)=>{
        


            const {data,status} = await api.updateNotification('admin/notification',id)
            console.log(status,"tt")
            try {
                if(status == 200){
                 setChange(true)
                }
              } catch (error) {
                console.log(error)
              }
    
 
    }
      
  return (
    <View className="bg-white h-full flex-1 mt-10">
     
        {/**********************for any offers ****************************/}
     
         {
            notifications.length > 0 && notifications.map((notification)=>{
                return ( 
                    <TouchableOpacity key={notification?._id} >
                    <View className="bg-[#236b18] rounded-lg mx-2 mb-5 p-2 flex-row items-center" >
                  <View className="flex-1 pr-2">
                    <Text className="text-white font-bold text-base mb-1">{notification?.message}</Text>
                    <View className="flex-row items-center mt-1 justify-end">
                      <Text className="text-blue-300 font-bold text-base mr-1" onPress={()=>updateNotification(notification._id)} >Mark as Read</Text>
    
        
                    </View>
                  </View>
                  
                </View>
                </TouchableOpacity>
                )
            })
         }

    
 

      {/* Fixed icons at the bottom of the screen */}

    </View>
  )
}
