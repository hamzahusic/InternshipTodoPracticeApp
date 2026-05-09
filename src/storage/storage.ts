import type { Project, Task } from "../types/type"
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

export function createTask(projectId:string, categoryId:string, title:string, description:string ) :  Project{
    const projects = getProjects()
    const task_id = generateId(title)
    const createdAt = new Date().toLocaleDateString()

    projects[projectId]
    .categories[categoryId]
    .tasks[task_id] = {
        "title": title,
        "description": description,
        "completed": false,
        "createdAt" : createdAt
    }

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return projects[projectId]
}

export function onTaskCheck(projectId:string, categoryId:string, taskId:string, checked:boolean) : Project{
    const projects = getProjects()
    const task = projects[projectId]
        .categories[categoryId]
        .tasks[taskId]

    projects[projectId]
    .categories[categoryId]
    .tasks[taskId] = {
        "title": task.title,
        "description": task.description,
        "completed": checked,
        "createdAt" : task.createdAt
    }

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return projects[projectId]
}

export function deleteTask(projectId:string, categoryId:string, taskId:string) : Project{
    const projects = getProjects()

    const {[taskId]:_, ...restOfTasks} = projects[projectId].categories[categoryId].tasks

    projects[projectId]
        .categories[categoryId]
        .tasks = restOfTasks

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return projects[projectId]
}

export function clearCompletedTasks(project_id:string): Project{
    const project = getProjectById(project_id)

    // Object.keys(project.categories)
    // .forEach((category_id) => {

    //     const notFinishedTasks: Record<string, Task> = {}

    //     Object.keys(project.categories[category_id].tasks)
    //     .forEach((task_id) => {
    //         if(project.categories[category_id].tasks[task_id].completed === false){
    //             notFinishedTasks[task_id] = project.categories[category_id].tasks[task_id]
    //         }
    //     })

    //     project.categories[category_id].tasks = notFinishedTasks

    // })

    for (const category of Object.values(project.categories)) {
        category.tasks = Object.fromEntries(
            Object.entries(category.tasks).filter(([, task]) => !task.completed)
        )
    }

    const projects = getProjects()
    projects[project_id] = project

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return project
}

export function markAllTasksCompleted(project_id:string): Project{
    const project = getProjectById(project_id)

    for (const category of Object.values(project.categories)) {
        category.tasks = Object.fromEntries(
            Object.entries(category.tasks).map(([key, task]) => [key, { ...task, completed: true }])
        )
    }

    const projects = getProjects()
    projects[project_id] = project

    localStorage.setItem("projects", JSON.stringify({
        ...projects
    }))

    return project
}