import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer"


import Stock from "../screens/Stock/Stock"
import Store from "../screens/Store/Store"
import Admin from "../screens/Admin/Admin"
import DasboardStack from "./DasboardStack"
import DeliveryTabs from "./DeliveryTabs"
import CustomerTabs from "./CustomerTabs"
import Onboarding from "../screens/Onboarding"
const DrawerNav = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const filteredScreens = state.routes.filter(
    (route) => route.name !== 'PantallaOculta'
  );
  props.state.routes = filteredScreens
 
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Drawers() {

  
  return (
    <DrawerNav.Navigator 
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNav.Screen name="Home" 
                        component={DasboardStack}
                        options={{headerShown:false}} />
      
      <DrawerNav.Screen name="ClientesTabs" component={CustomerTabs} 
                options={{headerShown:false, title: 'Clientes',
                  }} />
      <DrawerNav.Screen name="Almacen" component={Stock} />
      <DrawerNav.Screen name="Tienda" component={Store} />
      <DrawerNav.Screen name="Delivery" component={DeliveryTabs}
      options={{headerShown:false, title: 'Mensajería',
    }} />

      <DrawerNav.Screen name="Admin" component={Admin} />
      <DrawerNav.Screen name="PantallaOculta" 
                        component={Onboarding}
                        options={{headerShown:false}}
                      
                        />
    </DrawerNav.Navigator>
  )
}

