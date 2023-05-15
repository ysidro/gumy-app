import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

import { Colors } from "../constants/Colors";
import { useFetch } from '../hooks/useFetch';

import DropDownListItems from './DropDownListItems'
import CustomInput from "./CustomInputs"
import CustomDropDown from './CustomDropDown'

export default function ListItemsSelected() {


    const [listItems, setListItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemID, setSelectedItemID] = useState(false);

    const URL_DETAILED = `ItemsServices/GetListWithLastUpdateDate`
    const URL_PARAMETER = `skip=0&OnlyActive=true`
    const requestOptions = {
        method: 'GET',
        body: '',
        redirect: 'follow'
    };

    const { isLoading, error, responseJSON } = useFetch(URL_DETAILED, URL_PARAMETER, requestOptions)

    useEffect(() => {

        if (!isLoading) {
            setListItems(responseJSON.data)
        }

    }, [isLoading])

    useEffect(() => {

        setLoadingData(false)
        getItem('uToken')

    }, [selectedItemID])


    const handlePreseletItemInputChange = (value) => {

        setSelectedItemID(value.ID)
        setSelectedItems([])

    };



    const Item = ({ data }) => {

        if (loadingData) {
            return null;
        }
        return (<View style={globalStyles.touchList}>

            <Text style={globalStyles.listContentText}>{data.item.ItemName}</Text>
            <Text style={globalStyles.listTitleText}>{data.item.ItemSKU}</Text>

            <View style={[globalStyles.rowBetween, { marginTop: 12 }]} >
                <View >
                    <Text>${data.item.Price} {data.item.CurrencyID}</Text>
                    <Text>Cantidad: {data.item.Quantity}</Text>
                </View>
                <View>
                    <Text>Descuento: {data.item.DiscountPercent}%</Text>
                    <Text>Total: ${data.item.Total} {data.item.CurrencyID}</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={{ color: "#ffffff", backgroundColor: "red", borderRadius: 8, padding: 5 }}
                        onPress={() => handleRemoveCurrentItem(data.index)} >
                        <Text style={{ color: "#ffffff" }}>
                            Quitar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>)
    }

    return (
        <View>
            <FlatList
                data={form.Items}
                renderItem={(item) => <Item data={item} />}
                keyExtractor={item => item.ID}

                //ListHeaderComponent
                ListHeaderComponent={() => (
                    <View >
                        <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Buscar articulos</Text>
                        <DropDownListItems
                            listItems={listItems}
                            setListItems={setListItems}
                            tokenID={tokenID}
                            customerData={form.Relationship}
                            value={form.Items}
                            onChange={(value) => handlePreseletItemInputChange(value)}
                            label={"Productos"}
                        />
                    </View>
                )}
                onEndReachedThreshold={.5}
                //ListFooterComponent
                ListFooterComponent={() => (
                    <View>
                        {loadingData ?
                            <View  >
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
                                    <CustomInput value={selectedItems.Quantity} onChangeText={(value) => handleCurrentInputChange(value, "Quantity")} label={"Cantidad"} />
                                </View>
                                <View >
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
                                <View >
                                    <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                                    <CustomInput value={selectedItems.Price} onChangeText={(value) => handleCurrentInputChange(value, "Price")} label={"Precio"} />
                                </View>
                                <View >
                                    <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>% Descuento </Text>
                                    <CustomInput value={selectedItems.DiscountPercent} onChangeText={(value) => handleCurrentInputChange(value, "DiscountPercent")} label={"Descuento"} />
                                </View>
                                <CustomButtons
                                    title={"Agregar"}
                                    onPress={loadingData ? handleItemInputChange : null}
                                />
                            </View>
                            : ""}
                    </View>
                )}
            />
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