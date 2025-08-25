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


export async function addProject(form: FormData): Promise<number> {
    try {
        const res = await axiosClient.post('/projects', form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        console.log(res)

        return res.status
    } catch (error:any) {
        console.log(error.message)
        throw error;
    }
}