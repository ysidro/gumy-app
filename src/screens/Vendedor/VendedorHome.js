import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet,TouchableOpacity, ActivityIndicator} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";


export default function VendeorHome({navigation}) {

  const { name } = useSelector(state => state.user)
  const dispatch = useDispatch()


  const vendedor = useSelector(state => state.user);
  const [listTask,setListTask] = React.useState([]);
  const [loading,setLoading] = React.useState(true);

  return (
    <SafeAreaView style={globalStyles.content}>
    
      <View style={globalStyles.constentList}>
        <Text style={globalStyles.subTitle}>{name}</Text>
      </View> 
      <View style={homeBoardStyle.containerMetas}>
      <View style={globalStyles.rowBetween}>
            <View>
              <Text style={homeBoardStyle.labelMetas}>Visitas Diarias</Text>
              <Text style={homeBoardStyle.valueMetas}>  <AntDesign name="team" size={18} color={Colors.primary} /> 0 / 14</Text>
            </View>
            <View>
              <Text style={homeBoardStyle.labelMetas}>Visitas Prospectos</Text>
              <Text style={homeBoardStyle.valueMetas}><AntDesign name="addusergroup" size={18} color={Colors.primary} /> 0/10</Text>
            </View>
            <View>
              <Text style={homeBoardStyle.labelMetas}>Visitas Mes</Text>
              <Text style={homeBoardStyle.valueMetas}><AntDesign name="calendar" size={18} color={Colors.primary} /> 30</Text>
            </View>
      </View>
      </View>
      <View >
          <CustomButtons title='Clientes' onPress={() => navigation.navigate('Clientes') } />
          {/* <CustomButtons title='Reporte de Ventas' onPress={() => navigation.navigate('Clientes')} />  */}
          <CustomButtons title='Registrar Visita' onPress={() => navigation.navigate('Visitas')} /> 
          <CustomButtons title='Reporte Visitas' onPress={() => navigation.navigate('Visitas')} />  
        </View>
      
    </SafeAreaView>
  )
}

const homeBoardStyle = StyleSheet.create({
  containerMetas:{
    width:"94%",
    marginTop:10,
    marginHorizontal:10,
    marginBottom:25,
    padding:15,
    backgroundColor:"#FFFFFF",
    borderRadius:12,
  },
  labelMetas:{
    fontWeight:"bold",
    fontSize:10,
    color:Colors.grey,
  },
  valueMetas:{
    fontWeight:"800",
    fontSize:16,
    marginTop:8,
  }
})