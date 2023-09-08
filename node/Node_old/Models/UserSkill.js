import mongoose, { Schema } from "mongoose";

const Skill = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, 'ref': 'userprofile' },
    skill: { type: String, required: true }
},
    { timestamps: true },
)

export const userSkill = mongoose.model("skill", Skill)