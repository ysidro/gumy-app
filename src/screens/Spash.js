import { ActivityIndicator, View, Image } from 'react-native'
import React from 'react'

import { globalStyles } from '../styles/global'

export default function Spash() {
  return (
    <View style={globalStyles.screenContainer}>
      <Image source={ require('../images/icon.png')} style={globalStyles.img} />
      <ActivityIndicator size="large"/>
    </View>
  )
}