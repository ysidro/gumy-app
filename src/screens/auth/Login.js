import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import base64 from "react-native-base64";
import Constants from "expo-constants";

import { globalStyles } from "../../styles/global";
import CustomInput from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import { signIn } from "../../features/auth/auth";
import { Colors } from "../../constants/Colors";
import Spash from "../Spash";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      const encoder = base64.encode(`${email.toLowerCase()}:${password}`);
      let raw = "";
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${encoder}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        `https://api.admcloud.net/api/Token?Company=${Constants.expoConfig.extra.API_KEY}&RoleID=${Constants.expoConfig.extra.ROLE_ID}&role=${Constants.expoConfig.extra.ROLE_NAME}&appid=${Constants.expoConfig.extra.APPID}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result) {
            const r = JSON.parse(result);

            setAlert(false);
            setIsLoading(false);
            SecureStore.setItemAsync("uToken", r.data);
            dispatch(signIn(r.data));
          } else {
            setAlertMessage(
              `Credenciales inválidas, revisar e intentar de nuevo.`
            );
            setAlert(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("error", error);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }
  const Alert = () => (
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
      <Text style={globalStyles.title}>Login</Text>
      <CustomInput label={"Email"} value={email} onChangeText={setEmail} />
      <CustomInput
        label={"Password"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {alert ? <Alert /> : ""}
      <CustomButtons
        title={"Login"}
        onPress={() => admAuth({ email, password })}
      />
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
  errorAlert: {
    color: Colors.ligth,
    fontWeight: "bold",
  },
});
