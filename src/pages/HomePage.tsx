import { useState } from "react";
import ProjectForm from "../components/projects/ProjectForm";
import { deleteProjectById, getProjects } from "../storage/storage";
import ProjectCard from "../components/projects/ProjectCard";
import EmptyListCard from "../components/common/EmptyListCard";

export default function HomePage() {

    const [projects, setProjects] = useState(getProjects())

    const handleDelete = (id:string) => {
        const restOfProjects = deleteProjectById(id)
        setProjects(restOfProjects)
    } 

    const projectList = Object.keys(projects)

    return (
        <div>
        <p id="title">Mini Jira</p>

        <ProjectForm setProjects = {setProjects}/>

        { projectList.length > 0 ? 
         
         <div className="projectCards">
            {projectList.map( (id, index) => (
                <ProjectCard id={id} name={projects[id].name} key={index} handleDelete={handleDelete}/>
            ))}
         </div>

        : <EmptyListCard content="No projects added yet"/>}

        </div>
    )
}