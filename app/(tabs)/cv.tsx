import { GlowButton } from "@/components/glow-button";
import axiosClient from "@/lib/axiosClient";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";

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

            try {
                const {data} = await axiosClient.post(
                    "/uploads",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.total) {
                                const percent = Math.round(
                                    ((progressEvent.loaded / progressEvent.total) * 100) / 2
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
                console.log(data)
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
            <GlowButton loading={uploading} disabled={uploading} onPress={handleUpload}>
                <Text>Choose CV (PDF)</Text>
            </GlowButton>
            {/* <Button title="" onPress={handleUpload} disabled={uploading} /> */}
            {uploading && (
                <View style={{ width: "100%", marginTop: 24 }}>
                    <View className="w-full h-4 bg-card rounded-full overflow-hidden mb-3">
                        <Animated.View
                            style={{
                                width: widthInterpolated,
                                height: "100%",
                            }}
                        >
                            <LinearGradient
                                colors={["#9333ea", "#c026d3", "#ec4899"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ flex: 1 }}
                            />
                        </Animated.View>
                    </View>
                    <Text className="text-foreground text-center font-inter-italic text-sm">{progress}%</Text>
                    <ActivityIndicator size="large" color="#9333ea" style={{ marginTop: 16 }} />
                </View>
            )}
            {message ? (
                <Text className="text-green-500 mt-4">{message}</Text>
            ) : message.startsWith("Upload failed.") ? (
                <Text className="text-red-500 mt-4">{message}</Text>
            ) : null}
        </View>
    );
}