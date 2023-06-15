import React, {useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { restoreToken } from '../features/auth/auth'
import Onboarding from "./Onboarding"
import ServicesSales from '../services/Sales'
import { globalStyles } from '../styles/global'

export default function Home({navigator}) {

  const [name, setName] = useState(null);

  const { userToken, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() =>{

    getValueFor('uToken')
  },[])

  async function getValueFor(key) {
    try{

      let result = await SecureStore.getItemAsync(key);
      if (result !== null) {
        dispatch(restoreToken(key))
        var raw = "";
        var requestOptions = {
      
          method: 'GET',
          body: raw,
          redirect: 'follow'
      
        };
        
        fetch(`https://api.admcloud.net/api/Company?token=${result}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setName(result.data.CompanyName)})
        .catch(error => console.log('error', error));
      
      } else {
      
        dispatch(restoreToken(null))
        console.log('home no data');
      
      }
    }
    catch(err){
      console.error('any fail.', err);
    }
  }

  async function checkIfFirstLaunch(){
    const firshLaunch = await AsyncStorage.getItem('@firstLaunch');
    if(firshLaunch){
      return;
    }else{
      await AsyncStorage.setItem('@firstLaunch', 'true' );
      navigator.navigate('AsyncStorage');
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Home</Text>
      <Text>{name}</Text>
      <ServicesSales/>
    </View>
  )
}