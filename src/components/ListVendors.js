import { View, StyleSheet,Text,Platform } from 'react-native'
import React, {useEffect,useState}  from 'react'
import SelectDropdown from 'react-native-select-dropdown'


import { Colors } from "../constants/Colors";



export default function ListVendors({
    onChangeText,
    listProveedor,
    setVendedor,
    currencies,
    currency,
    setNameCurrency,
    setCurrency,
    setProveedorSelected,
  }){

    const [proveedorSelect, setProveedorSelect] = useState([])
    useEffect(() => {
      const getCurrency = currencies.filter(coint => coint.ID === proveedorSelect.CurrencyID);
      setCurrency(getCurrency[0]?.ExchangeRate)
      setNameCurrency(getCurrency[0]?.Name)

    },[proveedorSelect])
    
  return (
    <View style={style.inputContainer}>
          <SelectDropdown
            data={listProveedor}
            defaultButtonText={'Proveedores'}
            buttonStyle={style.dropdown2BtnStyle}
            search
            renderCustomizedRowChild={(item,index) => {
              return (
                <View style={style.dropdown3RowChildStyle}>
                  
                  <Text style={style.dropdown3RowTxt}>{item.Name}</Text>
                  <Text style={style.dropdown3RowTxt}>{item.FiscalID}</Text>
                </View>
              );
            }}
            searchPlaceHolder={'Buscar Proveedor'}
            searchPlaceHolderColor={'#F8F8F8'}
            searchInputStyle={style.dropdown3searchInputStyleStyle}
            dropdownStyle={style.dropdown2DropdownStyle}
            rowStyle={style.dropdown2RowStyle}
            rowTextStyle={style.dropdown2RowTxtStyle}
            onSelect={(selectedItem, index) => {

        
                setProveedorSelect(selectedItem)
                onChangeText(selectedItem.Name)
                setProveedorSelected(true)
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={style.dropdown3BtnChildStyle}>
                  <Text style={style.dropdown3BtnTxt}>{selectedItem ? selectedItem.Name : 'Buscar Proveedor'}</Text>
                </View>
              );
            }}
            
          />

    </View>
  )
}

const style = StyleSheet.create({

    dropdown2BtnStyle: {
        width: '90%',
        height: 45,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: Colors.light,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        
        zIndex: 100,
      },
      viewContainer: { marginHorizontal: 16, zIndex: 1 },
      androidContainer: {
        minHeight: 500,
        marginBottom: -428,
      },

     BtnTxtStyle: {
       
        textAlign: 'center',
        fontWeight: 'bold',
      },
      dropdown2DropdownStyle: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
      dropdown2RowStyle: {
        backgroundColor: '#fff', 
        borderBottomColor: '#C5C5C5'},
      dropdown2RowTxtStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#fff",
      },
      dropdown3searchInputStyleStyle: {
        backgroundColor: Colors.primary,
        borderBottomWidth: 1,
        color: "#fff",
        borderBottomColor: '#FFF',
      },
      dropdown3RowChildStyle: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal: 8,
      },
      dropdown3RowTxt: {
        color: Colors.primary,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 12,
        width: "100%",
      },
      dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
      },
      dropdown3BtnTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 12,
      },

})