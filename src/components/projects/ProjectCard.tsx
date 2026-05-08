import { useNavigate } from "react-router"

interface ProjectCardProps{
    id:string
    name: string
    handleDelete: (id: string) => void
}

export default function ProjectCard(
    {
        id,
        name,
        handleDelete
    }: ProjectCardProps
) {
  const navigate = useNavigate()

  return (
    <div className="projectCard" onClick={() => navigate(`/project/${id}`)}>
      <p>{name}</p>
      <button id="deleteProjectButton" onClick={(e) => { e.stopPropagation(); handleDelete(id); }}>
        <img src="/delete.png" width={22}/>
      </button>
    </div>
  )
}