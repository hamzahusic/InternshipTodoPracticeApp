import { useForm, type SubmitHandler } from "react-hook-form";
import type { Project } from "../../types/type";
import { createCategory } from "../../storage/storage";

type Inputs = {
  name: string
}

interface CategoriesFormProps{
    projectId : string
    setProject : React.Dispatch<React.SetStateAction<Project | null>>
}

export default function CategoriesForm(
    {
        projectId, 
        setProject
    } : CategoriesFormProps
) {

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { name: "" } })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedProject = createCategory(projectId,data.name)
        setProject(updatedProject)
        resetField("name")
    }


    return (
        <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="project-form__field">
                <input
                    className="project-form__input"
                    placeholder="Enter category name"
                    {...register("name",
                        {
                         required:true,
                         maxLength:80,
                         validate: v => v.trim().length > 0,
                        }
                    )}
                />
                <button className="project-form__submit" type="submit">Create category</button>
            </div>
            {errors.name && <span className="project-form__error">Please enter a valid category name</span>}
        </form>
    )
}