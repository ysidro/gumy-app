import {TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
const DeliveryStack = createStackNavigator();

import {Colors} from "../constants/Colors"
import Delivery from "../screens/Delivery/Delivery"
import DeliveryDetails from "../screens/Delivery/DeliveryDetails"

export default function DeliveryTabs({navigation}) {
    const screenParams = {
        headerTitleAlign:"center",
        headerShown: true,
    }
  return (
    <DeliveryStack.Navigator
        screenOptions={screenParams}
        
    >
        <DeliveryStack.Screen name="Mensajeria" component={Delivery} 
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={16} style={{marginLeft:15}} color={Colors.secundary} />
            </TouchableOpacity>
            ),
          tabBarIcon:({color}) => (
          <AntDesign name="setting" size={24} color={color} />
          )
        }} />

        <DeliveryStack.Screen name="Detalle" component={DeliveryDetails} />
      

    </DeliveryStack.Navigator>
  )
}