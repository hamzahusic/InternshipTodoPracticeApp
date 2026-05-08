import { useState } from "react";
import ProjectForm from "../components/projects/ProjectForm";
import { deleteProjectById, getProjects } from "../storage/storage";
import ProjectCard from "../components/projects/ProjectCard";
import NoProjectsCard from "../components/projects/NoProjectsCard";

export default function HomePage() {

    const [projects, setProjects] = useState(getProjects())

    const handleDelete = (id:string) => {
        const restOfProjects = deleteProjectById(id)
        console.log(restOfProjects)
        setProjects(restOfProjects)
    } 

    return (
        <div>
        <p id="title">Mini Jira</p>

        <ProjectForm setProjects = {setProjects}/>

        { Object.keys(projects).length > 0 ? 
         
         <div className="projectCards">
            {Object.keys(projects).map( (id, index) => (
                <ProjectCard id={id} name={projects[id].name} key={index} handleDelete={handleDelete}/>
            ))}
         </div>

        : <NoProjectsCard/>}

        </div>
    )
}