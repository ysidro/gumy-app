import { View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {MaterialIcons} from "@expo/vector-icons"
import React from 'react'

import { Colors } from '../constants/Colors'

export default function CustomHeader({Title}) {
  const navigation = useNavigation()
  return (
    <View style={{ height:90,
                    width:"100%",
                    backgroundColor:Colors.secundary,
                    paddingHorizontal:20,
                    paddingTop:20,
                    justifyContent:"center",
                    alignItems:"start" }}>
                      <TouchableOpacity onPress={() => navigation.openDrawer() }>
                        <MaterialIcons name="menu" size={24} color="black" />
                      </TouchableOpacity>
      <Text style={{ fontSize:20,
                    fontWeight:"bold",
                    color: Colors.Blueligth}}>{Title}</Text>
    </View>
  )
}