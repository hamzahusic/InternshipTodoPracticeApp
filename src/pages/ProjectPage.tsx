import { useNavigate, useParams } from "react-router";
import { deleteCategory, deleteTask, getProjectById, onTaskCheck } from "../storage/storage";
import { useEffect, useState } from "react";
import type { Project } from "../types/type";
import CategoriesForm from "../components/tasks/CategoriesForm";
import CategoryButton from "../components/tasks/CategoryButton";
import TaskForm from "../components/tasks/TaskForm";
import TaskCard from "../components/tasks/TaskCard";
import { parseDate } from "../utils/parseDate";

export default function ProjectPage() {
    
    const { id } = useParams();
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("All")
 
    useEffect(() => {

        if(!id){
            navigate('/')
            return
        }
        
        const projectData = getProjectById(id)

        if(!projectData){
            navigate('/')
            return
        }

        setProject(projectData)
    }, [])

    const handleCategoryDeletion = (projectId:string, categoryId:string) => {
        const updatedProject = deleteCategory(projectId, categoryId)

        setProject(updatedProject)
    }

    const handleTaskCheck = (projectId:string, categoryId:string, taskId:string, checked:boolean) => {
        const updatedProject = onTaskCheck(projectId, categoryId, taskId,checked)

        setProject(updatedProject)
    }

    const handleTaskDeletion = (projectId:string, categoryId:string, taskId:string) => {
        const updatedProject = deleteTask(projectId, categoryId, taskId)

        setProject(updatedProject)
    }

    if(!project || !id) return;

    const categories = Object.keys(project?.categories ?? {})
    const createdAt = parseDate(project.createdAt)

    return (
        <div>
            <div className="projectTitle">
                <button 
                    className="project-form__submit"
                    onClick={() => navigate("/")}
                >
                    Go back
                </button>
                <p>{project?.name}</p>
                <span>Created at: {createdAt}</span>
            </div>
            <div>
                <CategoriesForm projectId={id} setProject={setProject}/>
            </div>

            <div className="filter-bar">
                {categories.length > 0 ?
                    <div>
                        <div>
                            <button 
                            className={`filter-chip ${ selectedCategoryId === "All" && 'selected-filter-chip'}`}
                            onClick={() => setSelectedCategoryId("All")}
                            >
                                All
                            </button>
                            {categories.map((category_id) => (
                                <CategoryButton 
                                    key={category_id}
                                    content={project.categories[category_id].name}
                                    handleDelete={() => handleCategoryDeletion(id, category_id)}
                                    handleClick={() => setSelectedCategoryId(category_id)}
                                    selected = {selectedCategoryId === category_id}
                                />
                            ))}
                        </div>
                        <TaskForm projectId={id} categories={categories} project={project} setProject={setProject}/>
                        <div className="task-list">
                            {categories
                                    .filter((
                                        category_id) => selectedCategoryId === "All" ? true : selectedCategoryId === category_id
                                    )
                                    .map((category_id) => (

                                        Object.keys(project.categories[category_id].tasks)
                                        .map((task_id) => {

                                            const task = project
                                                .categories[category_id]
                                                .tasks[task_id]
                                            
                                            const categoryName = project.categories[category_id].name
                                            
                                            return <TaskCard
                                                        key={task_id}
                                                        title={task.title}
                                                        description={task.description}
                                                        completed={task.completed}
                                                        createdAt={task.createdAt}
                                                        category={categoryName}
                                                        handleCheck={() => handleTaskCheck(id, category_id, task_id, !task.completed)}
                                                        handleDelete={() => handleTaskDeletion(id, category_id, task_id)}
                                                    />
                                    })
                                ))
                            }
                        </div>
                    </div>
                : <p className="filter-bar__empty">No categories added yet</p>
            }
            </div>


        </div>
    )
}