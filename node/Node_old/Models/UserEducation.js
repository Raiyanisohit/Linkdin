import mongoose, { Schema } from "mongoose";

const UserEducation = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userprofile" },
  instituteName: { type: String, required: true },
  degree: { type: String },
  studyField: { type: String },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  startMonth: { type: String, required: true },
  endMonth: { type: String, required: true },
  descprition: { type: String },
  grade: { type: String },
},
  { timestamps: true }
);

export const userEducation = mongoose.model("usereducation", UserEducation);
