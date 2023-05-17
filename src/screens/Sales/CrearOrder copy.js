import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { globalStyles } from "../../styles/global"

import { updateFormField, clearFormsFields } from '../../redux/FormSlice'

import CustomInput from "../../components/CustomInputs"
import Currencies from "../../components/Currencies"
import PaymentTerms from "../../components/PaymentTerms"
import ListCustomers from '../../components/ListCustomers'
import CustomDropDown from '../../components/CustomDropDown'
import InputDate from "../../components/CustomInputDate"
import CustomButtons from "../../components/CustomButtons"
import { restoreToken } from "../../features/auth/auth"

import { Colors } from "../../constants/Colors"


export default function CrearOrder({ navigation }) {

    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

    const [tokenID, setTokenID] = useState(null)
    const [dataLocations, setDataLocations] = useState([]);
    const [employeedID, setEmployeedID] = useState(null)
    const [relationshipID, setRelationshipID] = useState();

    const handlerPaymentTerms = (value) => {
        dispatch(updateFormField({ "fieldName": "PaymentTerms", "value": value }));
    }
    const handleCurrencyChange = (value) => {
        dispatch(updateFormField({ "fieldName": "CurrencyID", "value": value[0] }));
        dispatch(updateFormField({ "fieldName": "ExchangeRate", "value": value[1] }));
    }
    const handleInputChange = (fieldName, value) => {

        dispatch(updateFormField({ "fieldName": fieldName, "value": value }));
       
        if (fieldName === "Relationship") {
            
            setRelationshipID(value.ID)
            setEmployeedID(value.SalesRepID)

            dispatch(updateFormField({ "fieldName": "LocationID", "value": value.LocationID }));
            dispatch(updateFormField({ "fieldName": "PaymentTermID", "value": value.PaymentTermID }));
            //const filteredCurrencies = form.Currencies.filter(currency => currency.ID === value.CurrencyID);
            dispatch(updateFormField({ "fieldName": "CurrencyID", "value": value.CurrencyID }));
        }
    };
    const handleDateChange = (value) => {

        dispatch(updateFormField({ "fieldName": "DocDate", "value": value.toISOString() }));
    };
    
    const navigateToSelectProducts = () =>{
        navigation.navigate('SelectProduct')
    }
    useEffect(() => {
        getLocations('uToken')
        dispatch(clearFormsFields());
    }, [])

    useEffect(() => {
        getEmployee('uToken')
        getRelationshipData('uToken')
        
    }, [employeedID])

    async function getEmployee(key) {
        try {
            let result = await SecureStore.getItemAsync(key);
            if (result !== null) {
                dispatch(restoreToken(key))
                var raw = "";

                var requestOptions = {
                    method: 'GET',
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`https://api.admcloud.net/api/Employee/${employeedID}?token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if(result?.data){
                        const {ID,FullName} =result.data;
                        dispatch(updateFormField({ "fieldName": "Employee", "value": [{"ID":ID,"FullName":FullName}] }));
                        }

                    })
                    .catch(error => console.log('Employee error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }
    
    async function getRelationshipData(key) {
        try {
            let result = await SecureStore.getItemAsync(key);
            if (result !== null) {
                dispatch(restoreToken(key))
                var raw = "";

                var requestOptions = {
                    method: 'GET',
                    body: raw,
                    redirect: 'follow'
                };
                fetch(`https://api.admcloud.net/api/Customers/${relationshipID}?token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if(result?.data){
                            dispatch(updateFormField({ "fieldName": "ShipToAddressID", "value": result.data.Addresses[0] ? result.data.Addresses[0].FullName : "" }));
                            dispatch(updateFormField({ "fieldName": "BillToAddressID", "value": result.data.Addresses[0]  ? result.data.Addresses[0].FullName  : ""  }));
                        }

                    })
                    .catch(error => console.log('Customer error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    async function getLocations(key) {
        try {
            let result = await SecureStore.getItemAsync(key);
            if (result !== null) {
                dispatch(restoreToken(key))
                var raw = "";
                setTokenID(result);
                var requestOptions = {
                    method: 'GET',
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`https://api.admcloud.net/api/Locations?skip=0&token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {

                        setDataLocations(result.data)

                    })
                    .catch(error => console.log('Locations error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    return (
        <View style={globalStyles.screenContainer}>
            
            <SafeAreaView >
                <View style={globalStyles.content}>
                    <ScrollView>
                        <View >
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Fecha</Text>

                                <InputDate
                                    value={form.DocDate}
                                    onChangeText={(value) => handleDateChange(value)}
                                    label={"Fecha"} />

                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Cliente</Text>
                                <ListCustomers
                                    value={form.Relationship}
                                    onChange={(value) => handleInputChange('Relationship', value)}
                                    label={"Cliente"}
                                    tokenID={tokenID}
                                />

                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Referencia</Text>
                                <CustomInput
                                    label={"Referencia"}
                                    value={form.Reference}
                                    onChangeText={(value) => handleInputChange('Reference', value)}

                                />
                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Departamento</Text>
                                <CustomInput
                                    label={"Departamento"}
                                    value={form.DepartmentID}
                                    onChangeText={(value) => handleInputChange('DepartmentID', value)}

                                />
                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Ubicación</Text>
                                
                                 <CustomDropDown 
                                    value={form.LocationID}
                                    onChangeSelect={(value) => handleInputChange('LocationID', value)}
                                    label={"Ubicación"} 
                                    urlDetailed={"Locations"}
                                    urlParameter={"sky=0"}
                                    data={dataLocations } />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Vendedor</Text>
                                <CustomInput
                                    label={"Vendedor"}
                                    value={form.Employee[0]?.FullName}
                                    onChangeText={null}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Terminos</Text>

                                <PaymentTerms value={form.PaymentTermID}
                                    onChangeSelect={(value) => handleInputChange('PaymentTermID', value)}
                                    handlerPaymentTerms={handlerPaymentTerms}
                                    label={"Terminos"}
                                    />
                            </View>


                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Observaciones</Text>
                                <CustomInput
                                    label={"Observaciones"}
                                    value={form.Notes}
                                    onChangeText={(value) => handleInputChange('Notes', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Notas Internas</Text>
                                <CustomInput
                                    label={"Notas Internas"}
                                    value={form.InternalNotes}
                                    onChangeText={(value) => handleInputChange('InternalNotes', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Observaciones</Text>
                                <CustomInput
                                    label={"Observaciones"}
                                    value={form.Notes}
                                    onChangeText={(value) => handleInputChange('Notes', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Moneda</Text>
                                <Currencies
                                    onChangeText={(value) => handleCurrencyChange('ExchangeRate', value)}
                                    label={"Moneda"}
                                    value={form.CurrencyID} />

                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Proyecto</Text>
                                <CustomInput
                                    label={"Proyecto"}
                                    value={form.ProjectID}
                                    onChangeText={(value) => handleInputChange('ProjectID', value)}

                                />


                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Etapa de Venta</Text>

                                <CustomDropDown value={form.SourceTransactionID}
                                    onChangeSelect={(value) => handleInputChange('SourceTransactionID', value)}
                                    label={"Estapa de Venta"} data={[
                                        { "ID": "", "Name": "Terminos" },
                                        { "ID": "8b6ab1d5-1052-4071-b868-9f10f0f30c53", "Name": "Cerrada Aceptada" },
                                        { "ID": "26b48994-8ca8-4a8e-90e0-236a5efee766", "Name": "Cerrada No Respuesta" },
                                        { "ID": "7c9ff81d-f21b-4f2a-aaec-917ed01d6cc0", "Name": "Cerrada Otro" },
                                        { "ID": "1c3e93a0-83c9-47a8-b89f-fb848c507426", "Name": "Cerrada Perdida" },
                                        { "ID": "ea5d4d8f-698d-42fa-9c0b-947bef24fdca", "Name": "Cliente Contactado" },
                                        { "ID": "13f15c46-2090-4400-9fce-8ad9ca5e2342", "Name": "Cliente no Contactado" },
                                        { "ID": "261d0f83-eeda-47cd-8e36-d7f510e2e508", "Name": "Propuesta Presentada" }
                                    ]} />
                            </View>

                            

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Dirección de Envio</Text>
                                <CustomInput
                                    label={"Dirección de Envio"}
                                    value={form.ShipToAddressID}
                                    onChangeText={(value) => handleInputChange('ShipToAddressID', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Dirección de Facturación</Text>
                                <CustomInput
                                    label={"Dirección de Facturación"}
                                    value={form.BillToAddressID}
                                    onChangeText={(value) => handleInputChange('BillToAddressID', value)}

                                />
                            </View> 

                        </View>

                        <CustomButtons
                            title={"Siguiente"}
                            onPress={relationshipID ? () => navigateToSelectProducts() : null}
                        />

                    </ScrollView>
                </View>

            </SafeAreaView>
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
    inputContainer: {
        width: '90%',
        height: 45,
        //  justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: Colors.ligth,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
    },

})