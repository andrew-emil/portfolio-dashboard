import { ContactCardProps } from "@/types/interfaces/contact-card.interface";
import { MaterialIcons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await onDelete(contact._id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 300 }}
                className="bg-neutral-900 rounded-2xl shadow-lg px-4 py-3 mb-4 mx-2"
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg font-inter-bold text-white">
                            {contact.fullName}
                        </Text>
                        <Text className="text-sm text-neutral-400">{contact.email}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleDelete}
                        disabled={loading}
                        className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-md"
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <MaterialIcons name="delete" size={20} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Subject + Message */}
                <View className="border-l-4 border-indigo-500 pl-3 mb-2">
                    <Text className="text-base font-inter-bold text-white">
                        {contact.subject}
                    </Text>
                    <Text className="text-sm text-neutral-300">{contact.message}</Text>
                </View>

                {/* Timestamp */}
                <Text className="text-xs text-neutral-500">
                    {new Date(contact.createdAt).toLocaleString()}
                </Text>
            </MotiView>

        </AnimatePresence>
    );
}
