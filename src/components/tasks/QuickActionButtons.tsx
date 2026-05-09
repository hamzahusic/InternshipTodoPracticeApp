
interface QuickActionButtonsProps{
    handleClearCompletedTasks : () => void
    handleMarkAllTasksCompleted : () => void
}

export default function QuickActionButtons(
    {
        handleClearCompletedTasks,
        handleMarkAllTasksCompleted
    } : QuickActionButtonsProps
){


    return <div className="quickActionButtonsContainer">
        <button className="project-form__submit" onClick={handleClearCompletedTasks}>Clear completed</button>
        <button className="project-form__submit" onClick={handleMarkAllTasksCompleted}>Mark all completed</button>
    </div>
}