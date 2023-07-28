import { View, Dimensions, SafeAreaView, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'


import { clearFormsFields, removeItem, updateItemField, addItem , updateFormField} from '../../redux/FormSlice'
import { restoreToken } from "../../features/auth/auth"

import { globalStyles } from "../../styles/global"
import { Colors } from "../../constants/Colors"

import DropDownListItems from '../../components/DropDownListItems'

import CustomInput from "../../components/CustomInputs"
import CustomDropDown from '../../components/CustomDropDown'
import CustomButtons from "../../components/CustomButtons"
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SelectProduct({ route, navigation }) {

    const { customerData } = route.params;

    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

    const [tokenID, setTokenID] = useState(null)
    const [isAdding, setIsAdding] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [createOrderActive, setCreateOrderActive] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState(false);


    useEffect(() => {
        setLoadingData(true)
        setSelectedItems([]);
        setListItems([]);
        ItemsServices('uToken')

        getItem('uToken')



    }, [])

    useEffect(() => {

        setLoadingData(false)
        getItem('uToken')

    }, [selectedItemID])

    useEffect(() => {
        setListItems([])
        setSelectedItems([])
        ItemsServices('uToken')

    }, [showAddItems])

    const handlePreseletItemInputChange = (value) => {

        setSelectedItemID(value.ID)
        setSelectedItems([])

    };
    const handleItemInputChange = () => {

        
        const itemIndex = form.Items.findIndex((item) => item.ItemID === selectedItems.ItemID);
        console.log(selectedItems)
        if (itemIndex !== -1) {
            console.log('El item ya existe en el arreglo');
           
            dispatch(updateItemField({"index":itemIndex,"field":selectedItems}));
           // return;
        }else {
            dispatch(addItem(selectedItems));
        }

            setCreateOrderActive(true)
            setSelectedItems([])
            setSelectedItemID(false)
            setLoadingData(false)
            

    };

    const handleUpdateCurrentItem = (value) => {
        console.log(form.Items[value])
        setSelectedItems(form.Items[value]);
        setLoadingData(true);

    }

    const handleRemoveCurrentItem = (value) => {
        setCreateOrderActive(false);
        dispatch(removeItem(value));
        form.Items.length >= 2 ? setCreateOrderActive(true) : setCreateOrderActive(false)
    }

    const handleCurrentInputChange = (value, field) => {

        setSelectedItems(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handlerDShowAddItems = () => {
        setShowAddItems(true);
    }

    const handlerAddOrder = () => {
        setNewOrder()
        console.log("form", form);
        // navigation.navigate('Order')
    }

    async function setNewOrder() {
        try {
                var requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(form),
                    redirect: 'follow'
                };


                fetch(`https://api.admcloud.net/api/SalesOrders/?token=${tokenID}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result,form)
                        if(result.success){
                        
                        setSelectedItems([]);
                        setListItems([]);
                        dispatch(clearFormsFields());
                        
                        dispatch(updateFormField({ "fieldName": "Items", "value": [] }));
                        Alert.alert("Notificación", "La orden se a creado exitosamente",)
                     }else{
                        Alert.alert("Alerta", result.Message ? result.Message : result.message)
                     }
                    })
                    .catch(error => console.log('Employee error', error));
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }


    async function ItemsServices(key) {
        try {
            let result = await SecureStore.getItemAsync(key);
            if (result !== null) {
                setTokenID(result);
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
                        setLoadingData(false)
                    })
                    .catch(error => console.log('error', error));
            } else {
                dispatch(restoreToken(null))
                setLoadingData(false)
                console.log('GetListWithLastUpdateDate no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
            Alert.alert("Notificación", `Error ${err}`,)
            setLoadingData(false)
        }

    }

    async function getItem(key) {
        try {

            if (selectedItemID) {

                setIsAdding(true)
                let result = await SecureStore.getItemAsync(key);

                if (result !== null) {
                    setTokenID(result);
                    dispatch(restoreToken(key))
                    var raw = "";

                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                    };

                    console.log(tokenID);

                    fetch(`https://api.admcloud.net/api/Items/${selectedItemID}?token=${result}`, requestOptions)
                        .then(response => response.json())
                        .then(responseData => {

                            if (responseData.data) {

                                const { ID, Prices, Name, ReportUOMID, TaxScheduleID } = responseData.data;
                                let ItemPrice = Prices ? Prices[0]?.Price: "0"
                                const fields = {
                                    ItemID: ID,
                                    Name: Name,
                                    Comments: "",
                                    Quantity: "1",
                                    UOMID: ReportUOMID,
                                    Price: `${ItemPrice} `,
                                    DiscountPercent: "0",
                                    TaxScheduleID: TaxScheduleID,
                                    AttributeOption1ID: "",
                                    AttributeOption2ID: "",

                                }

                                setSelectedItems(fields)
                                setLoadingData(true)
                                setIsAdding(false)

                            } else {
                                Alert.alert("Notificación", "No hemos podido localizar la información de este producto",)
                                setIsAdding(false)
                            }
                        })
                        .catch(error => console.log('error', error));

                } else {
                    dispatch(restoreToken(null))
                    console.log('Items no data');
                }
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    const Item = ({ data }) => {
        if (loadingData) {
            return null;
        }
        return (<View key={ data.index + data.item.ItemID } style={globalStyles.touchList}>

            <Text style={globalStyles.listContentText}>{data.item.Name}</Text>
            <View style={[globalStyles.rowBetween, { marginTop: 8 }]} >

                <View >
                    <Text>${(data.item.Price).toLocaleString('en-US')} {data.item.CurrencyID}</Text>
                    <Text>Cantidad: {(data.item.Quantity).toLocaleString('en-US')}</Text>
                </View>

                <View>
                    <Text>Descuento: {data.item.DiscountPercent}%</Text>
                    <Text>Total: ${ (data.item.Price * data.item.Quantity).toLocaleString('en-US') } {data.item.CurrencyID}</Text>
                </View>
            </View>
            <View style={[globalStyles.rowBetween, { marginTop: 8 }]} >
            <TouchableOpacity
                        style={{ color: "#ffffff", backgroundColor: "red", borderRadius: 8, padding: 5, marginBottom: 10 }}
                        onPress={() => handleRemoveCurrentItem(data.index)} >
                        <Text style={{ color: "#ffffff" }}>
                            Quitar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ color: "#ffffff", backgroundColor: "green", borderRadius: 8, padding: 5 }}
                        onPress={() => handleUpdateCurrentItem(data.index)} >
                        <Text style={{ color: "#ffffff" }}>
                            Editar
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>)
    }

    const h = Dimensions.get('window').height > 600 ? 240 : 160;

    return (
        <View>
            <SafeAreaView style={style.content}>


                <View style={{ height: Dimensions.get('window').height - h }}>
                    {form.Items !== [] ? <FlatList
                        data={form.Items}
                        renderItem={(item) => <Item key={item.ID} data={item} />}
                        keyExtractor={item => item.ID}
                        contentContainerStyle={{ flexGrow: 1, }}
                        onEndReachedThreshold={.5}
                        ListHeaderComponent={() => {
                            return <View>
                                <Text style={globalStyles.secundaryTitle}>{customerData.Name}</Text>
                                <DropDownListItems
                                    listItems={listItems}
                                    setListItems={setListItems}
                                    tokenID={tokenID}
                                    customerData={customerData}
                                    value={form.Items}
                                    onChange={(value) => handlePreseletItemInputChange(value)}
                                    label={"Productos"}
                                />
                            </View>
                        }}
                        //ListFooterComponent
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    {isAdding ? <ActivityIndicator size="large" /> : ""}
                                    {loadingData ?
                                        <View style={{ height: Dimensions.get('window').height + 100 }}>

                                            <View>
                                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Descripción</Text>
                                                <CustomInput value={selectedItems.Name} onChangeText={null} label={"Descripción"} />
                                            </View>
                                            <View>
                                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Cantidad</Text>

                                                <CustomInput
                                                    value={selectedItems.Quantity}
                                                    onChangeText={value => handleCurrentInputChange(value,'Quantity')}
                                                    label={"Cantidad"} />

                                            </View>
                                            <View>
                                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Grupo de Impuesto</Text>
                                                <CustomDropDown value={selectedItems.TaxScheduleID}
                                                    onChangeSelect={(value) => handleCurrentInputChange(value, 'TaxScheduleID')}
                                                    label={"Grupo de Impuesto"} data={[
                                                        { "ID": "", "Name": "Grupo de Impuesto" },
                                                        { "ID": "77faa221-6c43-4c1c-a0b3-08d613427f2f", "Name": "Impuestos A Las Telecomunicaciones Sujeto a la Proporcionalidad 30%" },
                                                        { "ID": "f87099b5-729f-4dff-a0b4-08d613427f2f", "Name": "ISC 16%" },
                                                        { "ID": "8a955390-43c0-4caa-a0b5-08d613427f2f", "Name": "ITBIS - Compras Locales 16%" },
                                                        { "ID": "22938cc7-601a-46bc-8de5-08d50bfdec1b", "Name": "ITBIS - Servicios Deducibles Sujeto a la Proporcionalidad 18%" },
                                                        { "ID": "915f6e47-b682-48f9-8de3-08d50bfdec1b", "Name": "ITBIS - Ventas 18%" },
                                                        { "ID": "b1012ae9-863f-4e96-d6b3-08d6a17e6145", "Name": "ITBIS / IVA Llevado al Costo y/o Gasto de Telecomunicaciones 30%" },
                                                        { "ID": "1763e1c4-8cc0-4f36-d6b2-08d6a17e6145", "Name": "ITBIS / IVA Llevado al Costo y/o Gasto Propina 28%" },
                                                        { "ID": "143b17ea-9b4d-4995-c9b4-08d6a0d0c100", "Name": "ITBIS / IVA Llevado al Gasto 18%" },
                                                        { "ID": "7495c64d-2bc8-4995-c9b3-08d6a0d0c100", "Name": "ITBIS en Compras Locales  18%" },
                                                        { "ID": "7c01e92e-2042-45d5-a0b7-08d613427f2f", "Name": "ITBIS en Compras Sujeto a la Proporcionalidad Propina Legal 28%" },
                                                        { "ID": "925f56e7-c132-445b-90a1-08d979784679", "Name": "ITBIS en Servicios Deducibles 18%" },
                                                        { "ID": "8b176d41-27a6-4088-a0b6-08d613427f2f", "Name": "ITBIS mas propina en venta 10 %" },
                                                        { "ID": "b6851111-1d4d-491a-a0b8-08d613427f2f", "Name": "Propina Legal 10%" },
                                                    ]} />
                                            </View>
                                            <View>
                                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                                                <CustomInput value={selectedItems.Price} onChangeText={(value) => handleCurrentInputChange(value, "Price")} label={"Precio"} />
                                            </View>
                                            <View>
                                                <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>% Descuento </Text>
                                                <CustomInput value={selectedItems.DiscountPercent} onChangeText={(value) => handleCurrentInputChange(value, "DiscountPercent")} label={"Descuento"} />
                                            </View>
                                            <CustomButtons
                                                title={"Agregar"}
                                                onPress={loadingData ? handleItemInputChange : null} />
                                        </View>
                                        : <View style={globalStyles.rowBetween}>
                                            <CustomButtons
                                                title={`Crear Orden`}

                                                onPress={createOrderActive ? () => handlerAddOrder() : null} />
                                        </View>}
                                </View>
                            )
                        }}
                    /> : ""}</View>



                {/* </ScrollView> */}


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