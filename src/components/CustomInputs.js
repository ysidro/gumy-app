import { View, StyleSheet, TextInput,Dimensions } from 'react-native'
import React from 'react'

import { Colors } from '../constants/Colors';

export default function Inputs({
  label,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={label}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 45,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});