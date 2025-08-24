import { ProjectCard } from "@/components/project-card";
import { ProjectDto } from "@/types/dtos/project.dto";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Projects(){
    //todo: add api call
    const projects: ProjectDto[] = [
        {
            _id: "1",
            name: "Portfolio Website",
            category: "Web Development",
            thumbnail: "https://via.placeholder.com/600x300.png?text=Portfolio+Thumbnail",
        },
        {
            _id: "2",
            name: "Mobile App",
            category: "React Native",
            thumbnail: "https://via.placeholder.com/600x300.png?text=App+Thumbnail",
        },
    ];

    return (
        <SafeAreaView className="screen">
            <FlatList
                data={projects}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProjectCard project={item} />}
                contentContainerStyle={{ padding: 16 }}
            />
        </SafeAreaView>
    )
}