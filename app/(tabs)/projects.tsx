import { ProjectCard } from "@/components/project-card";
import { useProjects } from "@/lib/queries/useProjects";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Projects() {
    const { data: projects, isLoading, isError, error, refetch, isRefetching } = useProjects();

    if (isLoading) {
        return (
            <SafeAreaView className="screen items-center justify-center">
                <ActivityIndicator
                    size="large"
                    color="#9333ea"
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="screen">
            {isError ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-red-500 text-lg">
                        {error?.message || "An error occurred while loading projects"}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={projects || []}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProjectCard project={item} />}
                    refreshControl={
                        <RefreshControl onRefresh={refetch} tintColor="#9333ea" refreshing={isRefetching} />
                    }
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
            <Toast />
        </SafeAreaView>
    );
}
