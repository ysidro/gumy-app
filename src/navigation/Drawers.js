import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
//import {TouchableOpacity} from 'react-native'
import Stock from "../screens/Stock/Stock"
//import Store from "../screens/Store/Store"
import AdminTabs from "./AdminTabs"
import DasboardStack from "./DasboardStack"
import DeliveryTabs from "./DeliveryTabs"
import CustomerTabs from "./CustomerTabs"
import AllDelivery from "../screens/Delivery/AllDelivery"
import Onboarding from "../screens/Onboarding"
import {Colors} from "../constants/Colors"
const DrawerNav = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const filteredScreens = state.routes.filter(
    (route) => route.name !== 'Onboarding'
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
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNav.Screen name="Home" 
                        component={DasboardStack}
                        options={{headerShown:false}} />
      
      <DrawerNav.Screen name="ClientesTabs" component={CustomerTabs} 
                options={{headerShown:false, title: 'Clientes'}} />
      <DrawerNav.Screen name="Almacen" component={Stock} />
      {/* <DrawerNav.Screen name="Tienda" component={Store} /> */}
      <DrawerNav.Screen name="Delivery" component={AllDelivery}
      options={{headerShown:false, title: 'Mensajería',
    }} />

      <DrawerNav.Screen name="AdminTabs" component={AdminTabs}  options={{headerShown:false, title: 'Administración',}}   />
      <DrawerNav.Screen name="Onboarding" 
                        component={Onboarding}
                        options={{headerShown:false}}
                      
                        />
    </DrawerNav.Navigator>
  )
}

