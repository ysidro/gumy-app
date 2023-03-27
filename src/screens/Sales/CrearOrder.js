import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { globalStyles } from "../../styles/global";
import CustomInput from "../../components/CustomInputs";
//import CustomFormartDate from '../../components/CustomFormartDate';
import Currencies from "../../components/Currencies"
import ListCustomers from '../../components/ListCustomers';
import ListArticles from '../../components/ListItems';
import CustomDropDown from '../../components/CustomDropDown';

import { updateFormField,addItem } from '../../redux/FormSlice'

import InputDate from "../../components/CustomInputDate";
import CustomButtons from "../../components/CustomButtons";
import { restoreToken } from "../../features/auth/auth";
import { Colors } from "../../constants/Colors";
import Spash from "../Spash";



export default function CrearOrder({ navigation }) {


    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);
    const [isAdding, setIsAdding] =  useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [selectedItemID, setSelectedItemID] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    

    const handlerDShowAddItems = () => {
        setShowAddItems(true);
    }
    const handlerHiddenAddItems = () => {
        setShowAddItems(false);
    }

    const handleInputChange = (fieldName, value) => {

        dispatch(updateFormField({ "fieldName": fieldName, "value": value }));
        if (fieldName === "Relationship") {
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


    useEffect(() => {
        
        getCurrency('uToken')
       
        getCustomers('uToken')
        
    }, [])

    useEffect(() => {
        setSelectedItems([])
        ItemsServices('uToken')
       
    }, [showAddItems])

    useEffect(() => {
       
        setLoadingData(false)
        getItem('uToken')

    }, [selectedItemID])

    async function getCurrency(key) {
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

                fetch(`https://api.admcloud.net/api/Currencies/?token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setCurrencies(result.data)
                    })
                    .catch(error => console.log(' getCurrency error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    async function getCustomers(key) {
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

                fetch(`https://api.admcloud.net/api/Customers?skip=0&token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {

                        setListCustomer(result.data)

                    })
                    .catch(error => console.log('getCustomers error', error));
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

            if(selectedItemID){
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
                        if(responseData.data){
                        const {ID,SKU,Name,TaxScheduleID} = responseData.data;
                        const fields = {
                            ID:ID,
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
                        
                        }else{
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
    //const Item = ({data}) => console.log(data.item.ItemName)
        const Item = ({data}) => (<View style={globalStyles.touchList}>

            <Text style={globalStyles.listContentText}>{ data.item.ItemName}</Text>
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
                            //onEndReached={pushCustomer}
                            onEndReachedThreshold={.5}
                            //refreshing={isLoading}
                            //ListFooterComponent={renderFooter}
                        /> : ""}

                        
<View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Buscar articulos</Text>
                            <ListArticles
                                    listItems={listItems}
                                    customerData = {form.Relationship}
                                    value={form.Items}
                                    onChange={(value) => handlePreseletItemInputChange(value)}
                                    label={"Productos"}
                                />

                           
                        </View>
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
                            <CustomInput value={selectedItems.Quantity ? selectedItems.Quantity : "1"} onChangeText={null} label={"Cantidad"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Grupo de Impuesto</Text>
                            <CustomInput value="" onChangeText={null} label={"Grupo de Impuesto"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                            <CustomInput value={selectedItems.Price} onChangeText={null} label={"Precio"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>% Descuento </Text>
                            <CustomInput value={selectedItems.DiscountPercent} onChangeText={null} label={"Descuento"} />
                        </View>
                        
                        </View>
                          : "" }
                          {isAdding ? <ActivityIndicator size="large"/> : ""}
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
                                    listCustomer={listCustomer}
                                    value={form.Relationship}
                                    onChange={(value) => handleInputChange('Relationship', value)}
                                    label={"Cliente"}
                                />

                            </View>
                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Referencia</Text>
                                <CustomInput
                                    label={"Referencia"}
                                    value={form.Referencia}
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
                                <CustomInput
                                    label={"Ubicación"}
                                    value={form.LocationID}
                                    onChangeText={(value) => handleInputChange('LocationID', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Vendedor</Text>
                                <CustomInput
                                    label={"Vendedor"}
                                    value={form.EmployeeID}
                                    onChangeText={(value) => handleInputChange('EmployeeID', value)}

                                />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Terminos</Text>

                                <CustomDropDown value={form.PaymentTermID}
                                    onChangeSelect={(value) => handleInputChange('PaymentTermID', value)}
                                    label={"Terminos"} data={[
                                        { "value": "", "label": "Terminos" },
                                        { "value": "fd42c2ff-5df1-4d31-6f80-08d590021182", "label": "15 Días" },
                                        { "value": "7456a472-f38a-4aeb-6f81-08d590021182", "label": "30 Días" },
                                        { "value": "d744ec9c-10f2-4db7-8d80-08d97dcd420d", "label": "45 Días" },
                                        { "value": "eeff9536-b62f-4288-f20c-08da13df3d24", "label": "60 Días" },
                                        { "value": "b1010983-43f0-4e5d-1cb1-08d7ccdbf164", "label": "Contado" }
                                    ]} />
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
                                    onChangeText={(value) => handleInputChange('CurrencyID', value)}
                                    currencies={currencies}
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
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Estapa de Venta</Text>

                                <CustomDropDown value={form.SourceTransactionID}
                                    onChangeSelect={(value) => handleInputChange('SourceTransactionID', value)}
                                    label={"Estapa de Venta"} data={[
                                        { "value": "", "label": "Terminos" },
                                        { "value": "8b6ab1d5-1052-4071-b868-9f10f0f30c53", "label": "Cerrada Aceptada" },
                                        { "value": "26b48994-8ca8-4a8e-90e0-236a5efee766", "label": "Cerrada No Respuesta" },
                                        { "value": "7c9ff81d-f21b-4f2a-aaec-917ed01d6cc0", "label": "Cerrada Otro" },
                                        { "value": "1c3e93a0-83c9-47a8-b89f-fb848c507426", "label": "Cerrada Perdida" },
                                        { "value": "ea5d4d8f-698d-42fa-9c0b-947bef24fdca", "label": "Cliente Contactado" },
                                        { "value": "13f15c46-2090-4400-9fce-8ad9ca5e2342", "label": "Cliente no Contactado" },
                                        { "value": "261d0f83-eeda-47cd-8e36-d7f510e2e508", "label": "Propuesta Presentada" }
                                    ]} />
                            </View>

                            <View >
                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Transacción</Text>
                                <CustomInput
                                    label={"Transacción"}
                                    value={form.SourceTransactionID}
                                    onChangeText={(value) => handleInputChange('SourceTransactionID', value)}

                                />
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