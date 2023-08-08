import { createStackNavigator } from "@react-navigation/stack"

const HomeStack = createStackNavigator();


import Sales from "../screens/Sales/Sales";
import Settings from "../screens/Settings";
import Order from "../screens/Sales/Order";
import Quotes from "../screens/Sales/Quote";
import CreateOrder from "../screens/Sales/CreateOrder";
import OrderDetails from "../screens/Sales/OrderDetails";
import QuoteDetails from "../screens/Sales/QuoteDetails";
import SelectProduct from "../screens/Sales/SelectProduct";
import AssignDelivery from "../screens/Sales/AssignDelivery";
import GummyCamera from "../screens/Camera";
import ViewsReport from "../screens/Sales/ViewsReport";
import Onboarding from "../screens/Onboarding"
import BottonTabs from "./BottonTabs";
export default function DasboardStack({ route, navigation }) {
    const screenParams = {
            title:"Gumi Tire Supply",
            headerTitleAlign:"center",
            presentation:"modal",
            headerShown: false,
            headerBackTitleVisible: false
        }
    
  return (
    <HomeStack.Navigator
        screenOptions={screenParams}
    >
        <HomeStack.Screen name="Dasboart" component={BottonTabs} />
        <HomeStack.Group screenOptions={{headerShown: true}}>
            <HomeStack.Screen name="Ventas" component={Sales}/>
            <HomeStack.Screen name="Order" component={Order}/>
            <HomeStack.Screen name="Quotes" component={Quotes}/>
            <HomeStack.Screen name="QuoteDetails" component={QuoteDetails}/>
            <HomeStack.Screen name="CreateOrder" component={CreateOrder}/>
            <HomeStack.Screen name="SelectProduct" component={SelectProduct}/>
            <HomeStack.Screen name="OrderDetails" component={OrderDetails}/>
            <HomeStack.Screen name="AssignDelivery" component={AssignDelivery}/>
            <HomeStack.Screen name="Camera" component={GummyCamera}/>
            <HomeStack.Screen name="ViewsReport" component={ViewsReport}/>
            <HomeStack.Screen name="Settings" component={Settings}/>
            <HomeStack.Screen name="Onboarding" 
                        component={Onboarding}
                        options={{headerShown:false}}
                        />
        </HomeStack.Group>
    </HomeStack.Navigator>
  )
}