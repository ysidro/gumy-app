import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { AxiosResponse } from 'axios'

import GumyButton from "../common/Button";
import GumyInput from "../common/Input";

import { globalStyles } from "../styles/Global";
import { Colors } from "../styles/Colors";
import { signIn, Response } from "../api";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisible, setPassVisible] = useState(false);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = (text: string) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setEmail(text);

        if (emailRegex.test(text)) {
            setCheckValidEmail(false);
        } else {
            console.log("sdf");

            setCheckValidEmail(true);
        }
    };

    function _signIn() {
        setIsLoading(true);
        setAlert(false);
        signIn<string>({ email, password }).then((result: Response<string>) => {
            console.log(result.data);
            if (result.success) {
                console.log(result.data);
                setIsLoading(false);
            } else {
                setAlertMessage(
                    `Credenciales inválidas, revisar e intentar de nuevo.`
                );
                setAlert(true);
                setIsLoading(false);
            }
            // if (result.status == 200) {
            //     SecureStore.setItemAsync("uToken", result.data?.data);
            //     dispatch(setCredentials({ ...userData, user }))
            // }
        })
    }

    return (
        <View style={globalStyles.screenContainer}>
            <Image
                source={require("../../assets/icon.png")}
                style={globalStyles.img}
            />
            <Text style={globalStyles.title}>Login</Text>
            <GumyInput label={"Email"} value={email} onChangeText={text => handleCheckEmail(text)} />
            {checkValidEmail ? (
                <Text>Wrong format email</Text>
            ) : (
                <Text style={styles.errorAlert}> </Text>
            )}
            <GumyInput
                label={"Password"}
                secureTextEntry={!passVisible}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPassVisible(!passVisible)} >
                <Text style={styles.btnShowPassword}>Ver Password</Text>
            </TouchableOpacity>

            {/* {alert ? <Alert /> : ""} */}

            <GumyButton
                title={"Login"}
                onPress={() => _signIn()}
            />
        </View>
    )
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
        color: Colors.light,
    },
    btnShowPassword: {
        padding: 10,
        fontWeight: "bold",
        color: Colors.secondary,
    },
    errorAlert: {
        color: Colors.light,
        fontWeight: "bold",
    },
});
