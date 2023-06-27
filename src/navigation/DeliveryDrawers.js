import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer"


import Onboarding from "../screens/Onboarding"
import Settings from "../screens/Settings"
import MensajeriaTabs from "./MensajeriaTabs"
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
                        component={MensajeriaTabs}
                        options={{headerShown:false}}
                        />
      <DrawerNav.Screen name="Settings" component={Settings} />
      
      <DrawerNav.Screen name="PantallaOculta" 
                        component={Onboarding}
                        options={{headerShown:false}}
                      
                        />
    </DrawerNav.Navigator>
  )


}

