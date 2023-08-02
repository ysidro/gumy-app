import {TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
const AdminDeliveryHistoryStack = createStackNavigator();

import {Colors} from "../constants/Colors"

import AllDelivery from "../screens/Delivery/AllDelivery"
import AdmDeliveryDetails from "../screens/Delivery/AdmDeliveryDetails"
import OrderDetails from "../screens/Sales/OrderDetails";
export default function AdminDeliveryHistoryTabs({navigation}) {
    const screenParams = {
        headerTitleAlign:"center",
        headerBackTitleVisible: false,
        headerShown: true,
    }
  return (
    <AdminDeliveryHistoryStack.Navigator
        screenOptions={screenParams}
        
    >
        <AdminDeliveryHistoryStack.Screen name="Mensajeria" component={AllDelivery} 
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={22} style={{marginLeft:25}} color={Colors.secondary} />
            </TouchableOpacity>
            )
        }} />

        <AdminDeliveryHistoryStack.Screen name="AdmDeliveryDetails" component={AdmDeliveryDetails}  options={{ title:"Detalle Asignación" }} />
        <AdminDeliveryHistoryStack.Screen name="OrderDetails" component={OrderDetails} />
      

    </AdminDeliveryHistoryStack.Navigator>
  )
}