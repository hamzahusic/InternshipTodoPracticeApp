import { useNavigate, useParams } from "react-router";
import { deleteCategory, getProjectById } from "../storage/storage";
import { useEffect, useState } from "react";
import type { Project } from "../types/type";
import CategoriesForm from "../components/tasks/CategoriesForm";

export default function ProjectPage() {
    
    const { id } = useParams();
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)

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

    if(!project || !id) return;

    const categories = Object.keys(project?.categories ?? {})

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
                <span>Created at: {project?.createdAt}</span>
            </div>
            <div>
                <CategoriesForm projectId={id} setProject={setProject}/>
            </div>

            <div className="filter-bar">
                {categories.length > 0 ?
                    categories.map((category_id) => (
                        <button className="filter-chip" key={category_id}>
                            {project?.categories[category_id].name}
                            <img src="/bin.png" alt="Delete icon" width={25} onClick={() => handleCategoryDeletion(id, category_id)} />
                        </button>
                    ))
                : <p className="filter-bar__empty">No categories added yet</p>
            }
            </div>


        </div>
    )
}