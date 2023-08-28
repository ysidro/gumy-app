import { createStackNavigator } from "@react-navigation/stack"


import Onboarding from "../screens/Onboarding"
import Settings from "../screens/Settings"
import VendedorBottonTaps from "./VendedorBottonTaps"
import VendedorVisitas from "../screens/Vendedor/VendedorVisitas"
import VendedorClientes from "../screens/Vendedor/VendedorClientes"
import CustomerDetails from "../screens/Vendedor/VendedorClienteDetail"


const StackNav = createStackNavigator();


export default function VendedorStack() {

  const screenParams = {
    title:"Gumi Tire Supply",
    headerTitleAlign:"center",
    presentation:"modal",
    headerShown: false,
    headerBackTitleVisible: false
  }

  return (
    <StackNav.Navigator   screenOptions={screenParams}>
      <StackNav.Screen name="VendedorHome" 
                        component={VendedorBottonTaps}
                        options={{headerShown:false}}
                        />
      <StackNav.Screen name="Settings" component={Settings} />
      <StackNav.Screen name="Visitas" component={VendedorVisitas} />
      <StackNav.Screen name="Clientes" component={VendedorClientes} />
      <StackNav.Screen name="Cliente" component={CustomerDetails} />
      
      
      
      <StackNav.Screen name="PantallaOculta" 
                        component={Onboarding}
                        options={{headerShown:false}}
                      
                        />
    </StackNav.Navigator>
  )


}

