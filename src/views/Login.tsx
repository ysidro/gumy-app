import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

import GumyButton from "../common/Button";
import GumyInput from "../common/Input";

import { globalStyles } from "../styles/Global";
import { Colors } from "../styles/Colors";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisible, setPassVisible] = useState(false);

    function _signIn() {}

    return (
        <View style={globalStyles.screenContainer}>
            <Image
                source={require("../../assets/icon.png")}
                style={globalStyles.img}
            />
            <Text style={globalStyles.title}>Login</Text>
            <GumyInput label={"Email"} value={email} onChangeText={setEmail} />
            <GumyInput
                label={"Password"}
                secureTextEntry={!passVisible}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPassVisible(!passVisible)} >
                <Text style={styles.btnShowPassword}>Ver Password</Text>
            </TouchableOpacity>

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
