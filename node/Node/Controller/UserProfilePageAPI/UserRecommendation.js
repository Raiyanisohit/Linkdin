import { userprofile } from "../../Models/Profile.js";
import { connectionrequest } from "../../Models/ConnectionRequest.js";
import { recommendation } from "../../Models/Recommendation.js";

// Function to search person from users connection for recommendation
export const userRecommendationSearch = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ email: req.body.email });
        const usersConnection = await connectionrequest.find({ requestUserId: userData._id, requestStatus:"Success" }).populate("userId", "firstName lastName userImage profileHeadline _id");

        const val = req.body.name.split(" ");

        const connectionData1 = usersConnection.filter((d) => d.userId.firstName.toLowerCase().includes(val[0].toLowerCase()) && d.userId.lastName.toLowerCase().includes((val[1] ? val[1] : "").toLowerCase()));

        const connectionData2 = usersConnection.filter((d) => d.userId.lastName.toLowerCase().includes(val[0].toLowerCase()) && d.userId.firstName.toLowerCase().includes((val[1] ? val[1] : "").toLowerCase()));

        const finalSearchData = connectionData1.concat(connectionData2);
        const result = finalSearchData.filter((iteam, index) => finalSearchData.indexOf(iteam) === index);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to request for the recommendation in the network page
export const sendRecommendationRequest = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ email: req.body.email });

        if (userData) {
            const checkRecommendation = await recommendation.find({ sentUser: userData._id, acceptUser: req.body.acceptUser, status:"Success"});

            if (checkRecommendation.length > 0) {
                res.status(200).json({ Message: "Request Already Sent" });
            } else {
                const recommendationRequest = {
                    sentUser: userData._id,
                    acceptUser: req.body.acceptUser,
                    relationship: req.body.relationship,
                    position: req.body.position,
                    status: "Pending",
                    description: "",
                };

                const recommendationrequest = await new recommendation(recommendationRequest);
                await recommendationrequest.save().then((data) => res.status(200).json({ Message: "Request sent", Data: data })).catch((err) => res.status(500).json({ Message: err }));
            }
        } else {
            res.status(204).json({ Message: "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to get the request for the user's who will get the recommendation request
export const getRecommendationRequest = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ email: req.body.email });

        if (userData) {
            const requestData = await recommendation.find({ acceptUser: userData._id, status: "Pending" }).populate("sentUser", "firstName lastName userImage _id");
            res.status(200).json({ Message: requestData });
        } else {
            res.status(204).json({ Message: "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to accept or decline recommendation request
export const userRecommendation = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ email: req.body.email });

        if (userData) {
            if (!req.body.description) {
                await recommendation.findByIdAndDelete(req.body.id).then(() => res.status(200).json({ Message: "Recommendation Deleted Succesfully" })).catch((err) => res.status(500).json({ Message: err }));
            }
            else {
                await recommendation
                    .findByIdAndUpdate(req.body.id, { status: "Success", description: req.body.description, }).then((data) => res.status(200).json({ Message: "Recommendation Added", Data: data })).catch((err) => res.status(500).json({ Message: err }));
            }
        }
        else {
            res.status(200).json({ Message: "Something Went Wrong" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to get the data of given recommendation
export const usersGivenRecommendation = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const id = req.query.id

        if (userData) {
            if (id) {
                const givenRecommendation = await recommendation.find({ "sentUser": id, "status": "Success" }).populate("acceptUser", "firstName lastName userImage _id profileHeadline")
                res.status(200).json({ "Message": givenRecommendation })
            }
            else {
                const givenRecommendation = await recommendation.find({ "sentUser": userData._id, "status": "Success" }).populate("acceptUser", "firstName lastName userImage _id profileHeadline")
                res.status(200).json({ "Message": givenRecommendation })
            }
        }
        else {
            res.status(200).json({ Message: "Something Went Wrong" });
        }

    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to get the data of received recommendation
export const usersReceivedRecommendation = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const id = req.query.id

        if (userData) {
            if (id) {
                const receivedRecommendation = await recommendation.find({ "acceptUser": id, "status": "Success" }).populate("sentUser", "firstName lastName userImage _id profileHeadline")
                res.status(200).json({ "Message": receivedRecommendation })
            }
            else {
                const receivedRecommendation = await recommendation.find({ "acceptUser": userData._id, "status": "Success" }).populate("sentUser", "firstName lastName userImage _id profileHeadline")
                res.status(200).json({ "Message": receivedRecommendation })
            }
        }
        else {
            res.status(200).json({ Message: "Something Went Wrong" });
        }

    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}