import jwt from 'jsonwebtoken';

export const validater = (req, res, next) => {
    const token = req.headers.token;
    console.log(token,"token")

    try {
        const decode = jwt.verify(token, "DeepsLinkedIn")
        req.body.email = decode.userData.email
        next();
    } catch (e) {   
console.log(e.message)
        res.send("Unothorized Access");
    }
    // const decode = jwt.verify(token, "DeepsLinkedIn", (err, data) => {

        // console.log(data)


    // });
} 