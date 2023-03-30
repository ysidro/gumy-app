import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { globalStyles } from "../../styles/global"

import { updateFormField, addItem } from '../../redux/FormSlice'

import CustomInput from "../../components/CustomInputs"
import Currencies from "../../components/Currencies"
import PaymentTerms from "../../components/PaymentTerms"
import ListCustomers from '../../components/ListCustomers'
import ListArticles from '../../components/ListItems'
import CustomDropDown from '../../components/CustomDropDown'
import InputDate from "../../components/CustomInputDate"
import CustomButtons from "../../components/CustomButtons"
import { restoreToken } from "../../features/auth/auth"

import { Colors } from "../../constants/Colors"
import Spash from "../Spash";



export default function CrearOrder({ navigation }) {

    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);
    
    const [isAdding, setIsAdding] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [selectedItemID, setSelectedItemID] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [dataLocations, setDataLocations] = useState([]);
    const [employeedID, setEmployeedID] = useState(null)
   const [relationshipID, setRelationshipID] = useState();
    const handlerDShowAddItems = () => {
        setShowAddItems(true);
    }
    
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

    const handlePreseletItemInputChange = (value) => {

        setSelectedItemID(value.ID)
        setSelectedItems([])

    };
    const handleItemInputChange = (value) => {

        dispatch(addItem(selectedItems));
        setSelectedItems([])
        setSelectedItemID(false)
        setLoadingData(false)
    };

 
    const handleCurrentInputChange = (value,fieldName) => {
        
        setSelectedItems(prevState => ({
            ...prevState,
            [fieldName] : value,
          }));
      };

      useEffect(() => {
        getLocations('uToken')
    }, [])

    
    useEffect(() => {
        getEmployee('uToken')
        getRelationshipData('uToken')
    }, [employeedID])

    useEffect(() => {
        setSelectedItems([])
        ItemsServices('uToken')

    }, [showAddItems])

    useEffect(() => {

        setLoadingData(false)
        getItem('uToken')

    }, [selectedItemID])


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
                            dispatch(updateFormField({ "fieldName": "ShipToAddressID", "value": result.data.Addresses[0].FullName }));
                            dispatch(updateFormField({ "fieldName": "BillToAddressID", "value": result.data.Addresses[0].FullName }));
                        }

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

    async function getLocations(key) {
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


    async function getItem(key) {
        try {

            if (selectedItemID) {
                setIsAdding(true)
                let result = await SecureStore.getItemAsync(key);

                if (result !== null) {
                    dispatch(restoreToken(key))
                    var raw = "";

                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                    };

                    fetch(`https://api.admcloud.net/api/Items/${selectedItemID}?token=${result}`, requestOptions)
                        .then(response => response.json())
                        .then(responseData => {
                            console.log(responseData)
                            if (responseData.data) {
                                const { ID, SKU, Name, TaxScheduleID } = responseData.data;
                                const fields = {
                                    ID: ID,
                                    ItemSKU: SKU,
                                    ItemName: Name,
                                    Stock: '',
                                    Quantity: "1",
                                    UMO: [],
                                    TaxScheduleID: TaxScheduleID,
                                    Prices: responseData.data.Prices ? responseData.data.Prices : [],
                                    Price: responseData.data.Prices ? responseData.data.Prices[0].Price.toString() : "0",
                                    DiscountPercent: "0",
                                    Total: "0",
                                }
                                setSelectedItems(fields)
                                setLoadingData(true)
                                setIsAdding(false)

                            } else {
                                setIsAdding(false)
                            }
                        })
                        .catch(error => console.log('error', error));

                } else {
                    dispatch(restoreToken(null))
                    console.log('no data');
                }
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    async function ItemsServices(key) {
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

                fetch(`https://api.admcloud.net/api/ItemsServices/GetListWithLastUpdateDate?skip=0&OnlyActive=true&token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setListItems(result.data)

                    })
                    .catch(error => console.log('error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    if (showAddItems) {

        const Item = ({ data }) => (<View style={globalStyles.touchList}>

            <Text style={globalStyles.listContentText}>{data.item.ItemName}</Text>
            <View style={globalStyles.rowBetween}>
                <Text style={globalStyles.listTitleText}>{data.item.ItemSKU}</Text>
                <Text>Cantidad: {data.item.Quantity}</Text>
                <Text>Unidad</Text>
            </View>
            <View style={globalStyles.raw}>

            </View>
            <View style={globalStyles.rowBetween}>
                <Text>{data.item.Price}</Text>
                <Text>{data.item.DiscountPercent}%</Text>
                <Text>{data.item.Total}</Text>
            </View>
        </View>)

        return (
            <View style={globalStyles.screenContainer}>
                <SafeAreaView style={style.content}>
                    <Text style={globalStyles.title}>Agregar Artículos</Text>
                    <ScrollView>
                        {form.Items !== [] ? <FlatList
                            data={form.Items}
                            renderItem={(item) => <Item data={item} />}
                            keyExtractor={item => item.ID}
                            ListHeaderComponent={() => (
                                <View >
                                    <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Buscar articulos</Text>
                                    <ListArticles
                                        listItems={listItems}
                                        customerData={form.Relationship}
                                        value={form.Items}
                                        onChange={(value) => handlePreseletItemInputChange(value)}
                                        label={"Productos"}
                                    />


                                </View>
                            )}
                            onEndReachedThreshold={.5}
                            ListFooterComponent={() => (
                                <View>
                                    {loadingData ? <View>
                                        <View>
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Articulo</Text>
                                            <CustomInput value={selectedItems.ItemSKU} onChangeText={null} label={"articulo"} />
                                        </View>
                                        <View >
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Descripción</Text>
                                            <CustomInput value={selectedItems.ItemName} onChangeText={null} label={"Descripción"} />
                                        </View>
                                        <View >
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Cantidad</Text>
                                            <CustomInput value={selectedItems.Quantity} onChangeText={(value) => handleCurrentInputChange(value,"Quantity")} label={"Cantidad"} />
                                        </View>
                                        <View >
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Grupo de Impuesto</Text>
                                            <CustomDropDown value={selectedItems.TaxScheduleID}
                                    onChangeSelect={(value) => handleCurrentInputChange(value,'TaxScheduleID')}
                                    label={"Grupo de Impuesto"} data={[
                                        { "ID": "", "Name": "Grupo de Impuesto" },
                                        {"ID":"77faa221-6c43-4c1c-a0b3-08d613427f2f", "Name":"Impuestos A Las Telecomunicaciones Sujeto a la Proporcionalidad 30%"},
{"ID":"f87099b5-729f-4dff-a0b4-08d613427f2f", "Name":"ISC 16%"},
{"ID":"8a955390-43c0-4caa-a0b5-08d613427f2f", "Name":"ITBIS - Compras Locales 16%"},
{"ID":"22938cc7-601a-46bc-8de5-08d50bfdec1b", "Name":"ITBIS - Servicios Deducibles Sujeto a la Proporcionalidad 18%"},
{"ID":"915f6e47-b682-48f9-8de3-08d50bfdec1b", "Name":"ITBIS - Ventas 18%"},
{"ID":"b1012ae9-863f-4e96-d6b3-08d6a17e6145", "Name":"ITBIS / IVA Llevado al Costo y/o Gasto de Telecomunicaciones 30%"},
{"ID":"1763e1c4-8cc0-4f36-d6b2-08d6a17e6145", "Name":"ITBIS / IVA Llevado al Costo y/o Gasto Propina 28%"},
{"ID":"143b17ea-9b4d-4995-c9b4-08d6a0d0c100", "Name":"ITBIS / IVA Llevado al Gasto 18%"},
{"ID":"7495c64d-2bc8-4995-c9b3-08d6a0d0c100", "Name":"ITBIS en Compras Locales  18%"},
{"ID":"7c01e92e-2042-45d5-a0b7-08d613427f2f", "Name":"ITBIS en Compras Sujeto a la Proporcionalidad Propina Legal 28%"},
{"ID":"925f56e7-c132-445b-90a1-08d979784679", "Name":"ITBIS en Servicios Deducibles 18%"},
{"ID":"8b176d41-27a6-4088-a0b6-08d613427f2f", "Name":"ITBIS mas propina en venta 10 %"},
{"ID":"b6851111-1d4d-491a-a0b8-08d613427f2f", "Name":"Propina Legal 10%"},
                                    ]} />
                                        </View>
                                        <View >
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                                            <CustomInput value={selectedItems.Price} onChangeText={(value) => handleCurrentInputChange(value,"Price")} label={"Precio"} />
                                        </View>
                                        <View >
                                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>% Descuento </Text>
                                            <CustomInput value={selectedItems.DiscountPercent} onChangeText={(value) => handleCurrentInputChange(value,"DiscountPercent")} label={"Descuento"} />
                                        </View>

                                    </View>
                                        : ""}
                                </View>
                            )}
                        /> : ""}




                        {isAdding ? <ActivityIndicator size="large" /> : ""}
                        <View >
                            <CustomButtons
                                title={"Agregar"}
                                onPress={loadingData ? handleItemInputChange : null}
                            />
                        </View>
                        <View >
                            <CustomButtons
                                title={"Crear Orden"}
                                onPress={() => navigation.navigate('Sales')}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
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
                            onPress={form.Relationship ? handlerDShowAddItems : null}
                        />

                        {/* <View>
                        <TouchableOpacity style={onPress ? styles.button : styles.buttonNull} onPress={step > 0 ? handlePreview : null}>
                            <Text style={ styles.buttonText}>{title}</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* <CustomButtons
                            title={"Regresar"}
                            onPress={step > 0 ? handlePreview : null}
                        />
                        <CustomButtons
                            title={"Siguiente"}
                            onPress={step <= 3 ? handleNext : null}
                        /> */}
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