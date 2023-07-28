import {TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
const CustomerStack = createStackNavigator();

import {Colors} from "../constants/Colors"
import Customer from "../screens/Customer/Customer"
import CustomerDetails from "../screens/Customer/CustomerDetail"
import CustomerShopHistory from "../screens/Customer/CustomerShopHistory"
export default function CustomerTabs({navigation}) {
    const screenParams = {
        headerTitleAlign:"center",
        headerBackTitleVisible: false,
        headerShown: true,
    }
  return (
    <CustomerStack.Navigator
        screenOptions={screenParams}
        
    >
        <CustomerStack.Screen name="Clientes" component={Customer} 
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={22} style={{marginLeft:25}} color={Colors.secondary} />
            </TouchableOpacity>
            )
        }} />

        <CustomerStack.Screen name="Cliente" component={CustomerDetails} />
        <CustomerStack.Screen name="HistoricoCompras" component={CustomerShopHistory} />

    </CustomerStack.Navigator>
  )
}