import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

import { Colors } from '../constants/Colors';
import { globalStyles } from '../styles/global';
export default function CustomButtons({title, onPress, styleButton}) {

  if(styleButton){
    let stylebTn;
    if(styleButton === 'primary')
    {
        return (
          <TouchableOpacity style={onPress ?  [globalStyles.btnPrimaryStyle,{width: "96%"}] : styles.buttonNull} 
            onPress={onPress}>
              <Text style={ styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        )
    }
    if(styleButton === 'secudary')
    {
        return (
          <TouchableOpacity style={onPress ?  [globalStyles.btnSecundaryStyle,{width: "96%",margin: 10}] : styles.buttonNull} 
            onPress={onPress}>
              <Text style={ styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        )
    }
    if(styleButton === 'warning')
    {
        return (
          <TouchableOpacity style={onPress ?  [globalStyles.btnWarning,{width: "96%",margin: 10}] : styles.buttonNull} 
            onPress={onPress}>
              <Text style={ styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        )
    }
  }else{
    return (
      <TouchableOpacity style={onPress ?  styles.button : styles.buttonNull} 
        onPress={onPress}>
          <Text style={ styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    )
  }
  
}

const styles = StyleSheet.create({
    button: {
      width: "96%",
      height: 45,
      backgroundColor:  Colors.primary,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonNull: {
      //width: Dimensions.get('window').width - '20',
      width: "96%"  ,
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