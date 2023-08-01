import * as React from 'react'
import { View, Text, TextInput,TouchableOpacity, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { searchStyle } from '../styles/global'

export default function SearchAny({searchIn, data, tokenID , searchSelected}) {

    //return 
    const [options, setOptions] = React.useState([]); // Estado para almacenar las opciones de búsqueda
    const [searchTerm, setSearchTerm] = React.useState(''); // Estado para almacenar el término de búsqueda
    const [label, setLabel] = React.useState("Orden");
    const [itemSelected, setItemSelected] = React.useState(false)

    React.useEffect(() => {
        setSearchTerm(data)
    },[])

    React.useEffect(() => {
      
        searchSelected(searchTerm)
    },[itemSelected])

  return (
    <View style={searchStyle.inputContainer}>
          <SelectDropdown
            data={searchTerm}
            defaultButtonText={label}
            buttonStyle={searchStyle.dropdown2BtnStyle}
            search
            renderCustomizedRowChild={(item,index) => {
             //   console.log("renderCustomizedRowChild",item)
              return (
                <View style={searchStyle.dropdown3RowChildStyle}>
                  <Text style={searchStyle.dropdown3RowTxt}>{item.DocID}</Text>
                  <Text style={searchStyle.dropdown2RowTxt}> {item.RelationshipName}</Text>
                </View>
              );
            }}
            searchPlaceHolder={`Buscar ${label}`}
            searchPlaceHolderColor={'#F8F8F8'}
            searchInputTxtColor={'#fffa'}
            searchInputStyle={searchStyle.dropdown3searchInputStyleStyle}
            dropdownStyle={searchStyle.dropdown2DropdownStyle}
            rowStyle={searchStyle.dropdown2RowStyle}
            rowTextStyle={searchStyle.dropdown2RowTxtStyle}
            
            onSelect={(selectedItem, index) => {
             
            //   dispatch(updateFormField({ "fieldName": "RelationshipID", "value": selectedItem.ID }));
            //   dispatch(updateFormField({ "fieldName": "LocationID", "value": selectedItem.LocationID  }));
                setItemSelected(true)
                setLabel(selectedItem.RelationshipName);
                setSearchTerm(selectedItem)
                
            }}
            onChangeSearchInputText={(item, index) => {

              var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch(`https://api.admcloud.net/api/${searchIn}/?search=${item}&skip=0&token=${tokenID}`, requestOptions)
                .then(response => response.json())
                .then(result => setSearchTerm(result.data))
                .catch(error => console.log('error', error));
            
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={searchStyle.dropdown3BtnChildStyle}>
                  <Text style={searchStyle.dropdown3BtnTxt}>{selectedItem ? `${selectedItem.DocID} / ${selectedItem.RelationshipName}` : `Buscar ${label}`}</Text>
                </View>
              );
            }}
            
          />

    </View>
 
  )
}

