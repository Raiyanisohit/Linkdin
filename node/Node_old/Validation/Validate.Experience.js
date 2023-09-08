import joi from 'joi'

export const validateExperience = ({data}) => {
    const Experience = joi.object({
        companyName: joi.string().required(),
        employementType: joi.string().required(),
        jobTitle: joi.string().required(),
        location: joi.string().required(),
        locationType: joi.string().required(),
        startYear: joi.number().required(),
        startMonth: joi.string().required(),
    })

    return Experience.validate(data)
}