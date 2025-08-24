import axios from "axios"

const apiUrl = process.env.EXPO_PUBLIC_API_URL
const timeout = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "10000", 10)
const secretKey = process.env.EXPO_PUBLIC_API_SECRET_KEY

const axiosClient = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout,
    headers: {
        "Content-Type": "application/json",
        "x-mobile-app-secret": secretKey
    }
})

export default axiosClient