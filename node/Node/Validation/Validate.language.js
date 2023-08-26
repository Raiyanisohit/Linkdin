import joi from 'joi'

export const validateLanguage = ({ data }) => {
    const Language = joi.object({
        language : joi.string().required()
    })

    return Language.validate(data)
}