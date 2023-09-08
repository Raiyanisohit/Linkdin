import joi from 'joi'

export const validateSkill = ({data}) => {
    const Skills = joi.object({
        skill: joi.string().required()
    })

    return Skills.validate(data)
}