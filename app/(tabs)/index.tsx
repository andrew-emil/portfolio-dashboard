import ContactCard from "@/components/contact-card";
import { deleteContact } from "@/lib/api-calls";
import { useContacts } from "@/lib/queries/useContacts";
import { ContactDto } from "@/types/dtos/contact.dto";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function TabsIndex() {
    const { apiData, errorMessage } = useLocalSearchParams();
    const [contacts, setContacts] = useState<ContactDto[]>(
        apiData ? JSON.parse(apiData as string) : []
    );
    const { refetch, isRefetching } = useContacts();


    if (errorMessage) {
        return (
            <SafeAreaView className="screen items-center justify-center">
                <Text className="flex text-red-500 font-bold font-inter-bold">Error: {errorMessage}</Text>
            </SafeAreaView>
        );
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteContact(id)

            if (response.error) {
                Toast.show({
                    type: "error",
                    text1: "Deletion failed",
                    text2: "Something went wrong while deleting.",
                });
                throw response.error;
            }

            setContacts((prev) => prev.filter((c) => c._id !== id));

            Toast.show({
                type: "success",
                text1: "Contact deleted",
                text2: "The contact has been removed successfully.",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Deletion failed",
                text2: "Something went wrong while deleting.",
            });
            throw error; // so card resets loading state
        }
    };

    return (
        <SafeAreaView className="screen">
            <FlatList
                data={contacts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ContactCard contact={item} onDelete={handleDelete} />
                )}
                ListEmptyComponent={
                    <Text className="text-center text-neutral-500 mt-4">
                        No contacts found.
                    </Text>
                }
                refreshControl={
                    <RefreshControl onRefresh={refetch} tintColor="#9333ea" refreshing={isRefetching} />
                }
                contentContainerStyle={{ padding: 16 }}
            />
            <Toast />
        </SafeAreaView>
    )
}