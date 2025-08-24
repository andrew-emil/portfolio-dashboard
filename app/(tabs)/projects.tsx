import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/api-calls";
import { ProjectDto } from "@/types/dtos/project.dto";
import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Projects() {
    const [state, setState] = useState<{
        projects: ProjectDto[];
        error: string;
        loading: boolean;
    }>({
        projects: [],
        error: "",
        loading: true,
    });

    useEffect(() => {
        (async () => {
            const response = await getProjects();
            if ("error" in response) {
                setState({ projects: [], error: response.error, loading: false });
            } else {
                setState({ projects: response, error: "", loading: false });
            }
        })();
    }, []);

    if (state.loading) {
        return (
            <SafeAreaView className="screen items-center justify-center">
                <ActivityIndicator size="large" color="#f4f5f6" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="screen">
            {state.error ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-red-500 text-lg">{state.error}</Text>
                </View>
            ) : (
                <FlatList
                    data={state.projects}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProjectCard project={item} />}
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </SafeAreaView>
    );
}