import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { PressableProps } from "react-native";

type GlowButtonProps = PressableProps & {
    loading?: boolean;
    children: React.ReactNode;
};

export function GlowButton({
    loading = false,
    children,
    disabled,
    className,
    ...props
}: GlowButtonProps) {
    return (
        <Pressable
            {...props}
            disabled={disabled || loading}
            className={`rounded-lg overflow-hidden ${disabled ? "opacity-50" : ""}`}
        >
            {({ pressed }) => (
                <LinearGradient
                    colors={
                        pressed ? ["#a855f7", "#d946ef", "#ec4899"] : ["#9333ea", "#c026d3"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className={`px-4 py-3 flex-row items-center justify-center rounded-lg
            ${pressed ? "scale-105 shadow-lg" : "shadow-md"}
            ${className}`}
                >
                    {loading && (
                        <ActivityIndicator size="small" color="#fff" className="mr-2" />
                    )}
                    <Text className="text-white font-medium">{children}</Text>
                </LinearGradient>
            )}
        </Pressable>
    );
}
