import React from 'react'
import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

import { Colors } from "../constants/Colors";

export default function CustomDropDown({
  label,
  value,
  onChangeSelect,
  data
}) {

  const getSelected = data.filter(data => data.value === value);

return (
  <View style={style.inputContainer}>
        <SelectDropdown
          data={data}
          defaultButtonText={ value ? getSelected.label : label}
          buttonStyle={style.dropdown2BtnStyle}
          value={value}
          dropdownStyle={style.dropdown2DropdownStyle}
          rowStyle={style.dropdown2RowStyle}
          rowTextStyle={style.dropdown2RowTxtStyle}
          onSelect={(selectedItem, index) => {
              onChangeSelect(selectedItem.value)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
              return  selectedItem.label;
          }}
          rowTextForSelection={(item, index) => {
              return item.label;
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