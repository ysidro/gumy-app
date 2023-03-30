import { TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native'
import React from 'react'

import { Colors } from '../constants/Colors';

export default function CustomButtons({title, onPress, BtnColor}) {
  return (
    <TouchableOpacity style={onPress ? styles.button : styles.buttonNull} onPress={onPress}>
      <Text style={ styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      width: Dimensions.get('window').width - '20',
      height: 45,
      backgroundColor: Colors.primary,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonNull: {
      width: Dimensions.get('window').width - '20',
      height: 45,
      backgroundColor: "#c7ecee",
      padding: 10,
      margin: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors.ligth,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });