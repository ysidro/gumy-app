import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Colors } from '../styles/Colors';

interface Props {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export const GumyInput: React.FC<Props> = ({ label, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={label} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
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
    backgroundColor: Colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary
  }
});
