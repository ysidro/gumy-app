import { View, Text, Button,Alert } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { signOut } from '../features/auth/auth'
import { auth} from '../firebaseConfig'
import { signOut as singOutFirebase } from 'firebase/auth'

import { globalStyles } from '../styles/global'


export default function Settings() {
  const dispatch = useDispatch()

  return (
    <View style={globalStyles.screenContainer}>
       <Text style={globalStyles.title}>Settings</Text>
       <Button title="Cerrar Session" onPress={ async() => {
        singOutFirebase(auth).catch((e) => { Alert.error(e); })
         await SecureStore.deleteItemAsync('uToken')
         await SecureStore.setItemAsync("userRoll", "signIn");
          dispatch(signOut())
        }} />
    </View>
  )
}