import React from 'react'
import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

import { useFetch } from '../hooks/useFetch';
import { Colors } from "../constants/Colors";

export default function PaymentTerms({
    onChangeText,
    handlerPaymentTerms,
    value,
    
  }) {


    let raw = "";
    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };
    let filteredPaymentTerms = [];
    const URL_DETAILED = `PaymentTerms`
    const URL_PARAMETER = `skip=0`
    const {isLoading, error, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)
    
    if(!isLoading) {
    
      filteredPaymentTerms = responseJSON?.data.filter(filteredPaymentTerm => filteredPaymentTerm.ID === value);
    }

  return (
    <View style={style.inputContainer}>
          <SelectDropdown
            data={!isLoading ? responseJSON.data : []}
            defaultButtonText={ value ? filteredPaymentTerms[0]?.Name : 'Terminos'}
            buttonStyle={style.dropdown2BtnStyle}
            value={value}
            dropdownStyle={style.dropdown2DropdownStyle}
            rowStyle={style.dropdown2RowStyle}
            rowTextStyle={style.dropdown2RowTxtStyle}
            onSelect={(selectedItem, index) => {
              onChangeText(selectedItem.ExchangeRate)
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
        backgroundColor: Colors.ligth,
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