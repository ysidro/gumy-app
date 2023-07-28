import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { signOut } from '../features/auth/auth'

import { globalStyles } from '../styles/global'


export default function Settings() {
  const dispatch = useDispatch()

  return (
    <View style={globalStyles.screenContainer}>
       <Text style={globalStyles.title}>Settings</Text>
       <Button title="Cerrar Session" onPress={ async() => {
         await SecureStore.deleteItemAsync('uToken')
         await SecureStore.deleteItemAsync('userRoll')
          dispatch(signOut())
        }} />
    </View>
  )
}