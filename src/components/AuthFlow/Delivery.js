import React, { useState } from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity,Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import {useSelector, useDispatch } from "react-redux";

import { globalStyles } from "../../styles/global";
import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";
import { auth } from "../../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { setAuthState } from "../../features/auth/auth";
import { signIn } from "../../features/auth/auth";
import { Colors } from "../../constants/Colors";
import Spash from "../../screens/Spash";

export default function Delivery() {
  const [email, setEmail] = useState("mensajerovillajuana01@gumitressupply.com");
  const [password, setPassword] = useState("delivery_villa_0314");
  const [passVisible, setPassVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function isValidEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async function admAuth({ email, password }) {

    try {
      setIsLoading(true);
      setAlert(false);
      if (!isValidEmail(email)) {
        setAlertMessage(`El correo tiene un formato invalido`);
        setAlert(true);
        setIsLoading(false);
        return;
      }

      if (password === "") {
        setAlertMessage(`El campo password no debe estar vacio`);
        setAlert(true);
        setIsLoading(false);
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log("Firebase user login", user)
          SecureStore.setItemAsync("uToken", user._tokenResponse.idToken);
          SecureStore.setItemAsync("userRoll", "firebase");
          dispatch(signIn(user._tokenResponse.idToken));
          dispatch(setAuthState('firebase'));

          setAlert(false);
          setIsLoading(false);

      }).catch((error) => {
        console.log("FirebaseError",error)
        Alert.alert( `Credenciales inválidas, ${error}`)
        setAlertMessage(
          `Credenciales inválidas, revisar e intentar de nuevo.`
        );
        setAlert(true);
        setIsLoading(false);
      
        // ..
      });


    } catch (err) {
      setIsLoading(false);
    
      console.log(err);
      
    }
  }
  const CustomAlert = () => (
    <View style={styles.contentAlert}>
      <Text style={styles.textAlert}>
        Los campos deben ser validos para continuar.
      </Text>
      <Text style={styles.errorAlert}>{alertMessage}</Text>
    </View>
  );

  if (isLoading) return <Spash />;
  return (
    <View style={globalStyles.screenContainer}>
      <Image
        source={require("../../images/icon.png")}
        style={globalStyles.img}
      />
      <Text style={globalStyles.title}>Gumi Delivery</Text>
      <CustomInput label={"Email"} value={email} onChangeText={setEmail} />
      <CustomInput
        label={"Password"}
        secureTextEntry={!passVisible}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={ ()=> setPassVisible(!passVisible) } >
        <Text style={styles.btnShowPassword}>Ver Password</Text>
      </TouchableOpacity>
      
      {alert ? <CustomAlert /> : ""}
      
      <CustomButtons
        title={"Login"}
        onPress={() => admAuth({ email, password })}
      />

      <TouchableOpacity style={styles.btnSwitchProfile} onPress={() => dispatch(setAuthState('signIn')) }>
        <Text style={styles.btnSwitchProfileLabel}>Cambiar a ADM</Text>
        </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  contentAlert: {
    backgroundColor: Colors.red,
    padding: 10,
    width: "90%",
    margin: 10,
    borderRadius: 8,
  },
  textAlert: {
    color: Colors.ligth,
  },
  btnShowPassword:{
    padding:10,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  btnSwitchProfile:{
    marginTop: 30,
  },
  btnSwitchProfileLabel:{
    padding:10,
    color: Colors.secondary,
  },
  errorAlert: {
    color: Colors.ligth,
    fontWeight: "bold",
  },
});