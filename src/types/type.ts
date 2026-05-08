export interface Task{
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date 
}

export interface Category {
    name : string,
    tasks : Record<string, Task>
}

export interface Project{
    name : string,
    categories : Record<string, Category>
}