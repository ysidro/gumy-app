import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store';

import AuthStack from "./AuthStack"
import Drawers from "./Drawers"
import { restoreToken } from '../features/auth/auth';

import Spash from "../screens/Spash";

export default function RootNavigator() {

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
    } else {
      dispatch(restoreToken(null))
    }
    }
    catch(err){
      console.error('any fail.', error);
    }
  }

  if(isLoading) return <Spash/>;

  return (
    <NavigationContainer>
      { userToken ? <Drawers/> : <AuthStack/>}
    </NavigationContainer>
  )
}