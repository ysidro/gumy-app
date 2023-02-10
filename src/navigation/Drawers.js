import { createDrawerNavigator } from "@react-navigation/drawer"

import Delivery from "../screens/Delivery/Delivery"
import Customer from "../screens/Customer/Customer"
import Stock from "../screens/Stock/Stock"
import Store from "../screens/Store/Store"
import Admin from "../screens/Admin/Admin"
import DasboardStack from "./DasboardStack"
import CustomerTabs from "./CustomerTabs"
const DrawerNav = createDrawerNavigator();

export default function Drawers() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="Home" 
                        component={DasboardStack}
                        options={{headerShown:false}} />
      <DrawerNav.Screen name="ClientesTabs" component={CustomerTabs} 
                options={{headerShown:false, title: 'Clientes',
                  }} />
      <DrawerNav.Screen name="Almacen" component={Stock} />
      <DrawerNav.Screen name="Tienda" component={Store} />
      <DrawerNav.Screen name="Delivery" component={Delivery} />
      <DrawerNav.Screen name="Admin" component={Admin} />
      
    </DrawerNav.Navigator>
  )
}