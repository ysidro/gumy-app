import * as React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../styles/global'
import SingIn from '../../components/AuthFlow/SingIn'
export default function RegisterNewUser({navigation}) {
  const [updateScreen, setUpdateScreen] = React.useState(false)

  React.useEffect(() =>{
    const newData = updateScreen;

    if (updateScreen) {
      navigation.navigate('Admin', { newData });
      setUpdateScreen(false)
    }
  },[updateScreen])
  
  return (
    <View style={globalStyles.screenContainer}>
    
        <SingIn  setUpdateScreen={setUpdateScreen}/>
    </View>
  )
}