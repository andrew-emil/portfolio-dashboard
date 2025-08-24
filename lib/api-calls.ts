import { ContactDto } from "@/types/dtos/contact.dto"
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

//todo: add project type
export async function addProject() { }

export async function uploadCV() { }