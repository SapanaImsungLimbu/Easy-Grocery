import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../http/ApiService';

export default function MyCart() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]); // State for background colors
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items

  async function fetchProducts(token) {
    AsyncStorage.getItem('token', async (err, result) => {
    const { data, status } = await api.getMyProducts('consumer/cart', JSON.parse(result));
    console.log("calledFP")
    try {
      if (status == 200) {
        setProducts(data.data);
        // Initialize background colors array with default values
        setBackgroundColors(Array(data.data.length).fill('white'));
      }
    } catch (error) {
      console.log(error);
    }
  })
  }

  const total = products.reduce((acc, product) => {
    return acc + product.product.productPrice;
  }, 0);

  useEffect(() => {
    AsyncStorage.getItem('token', async (err, result) => {
      if (result) {
        await fetchProducts(JSON.parse(result));
      }
    });
  }, []);

  const handleCirclePress = (index) => {
    // Toggle background color for the clicked product
    const updatedColors = [...backgroundColors];
    updatedColors[index] = updatedColors[index] === 'white' ? 'black' : 'white';
    setBackgroundColors(updatedColors);

    // Toggle selected item
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  }

  const deleteFromCart = async(id)=>{
    console.log("called")
    AsyncStorage.getItem('token',async(err,result)=>{
      if(result){
  
      
        const {response,status} = await api.deleteFromCart('consumer/cart/' + id,JSON.parse(result))
        console.log(status)
        if(status == 200){
          Alert.alert("Removed from Cart", "The item was removed",
          [
            {
                text : "OK" , onPress : async ()=>{

                    fetchProducts()

                }
            }
        ]
          )
        }
      }
    })
  }
  return (
    <View className="bg-white-0 h-full w-full">
      {/* Fixed Navbar? */}
      <View className="bg-green-600 h-16 px-4 flex flex-row items-center justify-between">
        <Text className="text-gray text-3xl font-bold tracking-wider">My Cart</Text>
        <View className="flex flex-row items-center">
          <Text className="text-gray text-2xl font-bold tracking-wider mr-2">Delete</Text>
          <MaterialCommunityIcons name="delete" color={"brown"} size={22} />
        </View>
      </View>

      {/* Customer cart list */}
      <View className="px-4">
        {
          products?.map((product, index) => {
            return (
              <>
                <View className="flex flex-row items-center mt-4" key={index}>
                  <Entypo name="circle" color={"gray"} size={22} onPress={() => handleCirclePress(index)} style={{ backgroundColor: backgroundColors[index] }} />

                  <Image className="w-32 h-24 rounded-xl ml-10" source={{uri : product?.product.productImage}} />
                  <View className="ml-10">
                    <Text className="text-gray text-xl">{product.product.productName}</Text>
                    <Text className="text-gray text-xl">Price: Rs {product.product.productPrice}</Text>
                  </View>
                </View>
                {selectedItems.includes(index) && // Only render delete button for selected items
                  <View className='pt-5' >
                    <Button title='Delete' onPress={() => deleteFromCart(product?.product._id)} />
                  </View>
                }
              </>
            )
          })
        }

      </View>

      {/* Place that will have the total of customer purchase */}
      <View style={{ position: 'absolute', bottom: 80, left: 0, right: 0 }}>
        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10, marginHorizontal: 10 }}>
          <View className="flex flex-row items-center">
            <View className="ml-4">
              <Text className="text-gray text-xl">Delivery Fee: Rs 50</Text>
              <Text className="text-gray text-xl">Total: Rs {total}</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('checkout',{products,total})} style={{ backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 'auto' }}>
              <Text style={{ color: 'white' }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* fixed icons at the buttom of screen */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Entypo name="home" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Home</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Payment')}>
              <MaterialIcons name="payment" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Payment</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Location')}>
              <Entypo name="location-pin" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Location</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('MyCart')}>
              <Entypo name="shopping-cart" color={"green"} size={22} />
              <Text className="text-xs font-bold text-green"> My Cart</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity onPress={() => navigation.push('Account')}>
              <MaterialCommunityIcons name="account" color={"black"} size={22} />
              <Text className="text-xs font-bold text-black"> Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  )
}
