import React from 'react'
import { View } from 'react-native'

import AddQuotesForm from '../../components/AddQuotesForm'
import { globalStyles } from "../../styles/global"

export default function CreateOrder({ navigation }) {
    return (
        <View style={globalStyles.screenContainer}>
            <AddQuotesForm navigation={navigation}/>
        </View>
    )
}

