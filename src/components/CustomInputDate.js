import React, { useState,use } from 'react';
import { View, TextInput,Text, StyleSheet, Platform,Button } from 'react-native';

import DatePicker from 'react-native-date-picker'

import { Colors } from '../constants/Colors';

const InputDate =  ({
  label,
  value,
  onChangeText,
  secureTextEntry,
}) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate;
    onChangeText(currentDate);
    setShow(false);
  };

  const showMode = (currentMode) => {
    
    setShow(true);
    setMode(currentMode);
 
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (
    <View style={styles.container}>
      
      <TextInput
         placeholder={label}
         value={value.toLocaleString()}
         onChangeText={onChangeText}
         secureTextEntry={secureTextEntry}
         onPressIn={showDatepicker}
      />
      <DatePicker
        modal
        open={show}
        date={value}
        mode={'date'}
        onConfirm={(value) => {
          setShow(false)
          setDate(date)
        }}
        minuteInterval={new Date()}
        onCancel={() => {
          setShow(false)
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    zIndex: 100,
    margin: 10,
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  callendar:{
    backgroundColor: Colors.ligth,
    position:"absolute",
    zIndex:100,
    
  }
});

export default InputDate;
