import { createStackNavigator } from "@react-navigation/stack"

const HomeStack = createStackNavigator();


import Sales from "../screens/Sales/Sales";
import Settings from "../screens/Settings";
import Order from "../screens/Sales/Order";
import ViewsReport from "../screens/Sales/ViewsReport";
import BottonTabs from "./BottonTabs";

export default function DasboardStack() {
    const screenParams = {
            title:"Gumy Tire Supply",
            headerTitleAlign:"center",
            presentation: "modal",
            headerShown: false,
        }
    
  return (
    <HomeStack.Navigator
        screenOptions={screenParams}
    >
        <HomeStack.Screen name="Dasboart" component={BottonTabs} />
        <HomeStack.Group screenOptions={{headerShown: true,}}>
            <HomeStack.Screen name="Ventas" component={Sales}/>
            <HomeStack.Screen name="Order" component={Order}/>
            <HomeStack.Screen name="ViewsReport" component={ViewsReport}/>
            <HomeStack.Screen name="Settings" component={Settings}/>
        </HomeStack.Group>
    </HomeStack.Navigator>
  )
}