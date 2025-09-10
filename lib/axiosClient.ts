import axios from "axios"
import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig?.extra?.API_URL
const timeout = Constants.expoConfig?.extra?.TIMEOUT
const secretKey = Constants.expoConfig?.extra?.SECRET_KEY

const axiosClient = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout,
    headers: {
        "x-mobile-app-secret": secretKey
    }
})

export default axiosClient