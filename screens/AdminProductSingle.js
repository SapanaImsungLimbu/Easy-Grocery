import { View, TextInput, Image, Text, ScrollView,TouchableOpacity, FlatList, Button, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminProduct() {


  const navigation = useNavigation();
  const [products,setProducts] = useState([])
  const route = useRoute()
  const productId = route.params.productId

  async function fetchProducts(token){
    const {data,status} = await api.getMyProductsSingle('myproducts',productId,token)
  
  try {
    if(status == 200){
      setProducts(data.data)
    }
  } catch (error) {
    console.log(error)
  }
  }
  



  useEffect( ()=>{
    AsyncStorage.getItem('token',(err,result)=>{
      if(result){
      
      
        fetchProducts(JSON.parse(result))
      }
    })
  },[])
  const deleteProduct = async()=>{
    // delete product with that productId 
    const result = await api.delete("admin/products",productId)
    console.log(result.status)
    if(result.status === 200){
        Alert.alert("Delete Success","The Product was delete successfully",[
            {
                text : "OK", onPress : ()=>{
                    navigation.navigate("ViewProduct")
                }
            }
        ])
    }else{
        alert("Something Went Wrong")
    }
}
  return (
    <View className="bg-white h-full flex-1">

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Your content here ************************/}



        {/***********************section for products****************************/}
        <View className="px-4 mt-10">
          <Text className="text-xl font-bold text-gray mb-4">Product</Text>
          <View className="flex flex-row flex-wrap -mx-2">
        
          
              <View  className={`w-1/2 px-2}`}>
                <View className="rounded-lg overflow-hidden shadow-md">
                  <TouchableOpacity >
                    <Image className="w-full h-40 rounded-lg" source={{  uri : products?.productImage }}/>
                    <Text className="text-sm font-semibold text-gray-700 mt-2 px-2"> {products.productName}</Text>
                    <TouchableOpacity>
                      <TouchableOpacity onPress={deleteProduct}>

                <Text style={{marginTop:10}}>Delete </Text>
                      </TouchableOpacity>
            </TouchableOpacity>
          
                  </TouchableOpacity>
                </View>
              </View>
         
          </View>
        </View>

      </ScrollView>


    </View>
  )
}
