import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { globalStyles } from "../../styles/global";
import CustomInput from "../../components/CustomInputs";
//import CustomFormartDate from '../../components/CustomFormartDate';
import Currencies from "../../components/Currencies"
import ListCustomers from '../../components/ListCustomers';
import CustomDropDown from '../../components/CustomDropDown';

import InputDate from "../../components/CustomInputDate";
import CustomButtons from "../../components/CustomButtons";
import { restoreToken } from "../../features/auth/auth";
import { Colors } from "../../constants/Colors";
import Spash from "../Spash";



export default function CrearOrder({ navigation }) {


    const dispatch = useDispatch()
    const [loadingData, setLoadingData] = useState(null);

    const [date, setDate] = useState(new Date());
    const [showAddItems, setShowAddItems] = useState(false);

    const [currencies, setCurrencies] = useState([]);
    const [listProveedor, setListProveedor] = useState([]);
    const [listItems, setListItems] = useState([]);

    const [proveedorSelected, setProveedorSelected] = useState(null);

    const [proveedor, setProveedor] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [lineaDeNegocio, setLineaDeNegocio] = useState("");
    const [fechaEstimada, setFechaEstimada] = useState(new Date());
    const [ubicacion, setUbicacion] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [consignatario, setConsignatario] = useState("");
    const [contactoConsignatario, setContactConsignatario] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [notasInternas, setNotasInternas] = useState("");
    const [referencia, setReferencia] = useState("");
    const [metodoEnvio, setMetodoEnvio] = useState("");
    const [terminos, setTerminos] = useState("");
    const [currency, setCurrency] = useState("");
    const [nameCurrency, setNameCurrency] = useState("");
    const [proyecto, setProyecto] = useState("");
    const [documentoOrigen, setDocumentoOrigen] = useState("");
    const [direccionEnvio, setDireccionEnvio] = useState("");
    const [vendedor, setVendedor] = useState("");


    const [articulo, setArticulo] = useState("");

    const handlerDShowAddItems = () => {
        setShowAddItems(true);
    }
    const handlerHiddenAddItems = () => {
        setShowAddItems(false);
    }
   
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFechaEstimada(selectedDate)
          //setFormData({ ...formData, birthDate: selectedDate });
        }
      };

 

      useEffect(() => {
          getCurrency('uToken')
          getCustomers('uToken')
      }, [])
      
      useEffect(() => {
          ItemsServices('uToken')
      }, [showAddItems])
  
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
                  setLoadingData(true)
    
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
                    console.log()
                    setListProveedor(result.data)
                    setLoadingData(true)
      
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
        
                fetch(`https://api.admcloud.net/api/ItemsServices/GetListWithLastUpdateDate?skip=0&token=${result}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    setListItems(result.data)
                    setLoadingData(true)
      
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
        return (
            <View style={globalStyles.screenContainer}>
                <SafeAreaView style={style.content}>
                    <Text style={globalStyles.title}>Agregar Artículos</Text>
                    <ScrollView>
                        <View style={globalStyles.touchList}>

                            <Text style={globalStyles.listContentText}>Cemento tip top azul 650g 710ml</Text>
                            <View style={globalStyles.rowBetween}>
                                <Text style={globalStyles.listTitleText}>G2R5159389</Text>
                                <Text>Cantidad: 10</Text>
                                <Text>Unidad</Text>
                            </View>
                            <View style={globalStyles.raw}>

                            </View>
                            <View style={globalStyles.rowBetween}>
                                <Text>1,261.8400</Text>
                                <Text>20%</Text>
                                <Text>12,618.40</Text>
                            </View>
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Articulo</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Descripción</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Cantidad</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Grupo de Impuesto</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>% Descuento </Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Cuenta</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Precio</Text>
                            <CustomInput value={articulo} onChangeText={setArticulo} label={"articulo"} />
                        </View>
                        <View >
                            <CustomButtons
                                title={"Agregar"}
                                onPress={null}
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
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Proveedor</Text>
                            <ListCustomers 
                                listProveedor={listProveedor} 
                                currencies={currencies} 
                                setVendedor={setVendedor}
                                currency={currency} 
                                setCurrency={setCurrency} 
                                setNameCurrency={setNameCurrency}
                                setProveedorSelected={setProveedorSelected}
                                onChangeText={setProveedor} label={"Proveedor"} 
                            />

                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Departamento</Text>
                            <CustomInput value={departamento} onChangeText={setDepartamento} label={"Departamento"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Línea de Negocio</Text>
                            <CustomInput 
                            value={lineaDeNegocio} 
                            onChangeText={setLineaDeNegocio} 
                            label={"Línea de Negocio"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Fecha Estimada  </Text>
                    
                                <InputDate
                                value={fechaEstimada} 
                                onChangeText={setFechaEstimada} 
                                label={"Fecha Estimada "} />

                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Ubicación</Text>
                            <CustomInput value={ubicacion} onChangeText={setUbicacion} label={"Ubicación"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Observaciones</Text>
                            <CustomInput value={observaciones} onChangeText={setObservaciones} label={"Observaciones"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Consignatario</Text>
                            <CustomInput value={consignatario} onChangeText={setConsignatario} label={"Consignatario"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Contacto del Consignatario</Text>
                            <CustomInput value={contactoConsignatario} onChangeText={setContactConsignatario} label={"Contacto del Consignatario"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Prioridad</Text>
                            
                            <CustomDropDown value={prioridad} 
                            onChangeSelect={setPrioridad} 
                            label={"Prioridad"} data={[
                                {"value": "PRIORITY_UNDEFINED","label": ""},
                                {"value": "PRIORITY_URGENT","label": "Urgente"},
                                {"value": "PRIORITY_HIGH","label": "Alta"},
                                {"value": "PRIORITY_MEDIUM","label": "Media"},
                                {"value": "PRIORITY_LOW","label": "Baja"}
                            ]} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Notas Internas</Text>
                            <CustomInput value={notasInternas} onChangeText={setNotasInternas} label={"Notas Internas"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Referencia</Text>
                            <CustomInput value={referencia} onChangeText={setReferencia} label={"Referencia"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Método de Envío</Text>
                            <CustomInput value={metodoEnvio} onChangeText={setMetodoEnvio} label={"Método de Envío"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Términos</Text>
                            <CustomInput value={terminos} onChangeText={setTerminos} label={"Términos"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Moneda</Text>
                            <Currencies  onChangeText={setCurrency} currencies={currencies} label={"Moneda"} nameCurrency={nameCurrency} />
                            
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Proyecto</Text>
                            <CustomInput value={proyecto} onChangeText={setProyecto} label={"Proyecto"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Documento Origen</Text>
                            <CustomInput value={documentoOrigen} onChangeText={setDocumentoOrigen} label={"Documento Origen"} />
                        </View>
                        <View >
                            <Text style={{ "marginHorizontal": 15, fontWeight: "bold" }}>Dirección de Envío</Text>
                            <CustomInput value={direccionEnvio} onChangeText={setDireccionEnvio} label={"Dirección de Envío"} />
                        </View>
                            <CustomButtons
                                title={"Agregar Artículos"}
                                onPress={proveedorSelected ? handlerDShowAddItems : null }
                            />
                    </ScrollView>
                </View>

            </SafeAreaView>
        </View>
    )
}


const style = StyleSheet.create({
    content: {
        justifyContent: 'center',
        marginTop: 15,
        width: "100%",
    },
    inputContainer: {
        width: '90%',
        height: 45,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: Colors.ligth,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
      },

})