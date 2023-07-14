import { View, Text } from 'react-native'
import React from 'react'
import CustomButtons from '../../components/CustomButtons'
import { globalStyles } from '../../styles/global'
export default function Admin({navigation}) {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Administración</Text>
        <View>
          <CustomButtons title='Crear Usuario' onPress={() => navigation.navigate('RegisterNewUser') } />
          </View>
    </View>
  )
}