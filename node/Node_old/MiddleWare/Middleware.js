import jwt from 'jsonwebtoken';

export const validater = (req,res,next) => {
    const token = req.headers.token;

    jwt.verify(token,"DeepsLinkedIn",(err,data)=>{
        if(err){
            res.send("Unothorized Access");
        }
        else{
            req.body.email = data.userData.email
            next();
        }
    });
} 