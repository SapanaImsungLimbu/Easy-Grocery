import { useRoute } from '@react-navigation/native'
import React from 'react'
import WebView from 'react-native-webview'

const Khalti = () => {
    const route = useRoute()
    const url = route.params.url 
  return (
    <WebView source={{uri: url}} />
  )
}

export default Khalti