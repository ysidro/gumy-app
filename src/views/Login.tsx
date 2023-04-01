import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';

import { loginFailed, loginSuccess, setLoading } from '../store/reducers/authReducer';
import { GumyAlert, GumyButton, GumyInput, GumySpash } from '../common';
import { globalStyles } from '../styles/Global';
import { Colors } from '../styles/Colors';
import { AuthService } from '../service';
import { RootState } from '../store';

export default function Login() {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('supervisionvillajuana@gmail.com');
  const [password, setPassword] = useState('gTSSUPERVISION456**');
  const [passVisible, setPassVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isEmailValid = (email: string): boolean => {
    // Regex pattern for validating email
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  async function _signIn() {
    setAlert(false);

    if (!isEmailValid(email)) {
      setAlertMessage(`El correo tiene un formato invalido`);
      setAlert(true);
      return;
    }

    if (password === '') {
      setAlertMessage(`El campo password no debe estar vacio`);
      setAlert(true);
      return;
    }

    try {
      setAlert(false);
      dispatch(setLoading());
      const result = await new AuthService().signIn<string>({ email, password });
      if (result.success && result.data) {
        setAlert(false);
        SecureStore.setItemAsync('uToken', result.data);
        dispatch(loginSuccess(result.data));
      } else {
        throw new Error('Credenciales inválidas, revisar e intentar de nuevo.');
      }
    } catch (error: any) {
      console.log(error);

      dispatch(loginFailed(error.message));
      setAlert(true);
    }
  }

  if (isLoading) return <GumySpash />;

  return (
    <View style={globalStyles.screenContainer}>
      <Image source={require('../../assets/icon.png')} style={globalStyles.img} />
      <Text style={globalStyles.title}>Login</Text>
      <GumyInput label={'Email'} value={email} onChangeText={setEmail} />
      <GumyInput label={'Password'} secureTextEntry={!passVisible} value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={() => setPassVisible(!passVisible)}>
        <Text style={styles.btnShowPassword}>Ver Password</Text>
      </TouchableOpacity>

      {alert ? <GumyAlert message={alertMessage} /> : ''}

      <GumyButton title={'Login'} onPress={() => _signIn()} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnShowPassword: {
    padding: 10,
    fontWeight: 'bold',
    color: Colors.secondary
  }
});
