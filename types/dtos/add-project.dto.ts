import { ProjectCategory } from "../enums/projects-category.enum";

export interface AddProjectDto {
    _id: string;
    __v: number;
    name: string;
    description: string;
    category: ProjectCategory;
    technologies: string[];
    repositoryUrl?: string;
    liveUrl?: string;
    thumbnail?: {
        type: string;
        data: number[]
    };
}