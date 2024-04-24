import { View, TextInput, Image, Text, ScrollView,TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './SellerCard';

export default function ViewProduct() {

  const [refreshing,setRefreshing] = useState(false)
  const navigation = useNavigation();
  const [products,setProducts] = useState([])
  async function fetchProducts(token){
    const {data,status} = await api.getMyProducts('myproducts',token)
  
  try {
    if(status == 200){
      setProducts(data.data)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setRefreshing(false)
  }
  }
  const handleRefresh = async ()=>{
   
    setRefreshing(true)
    AsyncStorage.getItem('token',async (err,result)=>{
      if(result){
      
      
        await fetchProducts(JSON.parse(result))
      }
    })
 
  }

  useEffect(()=>{
    AsyncStorage.getItem('token',async(err,result)=>{
      if(result){
      
      
        await fetchProducts(JSON.parse(result))
      }
    })
  },[])
  return (
    <View className="bg-white h-full flex-1">
    {/* 
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
            {/* Your content here ************************/}
    
    
    
            {/***********************section for products****************************/}
            <View className="px-4 mt-10">
              <Text className="text-xl font-bold text-gray mb-4">Seller Products</Text>
              <View className="flex flex-row flex-wrap -mx-2">
              <FlatList data={products} renderItem={({item})=>(
                        <Card data={item}  />  
        )} keyExtractor={(item)=>item._id}  
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['red','blue']}  progressBackgroundColor={'white'}  />
        }
        
        />
              </View>
            </View>
            {/**********************for any offers ****************************/}
    
          {/* </ScrollView> */}
    
    
        </View>
  )
}
