
import * as React from 'react'


export default function PushNotificationsComponent() {
    React.useEffect(() => {
        async function sendPushNotification() {
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            });
        }
    })
}