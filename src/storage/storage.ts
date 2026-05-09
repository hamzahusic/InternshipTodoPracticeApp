import type { Project } from "../types/type"
import { generateId } from "../utils/id"

export function createProject(name:string) : Project & { id: string } {
    const projectId: string = generateId(name)

    const projects = getProjects()
    const createdAt = new Date().toLocaleDateString()

    localStorage.setItem("projects", JSON.stringify({
        ...projects,
        [projectId] : {
            "name":name,
            "categories": {},
            "createdAt": createdAt
        }
    }))

    return {
        "id" : projectId,
        "name" : name,
        "categories": {},
        "createdAt": createdAt
    }
}

export function getProjects() : Record<string, Project>{
    return JSON.parse(localStorage.getItem("projects") ?? "{}")
}

export function getProjectById(id:string) : Project | undefined{
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

export function createCategory(projectId:string,name:string) :  Project{
    const projects = getProjects()
    const category_id = generateId(name)

    projects[projectId].categories[category_id] = {
        "name": name,
        "tasks": {}
    }

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return projects[projectId]
}

export function deleteCategory(projectId:string,categoryId:string) :  Project{
    const projects = getProjects()

    const {[categoryId]:_, ...restOfCategories} = projects[projectId].categories

    projects[projectId].categories = restOfCategories

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return projects[projectId]
}