import { AsyncStorage } from "react-native"
import axios from 'axios'
import decode from 'jwt-decode';

const JWT_TOKEN = "jwt-token"

export const signIn = token => AsyncStorage.setItem(JWT_TOKEN, token)

export const signOut = () => AsyncStorage.removeItem(JWT_TOKEN)

export const isSignedIn = async () => {
    let result = false
    const token = await AsyncStorage.getItem(JWT_TOKEN)
    if (token !== null) {
        console.warn('Com Token')
        const decoded = decode(token)
        if (decoded.exp !== null && decoded.exp < new Date().getTime()) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
            result = true
        }
    } else {
        console.warn('Sem Token')
    }
    return result
}