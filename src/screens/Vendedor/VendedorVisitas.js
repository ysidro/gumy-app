import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet,TouchableOpacity, ActivityIndicator} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";
import FormVisitRegister from "../../components/visitasForm/FormVisitRegister"
import { Skeleton } from 'moti/skeleton'
import ListCustomers from '../../components/ListCustomers' 

export default function VendeorVisitas({navigation}) {

  const { name, id, adm_token } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [loading,setLoading] = React.useState(true);


  const [updateScreen, setUpdateScreen] = React.useState(false)

  React.useEffect(() =>{
    if(updateScreen){
      navigation.navigate('VendedorHome');
    }
  },[updateScreen])

  return (
    <SafeAreaView style={globalStyles.content}>
    
      <View style={globalStyles.constentList}>
        <Text style={globalStyles.subTitle}>{name} / Visitas</Text>
      </View> 
      <FormVisitRegister setUpdateScreen={setUpdateScreen} />
      
    </SafeAreaView>
  )
}

