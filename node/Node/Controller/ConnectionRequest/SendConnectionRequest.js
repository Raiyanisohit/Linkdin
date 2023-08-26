import { connectionrequest } from "../../Models/ConnectionRequest.js";
import { userprofile } from "../../Models/Profile.js";

// Function to check that connection request is already sent or not 
export const checkConnectionRequest = async (req, res) => {
    try {
        const sendRequestUserData = await userprofile.findOne({ "email": req.body.email })

        if (sendRequestUserData) {
            const checkData = await connectionrequest.find({ "requestUserId": sendRequestUserData._id, "userId": req.body.requestId })
            // console.log(checkData)
            if (checkData.length > 0 && checkData[0].requestStatus === "Success") {
                res.status(200).json({ "Message": "In Connection" })
            }
            else if (checkData.length > 0 && checkData[0].requestStatus === "Pending") {
                res.status(200).json({ "Message": "Not Accepted Yet" })
            }
            else {
                res.status(200).json({ "Message": "Request not found" })
            }
        }
        else {
            res.status(204).send("Something went wrong!!")
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to send the connection request
export const sendConnectionRequest = async (req, res) => {

    try {
        const sendRequestUserData = await userprofile.findOne({ "email": req.body.email })

        if (sendRequestUserData) {
            const checkData = await connectionrequest.find({ "requestUserId": sendRequestUserData._id, "userId": req.body.requestId })

            if (checkData.length > 0) {
                res.status(200).json({ "Message": "Request Already Sent" })
            }
            else {
                const newConnectionRequest = {
                    requestUserId: sendRequestUserData._id,
                    userId: req.body.requestId,
                    requestStatus: "Pending"
                }
                const newconnectionrequest = new connectionrequest(newConnectionRequest)
                await newconnectionrequest.save().then((data) => res.status(200).json({ "Message": "Request sent", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to get users's all connection request
export const getAllConnectionRequest = async (req, res) => {

    try {
        const sendRequestUserData = await userprofile.findOne({ "email": req.body.email })
        if (sendRequestUserData) {
            const allConnectionRequest = await connectionrequest.find({ "userId": sendRequestUserData._id, "requestStatus": "Pending" }).populate('requestUserId', 'firstName lastName userImage')
            res.status(200).send(allConnectionRequest)
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to accept or decline the request
export const acceptOrDeclineRequest = async (req, res) => {

    try {
        const checkData = await connectionrequest.findById(req.body.id)

        if (checkData && req.body.status === "Accept") {
            // console.log(checkData)
            await connectionrequest.findByIdAndUpdate(req.body.id, { "requestStatus": "Success" }, { new: true }).then().catch()

            const newConnectionRequest = {
                requestUserId: checkData.userId,
                userId: checkData.requestUserId,
                requestStatus: "Success"
            }
            const newconnectionrequest = new connectionrequest(newConnectionRequest)
            // console.log(newconnectionrequest)
            await newconnectionrequest.save().then((data) => res.status(200).json({ "Message": "Connected to Each Other", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
        }
        else {
            await connectionrequest.findByIdAndDelete(req.body.id).then(res.status(200).json({ "Message": "Request Deleted Succesfully" })).catch((err) => res.status(200).json({ "Message": err }))
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to getNumber of connection of logIn user
export const getTotalConnections = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const id = req.query.id

        if (userData) {
            if (id) {
                const totalConnectionNo = await connectionrequest.find({ "userId": id, "requestStatus": "Success" })
                res.status(200).send((totalConnectionNo.length).toString())
            }
            else {
                const totalConnectionNo = await connectionrequest.find({ "userId": userData._id, "requestStatus": "Success" })
                res.status(200).send((totalConnectionNo.length).toString())
            }
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to remove connection from user's connection
export const userConnections = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const usersConnection = await connectionrequest.find({ "requestUserId": userData._id, "requestStatus": "Success" }).populate("userId", "firstName lastName profileHeadline userImage _id")
            res.status(200).json({ "Message": usersConnection })
        }
        else {
            res.status(200).json({ Message: "Something Went Wrong" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to remove user's connection
export const removeUserConnection = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const apponentData = await userprofile.findOne({ "_id": req.query.userId })

        if (userData && apponentData) {
            const data = await connectionrequest.find({ "requestUserId": userData._id, "userId": apponentData._id })
            const ApponentData = await connectionrequest.find({ "requestUserId": apponentData._id, "userId": userData._id })
            await connectionrequest.findByIdAndDelete(data[0]._id).then().catch()
            await connectionrequest.findByIdAndDelete(ApponentData[0]._id).then(() => res.status(200).json({ "Message": "User removed successfully..!!" })).catch((err) => res.status(500).json({ "Message": err }))
        }
        else {
            res.status(200).json({ Message: "Something Went Wrong" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}