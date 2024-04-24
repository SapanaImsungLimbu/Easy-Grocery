import { View, TextInput, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';

import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios';
import api from '../http/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import WebView from 'react-native-webview';
// import { MapView } from 'expo'

export default function Location() {
  const route = useRoute()
  const orderId = route?.params?.orderId 
  const [data,setData] = useState([])
  async function fetchOrders() {
    
    const { data, status } = await api.getSingleOrder('consumer/order',orderId);
        console.log(status)
    try {
      if (status == 200) {
 
        setData(data.data);
        console.log(data.data)
      
        // Initialize background colors array with default values

      }
    } catch (error) {
      console.log(error);
    }

  }

  
  useEffect(()=>{
    fetchOrders()
  },[orderId])
  console.log(data.fromLatitude)
  const navigation=useNavigation();
  console.log(data.fromLatitude,data.fromLongitude)
  // const url = `https://maps.google.com/?q=${data.fromLatitude},${data.fromLongitude}`
 const url = `https://www.google.com/maps/search/?api=1&query=${data.fromLatitude},${data.fromLongitude}`
  return (

    <WebView source={{uri: url}} />





 
  )
}
