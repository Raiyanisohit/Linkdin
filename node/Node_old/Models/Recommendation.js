import mongoose, { Schema } from "mongoose";

const Recommendation = mongoose.Schema({
    sentUser: { type: Schema.Types.ObjectId, ref: "userprofile" }, // A persion who is sending request for recommendation
    acceptUser: { type: Schema.Types.ObjectId, ref: "userprofile" }, // A persion who will give the recommendation
    relationship: { type: String }, // relation for the recommendation
    position: { type: String }, // position where user and recommended user work together
    status: { type: String }, // Status -> pending/Done
    description: { type: String } // Recomendation description
},
    { timestamps: true }
)

export const recommendation = mongoose.model('recommendation', Recommendation)