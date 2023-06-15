import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'

import { updateFormField, clearFormsFields } from '../../redux/FormSlice'
import { restoreToken } from "../../features/auth/auth"

import Currencies from "../../components/Currencies"
import CustomInput from "../../components/CustomInputs"
import InputDate from "../../components/CustomInputDate"
import ListCustomers from '../../components/ListCustomers'
import GetLocations from '../../components/GetLocations'
import GetEmployee from '../../components/GetEmployee'
import PaymentTerms from "../../components/PaymentTerms"
import GetSalesStages from "../../components/GetSalesStages"
import CustomButtons from "../../components/CustomButtons"

export default function CreateOrderForm({navigation}) {
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
            console.error('any fail.', err);
        }
    }

    const handleDateChange = (value) => {
        dispatch(updateFormField({ "fieldName": "DocDate", "value": value.toISOString() }));
    };

    const handleInputChange = (fieldName, value) => {
        // console.log(fieldName, form);
        dispatch(updateFormField({ "fieldName": fieldName, "value": value }));

    };

    return (

        <View style={style.content}>
            <ScrollView>
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
                    <Text style={style.InputLabel}>Referencia</Text>
                    <CustomInput
                        label={"Referencia"}
                        value={form.Reference}
                        onChangeText={(value) => handleInputChange('Reference', value)}

                    />
                </View>
                <View >
                    <Text style={style.InputLabel}>Departamento</Text>
                    <CustomInput
                        label={"Departamento"}
                        value={form.DepartmentID}
                        onChangeText={(value) => handleInputChange('DepartmentID', value)}

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

                    <PaymentTerms label={"Terminos"}
                    />
                </View>
                <View >
                    <Text style={style.InputLabel}>Observaciones</Text>
                    <CustomInput
                        label={"Observaciones"}
                        value={form.Notes}
                        onChangeText={(value) => handleInputChange('Notes', value)}

                    />
                </View>
                <View >
                    <Text style={style.InputLabel}>Notas Internas</Text>
                    <CustomInput
                        label={"Notas Internas"}
                        value={form.InternalNotes}
                        onChangeText={(value) => handleInputChange('InternalNotes', value)}

                    />
                </View>
                <View >
                    <Text style={style.InputLabel}>Moneda</Text>
                    <Currencies label={"Moneda"} />

                </View>
                <View >
                    <Text style={style.InputLabel}>Proyecto</Text>
                    <CustomInput
                        label={"Proyecto"}
                        value={form.ProjectID}
                        onChangeText={(value) => handleInputChange('ProjectID', value)}

                    />


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
                        onChangeText={(value) => handleInputChange('ShipToAddressID', value)}

                    />
                </View>
                <View >
                    <Text style={style.InputLabel}>Dirección de Facturación</Text>
                    <CustomInput
                        label={"Dirección de Facturación"}
                        value={form.BillToAddressID}
                        onChangeText={(value) => handleInputChange('BillToAddressID', value)}

                    />
                </View>

                <CustomButtons
                            title={"Siguiente"}
                            onPress={form.RelationshipID ? () => navigation.navigate('SelectProduct',{customerData:customerData}) : null}
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