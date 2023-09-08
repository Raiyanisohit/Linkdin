import mongoose, { Schema } from 'mongoose'

const HonorsAndAwards = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "userprofile" },
    titel: { type: String, required: true },
    associateWith: { type: String },
    issuer: { type: String },
    issueDateMonth: { type: String },
    issueDateYear: { type: Number },
    description: { type: String }
},
    { timestamps: true }
);

export const honorsAndAwards = mongoose.model('honorsandaward', HonorsAndAwards); 