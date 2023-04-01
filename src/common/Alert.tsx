import { View, StyleSheet, Text } from 'react-native';
import { FC } from 'react';
import { Colors } from '../styles/Colors';

interface Props {
  message: string;
}

export const GumyAlert: FC<Props> = ({ message }) => {
  return (
    <View style={styles.contentAlert}>
      <Text style={styles.textAlert}>Los campos deben ser validos para continuar.</Text>
      <Text style={styles.errorAlert}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentAlert: {
    backgroundColor: Colors.red,
    padding: 10,
    width: '90%',
    margin: 10,
    borderRadius: 8
  },
  textAlert: {
    color: Colors.light
  },
  errorAlert: {
    color: Colors.light,
    fontWeight: 'bold'
  }
});
