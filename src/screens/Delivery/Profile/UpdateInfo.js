import * as React from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store';

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../../../firebaseConfig';

export default function UpdateInfo() {
  
    try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // updateProfile(user,{
            //     displayName: "Villa Juana 01",
            // })
            console.log('Current User:', user);
          } else {
            console.log('No user is currently signed in.');
          }
        });
      } catch (err) {
        console.error('Failed to get the current user:', err);
      }
    // Call the getCurrentUser function whenever you want to check the current user
 
    return (
        <View>
            <Text>UpdateInfo</Text>
        </View>
    )
}