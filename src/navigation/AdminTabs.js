import {TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import {AntDesign, FontAwesome} from "@expo/vector-icons"
const AdminStack = createStackNavigator();

import {Colors} from "../constants/Colors"
import Admin from "../screens/Admin/Admin"
import RegisterNewUser from "../screens/Admin/RegisterNewUser"
export default function AdminTabs({navigation}) {
    const screenParams = {
        headerTitleAlign:"center",
        headerBackTitleVisible: false,
        headerShown: true,
    }
  return (
    <AdminStack.Navigator
        screenOptions={screenParams}
        
    >
        <AdminStack.Screen name="Administración" component={Admin} 
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={22} style={{marginLeft:25}} color={Colors.secondary} />
            </TouchableOpacity>
            )
        }} />

        <AdminStack.Screen name="RegisterNewUser" options={{title:"Registrar Usuario"}} component={RegisterNewUser} />
        

    </AdminStack.Navigator>
  )
}