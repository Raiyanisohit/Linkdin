import joi from 'joi';

// working
export const loginUser = (data) => {
    const schema = joi.object({
        // email: joi.string().required().pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        email: joi.string().required().email(),
        password: joi.string().min(6).required().pattern(/[0-9]/).pattern(/[a-z]/).pattern(/[A-Z]/).pattern(/[^\w]/)
        // password: joi.string().min(6).required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/))
    })

    return schema.validate(data)
}