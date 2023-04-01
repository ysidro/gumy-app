// import * as Notification from 'expo-notifications';
import { Provider } from 'react-redux';

import Navigator from './src/navigation';
import store from './src/store';

// Notification.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true
//   })
// });

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
