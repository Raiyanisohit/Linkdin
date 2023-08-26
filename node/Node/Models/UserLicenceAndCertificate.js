import mongoose, { Schema } from "mongoose";

const LicenceAndCertificate = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    certificateName: { type: String, required: true },
    organizationName: { type: String, required: true },
    issueDateMonth: { type: String, default: "" },
    issueDateYear: { type: Number, default: 0 },
    expiryDateMonth: { type: String, default: "" },
    expiryDateYear: { type: Number, default: 0 }
},
    { timestamps: true }
);

export const licenceAndCertificate = mongoose.model('licenceandcertificate', LicenceAndCertificate);