import type { Project } from "../types/type"
import { generateId } from "../utils/id"

export function createProject(name:string) : Project & { id: string } {
    const projectId: string = generateId(name)

    const projects = getProjects()

    localStorage.setItem("projects", JSON.stringify({
        ...projects,
        [projectId] : {
            "name":name,
            "categories": {}
        }
    }))

    return {
        "id" : projectId,
        "name" : name,
        "categories": {}
    }
}

export function getProjects() : Record<string, Project>{
    return JSON.parse(localStorage.getItem("projects") ?? "{}")
}

export function getProjectById(id:string) : Project{
    const projects = getProjects()
    return projects[id]
}

export function deleteProjectById(id:string) : Record<string, Project>{
    const projects = getProjects()

    const { [id]: _, ...remainingProjects } = projects;

    localStorage.setItem("projects", JSON.stringify({
        ...remainingProjects
    }))

    return remainingProjects;
}