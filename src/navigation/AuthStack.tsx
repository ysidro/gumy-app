
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../views/Login'

const Stack = createStackNavigator()

export default function AuthStack() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}