import joi from 'joi'

export const validateEducation = ({ data }) => {
    const Education = joi.object({
        instituteName: joi.string().required(),
        startYear: joi.string().required(),
        endYear: joi.string().required(),
        startMonth: joi.string().required(),
        endMonth: joi.string().required()
    })

    return Education.validate(data)
}