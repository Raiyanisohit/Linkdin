import joi from 'joi'

export const validateProject = ({ data }) => {
    const Project = joi.object({
        projectName: joi.string().required(),
        projectStartMonth: joi.string().required(),
        projectStartYear: joi.number().required()
    })

    return Project.validate(data)
}