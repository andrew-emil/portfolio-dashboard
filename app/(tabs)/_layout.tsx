import AnimatedTabIcon from "@/components/animated-tab-icons";
import { screenOptions } from "@/constants/screen-options";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={screenOptions}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Contacts",
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            icon="contacts"
                            iconOutline="contacts-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: "Projects",
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            icon="folder-open"
                            iconOutline="folder"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="add-project"
                options={{
                    title: "Add Project",
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            icon="folder-plus"
                            iconOutline="folder-plus-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cv"
                options={{
                    title: "CV",
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            icon="folder-upload"
                            iconOutline="folder-upload-outline"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
