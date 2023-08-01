import { View, StyleSheet,Text } from 'react-native'
import React, {useEffect,useState}  from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector, useDispatch } from "react-redux"
import { updateFormField } from '../redux/FormSlice'
import { Colors } from "../constants/Colors";
import { useFetch } from '../hooks/useFetch';
import { searchStyle } from '../styles/global'
export default function ListCustomers({
    onChange,
    label,
    tokenID
  }){

    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

      const [customer,setCustomers] = useState([])

      const URL_DETAILED = `Customers`
      const URL_PARAMETER = `skip=0`
      const requestOptions = {
      method: 'GET',
        body: '',
        redirect: 'follow'
      };

      const {isLoading, error, responseJSON} = useFetch(URL_DETAILED, URL_PARAMETER, requestOptions)
        
      useEffect(()=>{
        
        if(!isLoading){
          setCustomers(responseJSON.data)
        }

      },[isLoading])

      useEffect(()=>{
          getRelationshipData(tokenID)
      },[form.RelationshipID])
    
      async function getRelationshipData(tokenID) {
        try {
                var requestOptions = {
                    method: 'GET',
                    body: '',
                    redirect: 'follow'
                };
                fetch(`https://api.admcloud.net/api/Customers/${form.RelationshipID}?token=${tokenID}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if(result?.data){
                            dispatch(updateFormField({ "fieldName": "ShipToAddressID", "value": result.data.Addresses[0] ? result.data.Addresses[0].FullName : "" }));
                            dispatch(updateFormField({ "fieldName": "BillToAddressID", "value": result.data.Addresses[0]  ? result.data.Addresses[0].FullName  : ""  }));
                            dispatch(updateFormField({ "fieldName": "EmployeeID", "value": result.data.SalesRepID }));
                            dispatch(updateFormField({ "fieldName": "PaymentTermID", "value": result.data.PaymentTermID }));
                            dispatch(updateFormField({ "fieldName": "CurrencyID", "value": result.data.CurrencyID }));
                        }
                    })
                    .catch(error => console.log('Customer error', error));
            
        }
        catch (err) {
            console.error('getRelationshipData any fail.', err);
        }
    }

  return (
    <View style={searchStyle.inputContainer}>
          <SelectDropdown
            data={customer}
            defaultButtonText={label}
            buttonStyle={searchStyle.dropdown2BtnStyle}
            search
            renderCustomizedRowChild={(item,index) => {
              return (
                <View style={searchStyle.dropdown3RowChildStyle}>
                  <Text style={searchStyle.dropdown3RowTxt}>{item.Name}</Text>
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
        
              dispatch(updateFormField({ "fieldName": "RelationshipID", "value": selectedItem.ID }));
              dispatch(updateFormField({ "fieldName": "LocationID", "value": selectedItem.LocationID  }));
              onChange(selectedItem)
            }}
            onChangeSearchInputText={(item, index) => {

              var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch(`https://api.admcloud.net/api/Customers/Extended/?search=${item}&skip=0&token=${tokenID}`, requestOptions)
                .then(response => response.json())
                .then(result => setCustomers(result.data))
                .catch(error => console.log('error', error));
            
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
            
              return (
                <View style={searchStyle.dropdown3BtnChildStyle}>
                  <Text style={searchStyle.dropdown3BtnTxt}>{selectedItem ? selectedItem.Name : `Buscar ${label}`}</Text>
                </View>
              );
            }}
            
          />

    </View>
  )
}

const style = StyleSheet.create({

    dropdown2BtnStyle: {
        width: '95%',
        height: 45,
        justifyContent: 'flex-start',
        margin: 10,
        padding: 5,
        backgroundColor: Colors.ligth,
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
        paddingHorizontal: 0,
      },
      dropdown3BtnTxt: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 0,
      },

})