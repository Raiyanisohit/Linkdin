import mongoose, { Schema } from "mongoose";

const UserPublication = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    title: { type: String, required: true },
    publication: { type: String },
    publicationDateMonth: { type: String },
    publicationDateYear: { type: Number },
    publicationURL: { type: String },
    description: { type: String }
},
    { timestamps: true }
);

export const userPublication = mongoose.model('userpublication', UserPublication);