import * as React from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux"

import { globalStyles } from '../../styles/global'
export default function DeliveryHome() {

  const delivery = useSelector(state => state.user);
  //const dispatch = useDispatch();

  console.log(delivery)
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Delivery Home</Text>
    </View>
  )
}