import { GlowButton } from "@/components/glow-button";
import InputField from "@/components/input-field";
import { addProject } from "@/lib/api-calls";
import { ProjectCategory } from "@/types/enums/projects-category.enum";
import { Picker } from '@react-native-picker/picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { ScrollView } from "moti";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, Text } from "react-native";
import Toast from "react-native-toast-message";

export default function AddProject() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: ProjectCategory.WebDevelopment,
        technologies: "",
        repositoryUrl: "",
        liveUrl: "",
    });
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<{ uri: string; name: string; type: string } | null>(null);

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handlePickImage = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.9,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setThumbnail({
                uri: asset.uri,
                name: asset.fileName || "thumbnail.jpg",
                type: asset.type || "image/jpeg",
            });
        }
    };

    const handleSubmit = async () => {
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("name", form.name)
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("technologies", JSON.stringify(form.technologies.split(",").map(t => t.trim())));
            formData.append("repositoryUrl", form.repositoryUrl);
            formData.append("liveUrl", form.liveUrl);
            if (thumbnail) {
                formData.append("thumbnail", {
                    uri: thumbnail.uri,
                    name: thumbnail.name,
                    type: thumbnail.type,
                } as any);
            }

            console.log(thumbnail)

            const statusCode = await addProject(formData)
            if (statusCode === 201) {
                Toast.show({
                    type: "success",
                    text1: "Project added",
                    text2: "Project added successfully!",
                });
            }
        } catch (error) {
            console.log(error)
            Toast.show({
                type: "error",
                text1: "Failed to add project",
                text2: "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="screen">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={80}
            >
                <ScrollView>
                    <Text className="font-inter-bold text-primary text-md mb-4 text-center">Add Project</Text>
                    <GlowButton onPress={handlePickImage} disabled={loading} className="mb-3">
                        <Text>{thumbnail ? "Change Thumbnail" : "Pick Thumbnail"}</Text>
                    </GlowButton>
                    {thumbnail && (
                        <Image
                            source={{ uri: thumbnail.uri }}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 12,
                                alignSelf: "center",
                                marginBottom: 8,
                            }}
                            resizeMode="cover"
                        />
                    )}
                    <InputField
                        placeholder="Name"
                        value={form.name}
                        onChangeText={text => handleChange("name", text)}

                    />
                    <InputField
                        placeholder="Description"
                        value={form.description}
                        onChangeText={text => handleChange("description", text)}
                        multiline
                        style={{ height: 120 }}

                    />
                    <Text className="text-sm text-foreground font-inter m-2">Category</Text>
                    <Picker
                        selectedValue={form.category}
                        onValueChange={value => handleChange("category", value)}
                        dropdownIconColor="#a855f7" // matches your purple accent
                        style={{
                            height: 60,
                            width: '100%',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#3f3f46', // zinc-700
                            paddingHorizontal: 12,
                            fontSize: 16,
                            backgroundColor: '#1a1a1a', // dark background like inputs
                            color: '#f3f4f6', // text-gray-100
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 3,
                            marginTop: 8,
                            marginBottom: 12,
                        }}
                    >
                        {Object.values(ProjectCategory).map(cat => (
                            <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                    </Picker>


                    <InputField

                        placeholder="Technologies (comma separated)"
                        value={form.technologies}
                        onChangeText={text => handleChange("technologies", text)} />

                    <InputField
                        placeholder="Repository URL"
                        value={form.repositoryUrl}
                        onChangeText={text => handleChange("repositoryUrl", text)} />

                    <InputField
                        placeholder="Live URL"
                        value={form.liveUrl}
                        onChangeText={text => handleChange("liveUrl", text)} />

                    <GlowButton onPress={handleSubmit} className="mt-4">
                        <Text>{loading ? "Submitting..." : "Submit"}</Text>
                    </GlowButton>
                </ScrollView>
                <Toast />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}