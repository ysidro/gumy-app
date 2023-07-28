import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../styles/global'
import SingIn from '../../components/AuthFlow/SingIn'
export default function RegisterNewUser() {
  return (
    <View style={globalStyles.screenContainer}>
    
        <SingIn/>
    </View>
  )
}