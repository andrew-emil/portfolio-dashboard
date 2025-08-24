import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { ActivityIndicator, Animated, Button, Text, View } from "react-native";

export default function CV() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const animatedProgress = useState(new Animated.Value(0))[0];

    const handleUpload = async () => {
        setMessage("");
        setProgress(0);
        animatedProgress.setValue(0);

        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setUploading(true);
            const file = result.assets[0];
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || "application/pdf",
            } as any);

            console.log(result)

            try {
                await axios.post(
                    "YOUR_NESTJS_API_URL/upload", // Replace with your endpoint
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.total) {
                                const percent = Math.round(
                                    (progressEvent.loaded / progressEvent.total) * 100
                                );
                                setProgress(percent);
                                Animated.timing(animatedProgress, {
                                    toValue: percent,
                                    duration: 300,
                                    useNativeDriver: false,
                                }).start();
                            }
                        },
                    }
                );
                setMessage("CV uploaded successfully!");
            } catch (error) {
                console.log(error)
                setMessage("Upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        }
    };

    const widthInterpolated = animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    return (
        <View className="flex-1 items-center justify-center bg-background px-4">
            <Text className="text-foreground text-xl mb-6">Upload your CV</Text>
            <Button title="Choose CV (PDF)" onPress={handleUpload} disabled={uploading} />
            {uploading && (
                <View style={{ width: "100%", marginTop: 24 }}>
                    <View className="w-full h-4 bg-card rounded-full overflow-hidden mb-2">
                        <Animated.View
                            style={{
                                width: widthInterpolated,
                                height: "100%",
                                backgroundColor: "#9333ea",
                            }}
                        />
                    </View>
                    <Text className="text-foreground text-center">{progress}%</Text>
                    <ActivityIndicator size="large" color="#9333ea" style={{ marginTop: 16 }} />
                </View>
            )}
            {message ? (
                <Text className="text-foreground mt-4">{message}</Text>
            ) : null}
        </View>
    );
}