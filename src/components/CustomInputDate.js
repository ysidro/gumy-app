import React, { useState, use } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from '../constants/Colors';

const InputDate = ({
  label,
  value,
  onChangeText,
}) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    onChangeText(currentDate.toLocaleDateString());
    setShow(false);
  };

  const showMode = (currentMode) => {

    setShow(true);
    setMode(currentMode);

  };

  const showDatepicker = () => {
    showMode('date');
  };
  const array = value.split('/');

  return (
    <View style={styles.container}>

      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        onPressIn={showDatepicker}
      />
      {show && (
        <View style={styles.callendar}>
          <DateTimePicker
            locale="es-ES"
            display="spinner"
            testID="dateTimePicker"
            value={new Date(`${array[2]}-${array[1]}-${array[0]}`)}
            mode={mode}
            is24Hour={false}
            minimumDate={new Date()}
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  callendar: {
    backgroundColor: Colors.ligth,

    position: 'absolute',
    flexDirection: 'row',
    left: 10,
    justifyContent: 'space-between'
  }
});

export default InputDate;
