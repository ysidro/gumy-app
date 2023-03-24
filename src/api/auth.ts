import base64 from "react-native-base64";
import Constants from "expo-constants";
import { isAxiosError } from 'axios';

import ApiManager from "./apiManager"

interface loginOptions {
    email: string,
    password: string
}

export interface Response<T> {
    data: T,
    message: string,
    success: boolean
}

export const signIn = async <T>({ email, password }: loginOptions): Promise<Response<T>> => {
    try {
        const { apiKey, roleId, roleName, appId } = Constants.expoConfig?.extra as any;

        const encoder = base64.encode(`${email.toLowerCase()}:${password}`);

        const { data, status, statusText } = await ApiManager<Response<T>>(`Token?Company=${apiKey}&RoleID=${roleId}&role=${roleName}&appid=${appId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encoder}`
            }
        })

        if (status !== 200) {
            console.log('error message: ', statusText);

            return {
                data: null as T,
                success: false,
                message: statusText
            }
        }

        return data
    } catch (error: any) {
        const err = {
            data: null as T,
            success: false
        }
        if (isAxiosError(error)) {
            console.log('error message: ', error.message);
            return {
                ...err,
                message: error.message
            }
        } else {
            console.log('unexpected error: ', error);
            return {
                ...err,
                message: "An unexpected error occurred"
            }
        }
    }
}