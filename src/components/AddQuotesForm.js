import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView,Alert } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'

import { updateFormField,  clearFormsFields } from '../redux/FormSlice'
import { restoreToken } from "../features/auth/auth"

import { globalStyles } from '../styles/global'

import Currencies from "./Currencies"
import CustomInput from "./CustomInputs"
import InputDate from "./CustomInputDate"
import ListCustomers from './ListCustomers'
import GetLocations from './GetLocations'
import GetEmployee from './GetEmployee'
import PaymentTerms from "./PaymentTerms"
import GetSalesStages from "./GetSalesStages"
import CustomButtons from "./CustomButtons"

export default function AddQuotesForm({navigation}) {
    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

    const [tokenID, setTokenID] = useState(null);
    const [customerData, setCustomerData] = useState([])

    useEffect(() => {
        getTokenID();
        dispatch(clearFormsFields());
    }, [])

    async function getTokenID() {
        try {
            const key = 'uToken';
            let result = await SecureStore.getItemAsync(key);
            if (result !== null) {
                dispatch(restoreToken(key));
                setTokenID(result);
            } else {
                setTokenID(null);
                dispatch(restoreToken(null))
                console.log('order form no data');
            }
        } catch (err) {
            console.error('getTokenID any fail.', err);
        }
    }

    const handleDateChange = (value) => {
        dispatch(updateFormField({ "fieldName": "DocDate", "value": value.toISOString() }));
    };

    const handleInputChange = (fieldName, value) => {
        // console.log(fieldName, form);
        dispatch(updateFormField({ "fieldName": fieldName, "value": value }));

    };

    const handleNavigateToSelectProduct = () => {
     
        if(!form.LocationID){
            Alert.alert("Favor seleccione una Ubicación valida para continuar");
            return
        }
        if(form.RelationshipID){
            navigation.navigate('SelectProduct',{customerData:customerData})
        }
        
    }

    return (

        <View style={style.content}>
            <ScrollView>
            <View style={style.content}>
                <Text style={globalStyles.title}>Cotización</Text>
            </View>
                <View >
                    <Text style={style.InputLabel}>Fecha</Text>

                    <InputDate
                        value={form.DocDate}
                        onChangeText={(value) => handleDateChange(value)}
                        label={"Fecha"} />

                </View>

                <View >
                    <Text style={style.InputLabel}>Cliente</Text>
                    <ListCustomers
                        value={form.RelationshipID}
                        onChange={(value) => setCustomerData(value)}
                        label={"Cliente"}
                        tokenID={tokenID}
                    />
                </View>

            
                <View >
                    <Text style={style.InputLabel}>Ubicación</Text>
                    <GetLocations />
                </View>
                <View >
                    <Text style={style.InputLabel}>Vendedor</Text>
                    {form.EmployeeID ? <GetEmployee tokenID={tokenID} /> : <CustomInput
                        label={"Vendedor"} onChangeText={null}

                    />}

                </View>
                <View >
                    <Text style={style.InputLabel}>Terminos</Text>
                    <PaymentTerms label={"Terminos"}/>
                </View>
                
                <View >
                    <Text style={style.InputLabel}>Notas Internas</Text>
                
                    <CustomInput
                        label={"Notas Internas"}
                        value={form.InternalNotes}
                        onChangeText={(value) => handleInputChange('InternalNotes', value)} />

                </View>

                <View >
                    <Text style={style.InputLabel}>Moneda</Text>
                    <Currencies label={"Moneda"} />
                </View>
                
                <View >
                    <Text style={style.InputLabel}>Etapa de Venta</Text>
                    <GetSalesStages/>
                </View>

                <View >
                    <Text style={style.InputLabel}>Dirección de Envio</Text>
                    <CustomInput
                        label={"Dirección de Envio"}
                        value={form.ShipToAddressID}
                        onChangeText={(value) => handleInputChange('ShipToAddressID', value)} />
                </View>

                <View >
                    <Text style={style.InputLabel}>Dirección de Facturación</Text>
                    <CustomInput
                        label={"Dirección de Facturación"}
                        value={form.BillToAddressID}
                        onChangeText={(value) => handleInputChange('BillToAddressID', value)}  />
                </View>

                <CustomButtons
                            title={"Siguiente"}
                            onPress={() => handleNavigateToSelectProduct()}
                        />

            </ScrollView>
        </View>
    )
}



const style = StyleSheet.create({
    floatContainer: {
        position: 'absolute',
        top: 40,
        width: "100%",
        display: "flex",
        flex: 1,
        height: 200,
        marginHorizontalAlignment: "center",
        zIndex: 999,
        backgroundColor: 'blue',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    content: {
        //  justifyContent: 'center',
        marginTop: 15,
        width: "100%",
    },
    InputLabel: { "marginHorizontal": 15, fontWeight: "bold" },

})