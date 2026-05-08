import { useForm, type SubmitHandler } from "react-hook-form";
import type { Project } from "../../types/type";
import { createProject } from "../../storage/storage";

type Inputs = {
  name: string
}

export default function ProjectForm(
    {setProjects} : 
    {setProjects : React.Dispatch<React.SetStateAction<Record<string, Project>>>}
) {

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { name: "" } })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const createdProject = createProject(data.name)

        setProjects((prev) => (
            {...prev, 
            [createdProject.id] : {
                "name" : createdProject.name,
                "categories" : createdProject.categories
            }}
        ))

        resetField("name")
    }


    return (
        <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="project-form__field">
                <input
                    className="project-form__input"
                    placeholder="Enter project name"
                    {...register("name",
                        {
                         required:true,
                         maxLength:120,
                         validate: v => v.trim().length > 0,
                        }
                    )}
                />
                <button className="project-form__submit" type="submit">+ Add Project</button>
            </div>
            {errors.name && <span className="project-form__error">Please enter a valid project name</span>}
        </form>
    )
}