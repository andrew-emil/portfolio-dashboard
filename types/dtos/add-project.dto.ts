import { ProjectCategory } from "../enums/projects-category.enum";

export interface AddProjectDto {
    name: string;
    description: string;
    category: ProjectCategory;
    technologies: string[];
    repositoryUrl?: string;
    liveUrl?: string;
    thumbnail?: Buffer;
}