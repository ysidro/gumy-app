import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet,TouchableOpacity, ActivityIndicator} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";

import { Skeleton } from 'moti/skeleton'
import ListCustomers from '../../components/ListCustomers' 

export default function VendeorVisitas({navigation}) {

  const { name, adm_token } = useSelector(state => state.user)
  const dispatch = useDispatch()


  const vendedor = useSelector(state => state.user);
  const [listTask,setListTask] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  console.log('VendeorVisitas', vendedor)
  return (
    <SafeAreaView style={globalStyles.content}>
    
      <View style={globalStyles.constentList}>
        <Text style={globalStyles.subTitle}>{name} / Visitas</Text>
      </View> 
  
      
    </SafeAreaView>
  )
}

