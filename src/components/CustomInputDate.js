import React, { useState, use } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from '../constants/Colors';

const InputDate = ({
  label,
  value,
  onChangeText,
  inputWidth,
  minimumDate,
  maximumDate,
}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showIos, setShowIos] = useState(false);
  const onChange = (event, selectedDate) => {
    if(Platform.OS === 'android'){
      setShow(false);
    }
 
    onChangeText(selectedDate);

  };

  const showMode = (currentMode) => {
    if(Platform.OS !== 'android'){
      setShowIos(true);
    }

    setShow(true);
    setMode(currentMode);

  };

  const hiddeDatepicker = () => {
    setShow(false);
    setShowIos(false);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <>
    <View style={[showIos ? styles.containerOpen : styles.container, {  width: inputWidth ? inputWidth : '95%' }]}>

      <TouchableOpacity
        
        onPressIn={showDatepicker}
      > 
        <Text> {label} {new Date(value).toLocaleDateString('es-ES')}</Text>
      </TouchableOpacity>
     
    </View>

    {show && (
        <View style={styles.callendar}>
          
          <DateTimePicker
            display="inline"
            testID="dateTimePicker"
            value={new Date(value)}
            mode={mode}
            is24Hour={false}
            format="YYYY-MM-DD"
            minimumDate={ minimumDate ? new Date() : null }
            maximumDate={ maximumDate ? null : new Date() }
            onChange={onChange}
          />
         {showIos ? <Button title="Confirmar" onPress={()=>hiddeDatepicker()} /> :""}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerOpen: {
    width: '95%',
    height:  365,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  container: {
    width: '95%',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  callendar: {
    backgroundColor: Colors.light,
    position: 'absolute',
    bottom: 25,
    left:22,
    zIndex: 999,
    width: '90%',  
  }
});

export default InputDate;
