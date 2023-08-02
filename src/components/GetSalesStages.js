import React from 'react'
import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector, useDispatch } from "react-redux"

import { updateFormField } from '../redux/FormSlice'
import { useFetch } from '../hooks/useFetch';
import { Colors } from "../constants/Colors";

export default function GetSalesStages() {

    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

    let raw = "";
    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };
    let filteredPaymentTerms = [];
    const URL_DETAILED = `SalesStages`
    const URL_PARAMETER = `skip=0`
    const {isLoading, error, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)
    
    if(!isLoading) {
    
      filteredPaymentTerms = responseJSON?.data.filter(filteredPaymentTerm => filteredPaymentTerm.ID === form.SourceTransactionID);

     // console.log(filteredPaymentTerms,form)
    }

  return (
    <View style={style.inputContainer}>
          <SelectDropdown
            data={!isLoading ? responseJSON.data : []}
            defaultButtonText={ form.SourceTransactionID ? filteredPaymentTerms[0]?.Name : 'Estapa de Venta'}
            buttonStyle={style.dropdown2BtnStyle}
            value={form.SourceTransactionID}
            dropdownStyle={style.dropdown2DropdownStyle}
            rowStyle={style.dropdown2RowStyle}
            rowTextStyle={style.dropdown2RowTxtStyle}
            onSelect={(selectedItem, index) => {
              dispatch(updateFormField({ "fieldName": "SourceTransactionID", "value": selectedItem.ID }));
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return  selectedItem.Name;
            }}
            rowTextForSelection={(item, index) => {
                return item.Name;
            }}
          />

    </View>
  )
}


const style = StyleSheet.create({

    dropdown2BtnStyle: {
        width: '95%',
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
      },

})