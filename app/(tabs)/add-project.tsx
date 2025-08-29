import { GlowButton } from "@/components/glow-button";
import InputField from "@/components/input-field";
import { addProject } from "@/lib/api-calls";
import { ProjectCategory } from "@/types/enums/projects-category.enum";
import { Picker } from '@react-native-picker/picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { ScrollView } from "moti";
import React, { useState } from "react";
import { Image, SafeAreaView, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

            form.technologies.split(",").map(t =>
                formData.append("technologies", t.trim())
            );

            formData.append("repositoryUrl", form.repositoryUrl);
            formData.append("liveUrl", form.liveUrl);
            if (thumbnail) {
                formData.append("thumbnail", {
                    uri: thumbnail.uri,
                    name: thumbnail.name || "upload.jpg",
                    type: "image/jpeg",
                } as any);
            }

            const project = await addProject(formData)

            Toast.show({
                type: "success",
                text1: "Project added",
                text2: `Project ${project.name} was added successfully!`,
            });

            setForm({
                name: "",
                description: "",
                category: ProjectCategory.WebDevelopment,
                technologies: "",
                repositoryUrl: "",
                liveUrl: "",
            });
            setThumbnail(null);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed to add project",
                text2: `${error.message.toLowerCase() || "Something went wrong."}`,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="screen">
            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={50} 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, padding: 16 }}
            >
                <ScrollView
                >
                    <Text className="font-inter-bold text-primary text-md mb-4 text-center">Add Project</Text>
                    <GlowButton onPress={handlePickImage} disabled={loading} className="mb-3">
                        <Text>{thumbnail ? "Change Thumbnail" : "Pick Thumbnail"}</Text>
                    </GlowButton>
                    {thumbnail && (
                        <Image
                            source={{ uri: thumbnail.uri }}
                            className="h-40 w-40 mb-2 self-center rounded-lg"
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
                        dropdownIconColor="#a855f7" 
                        style={{
                            height: 60,
                            width: '100%',
                            minWidth: 0,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#27272a',
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            fontSize: 16,
                            backgroundColor: '#1a1a1a',
                            color: '#f3f4f6',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 1,
                            marginTop: 8,
                            marginBottom: 8,
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}