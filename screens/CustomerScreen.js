import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../http/ApiService';

const UsersScreen = () => {
  const navigation = useNavigation();

  const [sellers,setSellers] = useState([])
  const fetchUsers = async ()=>{
    
    const {data,status} = await api.getAll("admin/customers")
  
    if(status === 200){
        
        setSellers(data.data)
    }
   }
   useEffect(()=>{
  
     fetchUsers()
   },[])


  // Render each user item
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.firstName}</Text>
      <Text style={styles.userEmail}>{item.lastName}</Text>
      <Text style={styles.userRole}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumers</Text>
      <FlatList
        data={sellers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    flex: 1,
    fontWeight: 'bold',
  },
  userEmail: {
    flex: 1,
    color: '#666',
  },
  userRole: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsersScreen;
