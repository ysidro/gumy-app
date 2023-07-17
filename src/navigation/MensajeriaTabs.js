import {TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
const MensajeriaStack = createStackNavigator();

import {Colors} from "../constants/Colors"
//import Delivery from "../screens/Delivery/Delivery"
//import DeliveryDetails from "../screens/Delivery/DeliveryDetails"
import DeliveryHome from "../screens/DeliveryProfile/DeliveryHome"
import DeliveryTask from "../screens/DeliveryProfile/DeliveryTask"
import GummyCamera from "../screens/Camera";
export default function MensajeriaTabs({navigation}) {
    const screenParams = {
        headerTitleAlign:"center",
        headerShown: true,
        headerBackTitleVisible: false,
    }
  return (
    <MensajeriaStack.Navigator
        screenOptions={screenParams}
        
    >
        <MensajeriaStack.Screen name="Mensajeria" component={DeliveryHome} 
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={22} style={{marginLeft:25}} color={Colors.secondary} />
            </TouchableOpacity>
            ),
          tabBarIcon:({color}) => (
          <AntDesign name="setting" size={24} color={color} />
          )
        }} />

        <MensajeriaStack.Screen name="Detalle" component={DeliveryTask} />
        <MensajeriaStack.Screen name="Camera" component={GummyCamera}/>
      

    </MensajeriaStack.Navigator>
  )
}