import { TouchableOpacity, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import React from 'react';

import { Colors } from '../styles/Colors';

interface Props {
  title?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const GumyButton: React.FC<Props> = ({ title, disabled, onPress }) => {
  return (
    <TouchableOpacity disabled={disabled} style={onPress ? styles.button : styles.buttonNull} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonNull: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    backgroundColor: '#c7ecee',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
