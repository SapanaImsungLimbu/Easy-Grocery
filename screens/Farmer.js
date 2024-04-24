import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionicons from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const route= useRoute()

  return (
    <View className="flex-1 justify-between items-center bg-white">
      <View className="mt-12">
        <Text className="text-green-700 font-bold tracking-wider text-5xl">Welcome</Text>
      </View>
      <View className="flex-col space-y-6 w-3/4">
        <TouchableOpacity
          className="bg-green-500 py-4 px-6 rounded-lg shadow-md"
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Text className="text-white font-bold text-lg">Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 py-4 px-6 rounded-lg shadow-md"
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ViewProduct')}
        >
          <Text className="text-white font-bold text-lg">View Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 py-4 px-6 rounded-lg shadow-md"
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text className="text-white font-bold text-lg">View Orders</Text>
        </TouchableOpacity>
      </View>
      <View className =" h-16 px-4 flex flex-row items-center justify-between mb-4">
        <View className="mr-20">
          <TouchableOpacity>
            <Entypo name="home" color={"green"} size={30} />
            <Text className="text-xs font-bold text-green"> Home</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications" color={"black"} size={30} />
            <Text className="text-xs font-bold text-black"> Notification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;