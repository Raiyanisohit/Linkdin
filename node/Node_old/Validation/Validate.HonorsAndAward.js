import joi from 'joi'

export const validateHonorsAndAwars = ({ data }) => {
    const HonorsAndAward = joi.object({
        titel: joi.string().required()
    })

    return HonorsAndAward.validate(data)
}