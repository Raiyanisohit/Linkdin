import mongoose, { Schema } from 'mongoose'

const UserProject = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    projectName: { type: String, required: true },
    description: { type: String },
    projectStartMonth: { type: String, required: true },
    projectStartYear: { type: Number, required: true },
    projectEndMonth: { type: String },
    projectEndYear: { type: Number },
    projectLink: { type: String }
},
    { timestamps: true }
);

export const userProject = mongoose.model('userproject', UserProject)