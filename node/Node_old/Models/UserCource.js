import mongoose, { Schema } from "mongoose";

const UserCource = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "userprofile" },
    courceName: { type: String },
    number: { type: String },
    associatewith: { type: String },
  },
  {
    timestamps: true,
  }
);

export const userCource = mongoose.model("usercource", UserCource);
