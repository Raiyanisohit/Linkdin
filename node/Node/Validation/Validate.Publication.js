import Joi from "joi";

export const validatePublication = ({ data }) => {
    const Publication = Joi.object({
        title: Joi.string().required()
    })

    return Publication.validate(data)
}