import { Provider } from "react-redux";
import { store } from './src/app/store'
import RootNavigator from "./src/navigation/RootNavigator";
import * as Notification from "expo-notifications"

Notification.setNotificationHandler({
  handleNotification:async () => ({
    shouldShowAlert:true,
    shouldPlaySound:true,
    shouldSetBadge:true,
  })
})

export default function App() {
  return (
  <Provider store={store}>
    <RootNavigator/>
  </Provider>);
}


