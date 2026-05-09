
export default function EmptyListCard({content} : {content:string}) {

  return (
    <div className="projectCard noProjectsCard">
      <p>{content}</p>
    </div>
  )
}