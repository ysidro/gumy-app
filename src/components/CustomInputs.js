import { View, StyleSheet, TextInput,Dimensions, textarea } from 'react-native'
import React from 'react'

import { Colors } from '../constants/Colors';

export default function Inputs({
  label,
  value,
  onChangeText,
  secureTextEntry,
  typeTextArea = false,
}) {
  return (
    <View style={styles.container}>
       <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        multiline={typeTextArea}
        secureTextEntry={secureTextEntry}
      /> 
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20,
    // height: 205,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
 

});