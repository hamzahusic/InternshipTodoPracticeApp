import { parseDate } from "../../utils/parseDate"

interface ProjectCardProps{
    title: string
    description: string
    completed: boolean
    createdAt: string
    category: string
    handleCheck: () => void
    handleDelete: () => void
}

export default function TaskCard(
    {
        title,
        description,
        completed,
        createdAt,
        category,
        handleDelete,
        handleCheck
    }: ProjectCardProps
) {
  const date = parseDate(createdAt)

  return (
    <div className={`task-card ${completed ? " task-card--completed" : ""}`}>
      <input
        className="task-card__checkbox"
        type="checkbox"
        checked={completed}
        onChange={handleCheck}
      />
      <div className="task-card__body">
        <p className="task-card__title">{title}</p>
        <p className="task-card__description">{description}</p>
        <div className="task-card__meta">
          <span className="task-card__category">{category}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
      <button className="task-card__delete" onClick={handleDelete}>
        <img src="/bin.png" width={25} />
      </button>
    </div>
  )
}