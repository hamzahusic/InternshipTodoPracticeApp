import { useParams } from "react-router";

export default function ProjectPage() {
    
    let { id } = useParams();

    return (
        <div>
            <p id="title">Project Page {id}</p>
        </div>
    )
}