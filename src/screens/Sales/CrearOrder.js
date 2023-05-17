import React from 'react'
import { View } from 'react-native'

import CreateOrderForm from '../../components/createOrderForm/CreateOrderForm'
import { globalStyles } from "../../styles/global"

export default function CrearOrder({ navigation }) {
    return (
        <View style={globalStyles.screenContainer}>
            <CreateOrderForm navigation={navigation}/>
        </View>
    )
}

