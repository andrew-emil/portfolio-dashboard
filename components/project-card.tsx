import { ProjectCardProps } from "@/types/interfaces/project-card.interface";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteProject } from "@/lib/api-calls";
import Toast from "react-native-toast-message";
import React, { useState } from "react";

export function ProjectCard({ project, onDelete }: ProjectCardProps & { onDelete?: (id: string) => void }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (deleting) return;
        setDeleting(true);
        try {
            const res = await deleteProject(project._id);
            if (res.error) {
                Toast.show({
                    type: "error",
                    text1: "Deletion failed",
                    text2: "Something went wrong while deleting.",
                });
            } else {
                Toast.show({
                    type: "success",
                    text1: "Project deleted",
                    text2: "The project has been removed successfully.",
                });
                if (onDelete) onDelete(project._id);
            }
        } catch (error) {
            console.log(error)
            Toast.show({
                type: "error",
                text1: "Deletion failed",
                text2: "Something went wrong while deleting.",
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            layout={Layout.springify()}
            style={{
                width: "100%",
                backgroundColor: "#18181b",
                borderRadius: 18,
                marginBottom: 20,
                overflow: "hidden",
                shadowColor: "#a78bfa",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 8,
                elevation: 6,
                borderWidth: 1,
                borderColor: "#27272a",
            }}
        >
            <Image
                source={{ uri: project.thumbnail }}
                style={{
                    width: "100%",
                    height: 192,
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    backgroundColor: "#27272a",
                }}
                resizeMode="cover"
            />
            <View style={{
                padding: 18,
                gap: 6,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#a78bfa",
                    marginBottom: 2,
                    letterSpacing: 0.5,
                }}>
                    {project.name}
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: "#f3f4f6",
                    marginBottom: 8,
                    fontWeight: "500",
                }}>
                    {project.category}
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: deleting ? "#b91c1c" : "#ef4444",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        alignSelf: "flex-start",
                        shadowColor: "#ef4444",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.18,
                        shadowRadius: 4,
                        marginTop: 8,
                        opacity: deleting ? 0.7 : 1,
                        transitionProperty: "backgroundColor",
                        transitionDuration: "200ms",
                    }}
                    onPress={handleDelete}
                    disabled={deleting}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="delete" size={22} color="#fff" />
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        marginLeft: 10,
                        fontSize: 16,
                        letterSpacing: 0.2,
                    }}>
                        {deleting ? "Deleting..." : "Delete"}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}