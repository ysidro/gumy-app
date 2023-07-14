import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthStack from "./AuthStack"
import Drawers from "./Drawers"
import DeliveryDrawers from "./DeliveryDrawers";

import { restoreToken } from '../features/auth/auth';
import { setAuthState } from '../features/auth/auth';

import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setTodos, setNotificationToken } from '../features/user/user';
import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc, getDocs } from 'firebase/firestore';

import Spash from "../screens/Spash";

export default function RootNavigator() {

  const { userToken,authState, isLoading } = useSelector(state => state.auth)
  
  const dispatch = useDispatch()

  useEffect(() =>{
    getValueFor('uToken')
  },[])

  useEffect(() =>{
    //dispatch(authState(SecureStore.getItemAsync('userRoll'))) 
    const unsubscribeAuth = onAuthStateChanged(auth, async user => {
      const pushNotificationToken =   await AsyncStorage.getItem('@pushNotificationToken');
      console.log("user", user)
      if (user){
        
          const userToSave = {
            id: user.uid,
            notifications: pushNotificationToken,
            name: user.displayName,
            email: user.email,
            task:[],
            createAt: user.metadata.creationTime,
          }
          dispatch(restoreToken(user.stsTokenManager.accessToken))
          dispatch(setAuthState('firebase'))
          getUserFrontDatabase(userToSave);
          dispatch(setUser(userToSave));
    
          //const tasks = await getTodosFormDatabasetoCurrentUser(user.uid);
          //dispatch(setTodos(user.task));
          
    
      }else{
        dispatch(setAuthState('signIn'))

      //  console.log('user no auth')
      }
     console.log(pushNotificationToken);
      return unsubscribeAuth;
    });
  },[])
  

  async function getValueFor(key) {
    try{
        let result = await SecureStore.getItemAsync(key);
       
      if (result !== null) {
        const userRoll = await SecureStore.getItemAsync('userRoll');
        dispatch(setAuthState(userRoll))
        dispatch(restoreToken(result))
      } else {
        dispatch(restoreToken(null))
        dispatch(setAuthState('signIn'))

      }
    }
    catch(err){
      console.error('getValueFor any fail.', err);
    }
  
  }

  async function getUserFrontDatabase(user){
    try{
      const collRef = collection(db, 'users')
      const userRef = doc(collRef,user.id);
      const snapshot = await getDoc(userRef);
    // user.notifications = notifications
    
    if(snapshot.exists()){

      dispatch(setTodos(snapshot.data().task))
      dispatch(setAuthState('firebase'))
      console.log('firebase get user exist')
      return;
      
    }
     // Validate the user object before saving to the database
    if (typeof user === 'object' && user !== null) {
      // Remove any undefined fields from the user object
     // const cleanedUser = Object.fromEntries(Object.entries(user).filter(([_, value]) => value !== undefined));
      
      await setDoc(userRef, user);
      console.log('User saved in the database');
    } else {
      console.error('Invalid user object:', user);
    }
    } catch (error){
      console.error('Failed to get user from the database:', error)
    }
  }

  if(isLoading) return <Spash/>;
 // console.log('root nav', authState)
  if(authState == 'firebase') 
  {
    return (
      <NavigationContainer>
        { userToken ? <DeliveryDrawers/> : <AuthStack/>}
      </NavigationContainer>
    )  
  }
  
  return (
    <NavigationContainer>
      { userToken ? <Drawers/> : <AuthStack/>}
    </NavigationContainer>
  )
}