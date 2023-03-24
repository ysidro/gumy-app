import axios from 'axios'
import Constants from 'expo-constants'

const ApiManager = axios.create({
    baseURL: Constants.expoConfig?.extra?.apiUrl,
    responseType: 'json',
    withCredentials: true
})

export default ApiManager