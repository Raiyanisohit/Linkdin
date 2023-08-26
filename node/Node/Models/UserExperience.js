import mongoose, { Schema } from "mongoose";

const UserExperience = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userprofile" },
  companyName: { type: String, required: true },
  employementType: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  locationType: { type: String, required: true },
  startYear: { type: String, required: true },
  startMonth: { type: String, required: true },
  endMonth: { type: String },
  endYear: { type: String },
},
  { timestamps: true }
);

export const userExperience = mongoose.model('userexperience', UserExperience)