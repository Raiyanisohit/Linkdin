import mongoose from "mongoose";

const userProfile = mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userImage: { type: String },
    backgroundImage: { type: String },
    userAbout: { type: String },
    // LicenceAndCertificate: {
    //     certificateName: { type: String },
    //     organizationName: { type: String },
    //     issueDateMonth: { type: String },
    //     issueDateYear: { type: Number },
    //     expiryDateMonth: { type: String },
    //     expiryDateYear: { type: Number }
    // },
    // Publication: [
    //     {
    //         title: { type: String },
    //         publication: { type: String },
    //         publicationDateMonth: { type: String },
    //         publicationDateYear: { type: Number },
    //         publicationURL: { type: String },
    //         description: { type: String }
    //     }
    // ],
    // Courses: {
    //     courceName: { type: String },
    //     number: { type: String },
    //     associatewith: { type: String }
    // },
    industry: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    profileHeadline: { type: String }
},
    { timestamps: true }
);

export const userprofile = mongoose.model('userprofile', userProfile);