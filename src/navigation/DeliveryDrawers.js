import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer"

import DeliveryTabs from "./DeliveryTabs"
import DeliveryHome from "../screens/Delivery/DeliveryHome"
import Onboarding from "../screens/Onboarding"
import Settings from "../screens/Settings"

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

export default function DeliveryDrawers() {

  return (
    <DrawerNav.Navigator   drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerNav.Screen name="Home" 
                        component={DeliveryHome}
                        />

      <DrawerNav.Screen name="Delivery" component={DeliveryTabs}
      options={{headerShown:false, title: 'Mensajería',
    }} />

      <DrawerNav.Screen name="Settings" component={Settings} />
      <DrawerNav.Screen name="PantallaOculta" 
                        component={Onboarding}
                        options={{headerShown:false}}
                      
                        />
    </DrawerNav.Navigator>
  )


}

