import mongoose, { Schema } from "mongoose";

const UserLanguage = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, 'ref': 'userprofile' },
    language: { type: String },
    languageProficiency: { type: String, enum: ["Elementary proficiency", "Limited working proficiency", "Professional working proficiency", "Full professional proficiency", "Native or bilingual proficiency"] }
},
    { timestamps: true }
)

export const userLanguage = mongoose.model('userlanguage', UserLanguage)