import { useEffect,useState } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store';

import AuthStack from "./AuthStack"
import Drawers from "./Drawers"
import DeliveryDrawers from "./DeliveryDrawers";
import { restoreToken } from '../features/auth/auth';
import { setAuthState } from '../features/auth/auth';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { setTodos, setUser } from '../features/user/user';
import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc,getDocs } from 'firebase/firestore';

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
      if (user){
          const userToSave = {
            id: user.uid,
            email: user.email,
            task:[],
            createAt: user.metadata.creationTime,
          }
    
        
          dispatch(restoreToken(user.stsTokenManager.accessToken))
          dispatch(setAuthState('firebase'))
          
          getUserFrontDatabase(userToSave);
          dispatch(setUser(userToSave));
    
      }else{
        dispatch(setAuthState('signIn'))

      //  console.log('user no auth')
      }
     
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
      console.error('any fail.', err);
    }
  
  }

  function saveUserToDataBase(user) {
    const userRef = collection(db, 'users')
    addDoc(userRef,user);
    console.log('save user to data base');
  }

  async function getAllUsersFormDatabase(){
    try{
      const userRef = collection(db, 'users')
      const snapshot = await getDocs(userRef);
      
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      console.log("Users:", users);
  
    }catch(err){ 
      console.error('any fail.', err)
    }
  }

  function getTodosFormDatabasetoCurrentUser(user){

  }

  async function getUserFrontDatabase(user){
    collection(db, 'users');
    const userRef = doc(db,'users',user.id);
    if(userRef.exists){
      dispatch(setAuthState('firebase'))
      console.log('get user exist')
    }else{
      await setDoc(userRef,user);
      console.log('save user to data base');
    }
  }

  if(isLoading) return <Spash/>;

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