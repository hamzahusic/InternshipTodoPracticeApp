import { useForm, type SubmitHandler } from "react-hook-form";
import type { Project } from "../../types/type";
import { createTask } from "../../storage/storage";

type Inputs = {
  title: string,
  description: string,
  category_id: string
}

interface TaskFormProps{
    categories: string[],
    project: Project,
    projectId: string,
    setProject :  React.Dispatch<React.SetStateAction<Project | null>>
}

export default function TaskForm(
{
    categories,
    project,
    projectId,
    setProject
}:TaskFormProps) {

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { title: "", description: "", category_id: "" } })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        
        const updatedProject = createTask(
            projectId,
            data.category_id,
            data.title,
            data.description
        )

        setProject(updatedProject)

        resetField("title")
        resetField("description")
        resetField("category_id")
    }


    return (
        <form className="project-form task-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="project-form__field">
                <input
                    className="project-form__input"
                    placeholder="Enter task title"
                    {...register("title",
                        {
                         required:true,
                         maxLength:120,
                         validate: v => v.trim().length > 0,
                        }
                    )}
                />
                {errors.title && <span className="project-form__error">Please enter a valid task title</span>}
            </div>
            <div className="project-form__field">
                <input
                    className="project-form__input"
                    placeholder="Enter task description"
                    {...register("description",
                        {
                         required:true,
                         maxLength:120,
                         validate: v => v.trim().length > 0,
                        }
                    )}
                />
                {errors.description && <span className="project-form__error">Please enter a valid task description</span>}
            </div>
            <div className="project-form__field">
                <select
                    className="project-form__input"
                    {...register("category_id",
                        {
                         required:true}
                    )}
                >
                 <option value="" disabled>Select a category</option>
                 {categories.map((id) => (
                    <option key={id} value={id}>{project.categories[id].name}</option>
                 ))}
                </select>
                {errors.category_id && <span className="project-form__error">Please select category</span>}
            </div>
            <button className="project-form__submit" type="submit">+ Create task</button>
        </form>
    )
}