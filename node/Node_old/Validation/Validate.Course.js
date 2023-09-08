import joi from 'joi'

export const validateCource = ({ data }) => {
    const Cource = joi.object({
        courceName: joi.string().required()
    })

    return Cource.validate(data)
}