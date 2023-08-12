import joi from 'joi';

export const signupuser = (data) => {
    const schema = joi.object({
        // email: joi.string().required().pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        email: joi.string().required().email(),
        password: joi.string().required().min(6).pattern(/[0-9]/).pattern(/[a-z]/).pattern(/[A-Z]/).pattern(/[^\w]/)
    })

    return schema.validate(data)
}

export const checkUser = (data) => {
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(6).pattern(/[0-9]/).pattern(/[a-z]/).pattern(/[A-Z]/).pattern(/[^\w]/)
    });

    return schema.validate(data)
}