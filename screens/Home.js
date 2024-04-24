import { View, TextInput, Image, Text, ScrollView,TouchableOpacity, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import api from '../http/ApiService';

export default function Home() {

  const ListType = [
    {
      id:1,
      name: 'Fruits',
      onPress: () => navigation.push('Fruit'),
      imageSource: require('../Images/Vege/Image2.png.jpg'),
    },
    {
      id:2,
      name: 'Vegetables',
      onPress: () => navigation.push('Vegetable'),
      imageSource: require('../Images/Vege/Image1.png.jpg'),
    },
    {
      id:3,
      name: 'Nuts',
      onPress: () => navigation.push('Lentils'),
      imageSource: require('../Images/Vege/Image3.png.jpg'),
    },
  ];
  const product =[
    {
      id: 1,
      name: 'Apple of Hills',
      imageSource: require('../Images/Vege/Image1.png.jpg'),
    },
    {
      id: 2,
      name: 'ABC shop',
      imageSource: require('../Images/Vege/Image2.png.jpg'),
    },
    {
      id: 3,
      name: 'Shyam Raj',
      imageSource: require('../Images/Vege/Image3.png.jpg'),
    },
    {
      id: 4,
      name: 'Fresh shop',
      imageSource: require('../Images/Vege/Image4.png.jpg'),    
    },
    {
      id: 5,
      name: 'Apple of Hills',
      imageSource: require('../Images/Vege/Image5.png.jpg'),     
    },
    {
      id: 6,
      name: 'Apple of Hills',
      imageSource: require('../Images/Vege/Image6.png.jpg'),
    },
    {
      id: 7,
      name: 'Vege pasaal',
      imageSource: require('../Images/Vege/Image7.png.jpg'),
    },
    {
      id: 8,
      name: 'Fram easy',
      imageSource: require('../Images/Vege/Image8.png.jpg'),
    },
  ]
  const [filteredProducts,setFilteredProducts] = useState(products)
  const navigation = useNavigation();
  const [products,setProducts] = useState([])
  const [isFilteredState,setIsFilteredState] = useState(false)
  async function fetchProducts(){
    const {data,status} = await api.getAll('product')
    if(status == 200){
      setProducts(data.data)
    }
  }

  useEffect( ()=>{
    fetchProducts()
    fetchSellers()
  },[])
  const filterProduct = (name,state) => {
    setIsFilteredState(state)
    const filteredProduct = products.filter((product) => {
      return product.productType === name;
    });

    setFilteredProducts(filteredProduct);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filterProductsBySearch = (query) => {
    setSearchQuery(query);

    const filtered = products?.filter((product) => {
      return product?.productName?.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const [sellers,setSellers] = useState()
  const fetchSellers = async()=>{
    const {data,status} = await api.getSellers('consumer/sellers')
    if(status === 200){
      setSellers(data.data)
     
    }
  }
  // console.log(filteredProducts[0])
  return (
    <View className="bg-white h-full flex-1">
      <View className="bg-green-600 h-16 px-4 flex flex-row items-center">
        <View className="bg-white h-10 w-full rounded-lg flex flex-row items-center px-4">
          <TextInput placeholder='Search...'     
                    value={searchQuery}
                    onChangeText={(text)=>filterProductsBySearch(text)}
 placeholderTextColor={'gray'} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Your content here ************************/}
        <View className="flex flex-row justify-center items-center my-5">
          {ListType.map((item, index) => (
          <TouchableOpacity key={item._id} onPress={()=>filterProduct(item.name,true)}>
            <View className="flex flex-col items-center" style={{marginRight:45}}>
              <Image className="w-20 h-20 rounded-full" source={item.imageSource} />
              <Text className="text-lg font-bold text-gray-800 mt-2">{item.name}</Text>
            </View>
          </TouchableOpacity>))}
        </View>

        {/* Buy Now section***********************************/}
     {
      !isFilteredState && (
        <View className="px-2 bg-green-200 rounded-lg shadow-md mx-0 my-4">
        <View className="flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-green-700 mr-2 text-shadow-md">Buy Now</Text>
            <AntDesign name="arrowright" size={22} color="#4D7C54" />
          </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mb-2">
          <View className="flex flex-row space-x-2 mx-2">
            <TouchableOpacity onPress={()=>navigation.navigate('ProductEx',{sellerId : '660f534bdd74f728bbe6e5e1'})}>
            <View className="rounded-lg overflow-hidden shadow-lg">
              <Image
                className="w-64 h-64"
                source={{uri : 'https://www.shutterstock.com/image-photo/fresh-fruits-260nw-372770197.jpg'}}
              />
            </View>
            </TouchableOpacity>
       
            <TouchableOpacity onPress={()=>navigation.navigate('ProductEx',{sellerId : '66243cee97af73a7d70fdfb3'})}>
            <View className="rounded-lg overflow-hidden shadow-lg">
              <Image
                className="w-64 h-64"
                source={{uri : 'https://www.shutterstock.com/image-photo/fresh-fruits-260nw-372770197.jpg'}}
              />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('ProductEx',{sellerId : '660f534bdd74f728bbe6e5e1'})}>
            <View className="rounded-lg overflow-hidden shadow-lg">
              <Image
                className="w-64 h-64"
                source={{uri : 'https://www.shutterstock.com/image-photo/fresh-fruits-260nw-372770197.jpg'}}
              />
            </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Text className="text-base font-bold text-green-700 mb-4 mx-2">
          Buy Now to get it in discounted price.
        </Text>
      </View>
      )
     }

        {/***********************section for products****************************/}
        <View className="px-4 mt-4">
          <Text className="text-xl font-bold text-gray mb-4">Popular Products</Text>
          <View className="flex flex-row flex-wrap -mx-2">
            {filteredProducts?.map((item, index) => (
              
              <View key={item._id} className={`w-1/2 px-2 ${index % 2 === 0 ? 'mb-4' : ''}`}>
                <View className="rounded-lg overflow-hidden shadow-md">
                  <TouchableOpacity onPress={() => navigation.push('ProductEx',{sellerId:item.userId._id})}>
                    <Image className="w-full h-40 rounded-lg" source={{  uri : item?.productImage }}/>
                    <Text className="text-sm font-semibold text-gray-700 mt-2 px-2"> {item.productName}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      

        {/**********************for any offers ****************************/}
       {
        sellers?.length > 0 && sellers?.slice(-4).reverse().map((seller)=>{
          
          return ( 
          <TouchableOpacity key={seller._id} onPress={()=>navigation.navigate('sellerDetails',{sellerId : seller._id })}>
              <View className="bg-[#236b18] rounded-lg mx-2 mb-5 p-2 flex-row items-center" >
            <View className="flex-1 pr-2">
              <Text className="text-white font-bold text-base mb-1">{seller.firstName + " " +  seller.lastName}</Text>
              <Text className="text-white text-sm">{seller.email}</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-white font-bold text-base mr-1">4.0</Text>
                <View className="flex-row">
                  <MaterialIcons name="star" size={16} color="yellow" />
                  <MaterialIcons name="star" size={16} color="yellow" />
                  <MaterialIcons name="star" size={16} color="yellow" />
                  <MaterialIcons name="star" size={16} color="yellow" />
                  <FontAwesome name="star-half" size={16} color="yellow" />
                </View>
                <Text className="text-white text-sm ml-1">(12)</Text>
              </View>
            </View>
            
            <Image source={require('../Images/Vege/Image2.png.jpg')} style={{ width: 80, height: 80 }} />
          </View>
          </TouchableOpacity>
          )
        })
       }
    
      </ScrollView>

      {/* Fixed icons at the bottom of the screen */}
      <View style={{ bottom: 0, left: 0, right: 0 }}>
        <View className="bg-white h-16 px-4 flex flex-row items-center justify-between">
          <View>
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Entypo name="home" color={"green"} size={22}/>
              <Text className="text-xs font-bold text-green"> Home</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.push('Payment')}>
              <MaterialIcons name="payment" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Payment</Text>      
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.push('Location')}>
              <Entypo name="location-pin" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Location</Text>     
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.push('MyCart')}>
              <Entypo name="shopping-cart" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> My Cart</Text>     
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.push('Account')}>
              <MaterialCommunityIcons name="account" color={"black"} size={22}/>
              <Text className="text-xs font-bold text-black"> Account</Text>   
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
