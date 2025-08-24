import { ProjectCardProps } from "@/types/interfaces/project-card.interface";
import { Image, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            className="w-full bg-white dark:bg-neutral-900 rounded-2xl mb-4 overflow-hidden"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Image
                source={{ uri: project.thumbnail }}
                className="w-full h-48 rounded-t-2xl"
                resizeMode="cover"
            />
            <View className="p-4">
                <Text className="text-lg font-bold text-black dark:text-white">
                    {project.name}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {project.category}
                </Text>
            </View>
        </Animated.View>
    );
}
