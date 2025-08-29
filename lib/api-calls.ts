import { ContactDto } from "@/types/dtos/contact.dto"
import { DeleteProjectResponseDto } from "@/types/dtos/delete-project-response.dto"
import { ProjectDto } from "@/types/dtos/project.dto"
import axiosClient from "./axiosClient"

export async function deleteContact(contactId: string) {
    try {
        const { data } = await axiosClient.delete<ContactDto>(`/contacts/${contactId}`)

        if (data._id !== contactId) {
            return { error: "Error while deleting contact" }
        }
        return { message: "Contact Deleted successfully" }
    } catch (err) {
        console.log(err)
        return { error: "Error while deleting contact" }
    }
}

export async function getProjects() {
    try {
        const { data } = await axiosClient.get<ProjectDto[]>("/projects")

        return data
    } catch (err) {
        console.log(err)
        return { error: "Error while fetching projects" }
    }
}


export async function addProject(formData: FormData) {
    try {
        const { data } = await axiosClient.post<ProjectDto>(`/projects`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: "application/json"
            },
        })

        return data
    } catch (error: any) {
        console.log("AXIOS ERROR:", JSON.stringify(error, null, 2));
        throw error;
    }
}

export async function deleteProject(projectId: string) {
    try {
        const { data } = await axiosClient.delete<DeleteProjectResponseDto>(`/projects/${projectId}`)

        return { message: data.message }
    } catch (err) {
        console.log(err)
        return { error: "Error while deleting project" }
    }
}