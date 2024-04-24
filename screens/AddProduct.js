import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../http/ApiService';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';
import axios from 'axios';


const App = () => {
  const [quantity, setQuantity] = useState(1);
  const navigation=useNavigation();
  const [ doc, setDoc ] = useState();
  const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
    

          if (response.assets.length > 0 ) {       
       
            let { name, size, uri,mimeType } = response.assets[0];
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];

            var fileToUpload = {
              name: name,
              size: size,
              uri: uri,
              type: mimeType

            };
            console.log(fileToUpload)
            console.log(fileToUpload, '...............file')
            setDoc(fileToUpload);
          } 
        });
      // console.log(result);
      console.log("Doc: " + doc);
  }

  const [productType, setProductType] = useState('');



  const [productData,setProductData] = useState({
    productName : '',
    productPrice : '',
    productDiscount : ''

  })

  const handleInputChange = (name,text)=>{
    setProductData({
        ...productData,
        [name] : text
    })
}
const handleCreation = async ()=>{
  const productDataFinal = {
    ...productData,
    productStockQty : quantity,
    productType,
    ...doc
  }
  const formData = new FormData()
  formData.append("productName",productData.productName)
  formData.append("productPrice",productData.productPrice)
  formData.append("productDiscount",productData.productDiscount)
  formData.append("productStockQty",quantity)
  formData.append("productType",productType)
  formData.append("image",doc)

  
  
    const response = await axios.post(`http://10.0.2.2:3000/api/product`,formData,{
      headers : {
          'Authorization' : token,
          'Content-Type' : 'multipart/form-data',
      }
  })
    
 
    if(response.status == 200){
        Alert.alert("Product Created", "The product was created successfully",[
            {
                text : "OK" , onPress : async ()=>{

                    navigation.navigate('ViewProduct')

                }
            }
        ])
    }
}
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const [token,setToken] = useState(null)
  useEffect(()=>{
    AsyncStorage.getItem('token',(err,result)=>{
      if(result){
        // console.log(result)
        setToken(JSON.parse(result))
      }
    })
  },[])


  // Stores the selected image URI 
  const [file, setFile] = useState(null); 
  
  // Stores any error message 
  const [error, setError] = useState(null); 

  // Function to pick an image from  
  //the device's media library 





  return (
    <ScrollView className="flex-1 bg-white-500">
      <View className="p-4">
      <Text style={styles.header}> 
                Add Image: 
            </Text> 
  
            {/* Button to choose an image */} 
            <TouchableOpacity style={styles.button} 
                onPress={pickDocument}> 
                <Text style={styles.buttonText}> 
                    Choose Image 
                </Text> 
            </TouchableOpacity> 
  
            {/* Conditionally render the image  
            or error message */} 
            {file ? ( 
                // Display the selected image 
                <View style={styles.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={styles.image} /> 
                </View> 
            ) : ( 
                // Display an error message if there's  
                // an error or no image selected 
                <Text style={styles.errorText}>{error}</Text> 
            )} 

        <Text className="text-2xl font-bold text-green-700 mb-4">Add Product</Text>

        {/****************************** Image ****************************/}
        <View className="bg-gray-200 rounded-lg p-4 mb-4">
          <Image
            source={require('../Images/Vege/Image5.png.jpg')}
            className="w-full h-48 rounded-lg"
          />
        </View>

        {/**************************** Product Name****************************/}
        <TextInput placeholder="Product Name" className="border border-gray-300 rounded-lg py-2 px-4 mb-4" onChangeText={(text)=>handleInputChange('productName',text)} value={productData.productName} 
     
        
        />

        {/**************************** Price ****************************/}
        <TextInput placeholder="Price" keyboardType="numeric"className="border border-gray-300 rounded-lg py-2 px-4 mb-4" onChangeText={(text)=>handleInputChange('productPrice',text)} value={productData.productPrice}/>

        {/**************************** Quantity ****************************/}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={decrementQuantity} className="bg-green-700 rounded-lg py-2 px-4">
            <Text className="text-white font-bold">-</Text>
          </TouchableOpacity>
          <Text className="mx-4 text-lg font-bold">{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} className="bg-green-700 rounded-lg py-2 px-4">
            <Text className="text-white font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/**************************** Offer****************************/}
        <TextInput placeholder="Discounted Offer (optional)" className="border border-gray-300 rounded-lg py-2 px-4 mb-4" onChangeText={(text)=>handleInputChange('productDiscount',text)} value={productData.productDiscount}/>

        {/**************************** Product Type ****************************/}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Product Type</Text>
          <Picker selectedValue={productType} onValueChange={(itemValue) => setProductType(itemValue)} className="border border-gray-300 rounded-lg">
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Fruit" value="Fruits" />
            <Picker.Item label="Vegetable" value="Vegetables" />
            <Picker.Item label="Nuts" value="Nuts" />
          </Picker>
        </View>
        {/**************************** Add product Button ****************************/}
        <TouchableOpacity style={{ paddingVertical: 16, paddingHorizontal: 24 }} className="bg-green-700 rounded-lg py-4 px-6" activeOpacity={0.8} onPressIn={handleCreation}>
          <Text className="text-white font-bold text-lg">Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
  container: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      padding: 16, 
  }, 
  header: { 
      fontSize: 20, 
      marginBottom: 16, 
  }, 
  button: { 
      backgroundColor: "#007AFF", 
      padding: 10, 
      borderRadius: 8, 
      marginBottom: 16, 
      shadowColor: "#000000", 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.4, 
      shadowRadius: 4, 
      elevation: 5, 
  }, 
  buttonText: { 
      color: "#FFFFFF", 
      fontSize: 16, 
      fontWeight: "bold", 
  }, 
  imageContainer: { 
      borderRadius: 8, 
      marginBottom: 16, 
      shadowColor: "#000000", 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.4, 
      shadowRadius: 4, 
      elevation: 5, 
  }, 
  image: { 
      width: 200, 
      height: 200, 
      borderRadius: 8, 
  }, 
  errorText: { 
      color: "red", 
      marginTop: 16, 
  }, 
});
export default App;