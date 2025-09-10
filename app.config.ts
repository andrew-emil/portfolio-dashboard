export default ({ config }: { config: any }) => ({
    ...config,
    extra: {
        API_URL: process.env.EXPO_PUBLIC_API_URL,
        TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "10000", 10),
        SECRET_KEY: process.env.EXPO_PUBLIC_API_SECRET_KEY
    },
});