import mongoose from "mongoose";

const userProfile = mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userImage: { type: String },
    backgroundImage: { type: String },
    experience: {
        companyName: { type: String },
        employementType: { type: String },
        jobTitle: { type: String },
        location: { type: String },
        locationType: { type: String },
        startYear: { type: Number },
        startMonth: { type: String },
        endMonth: { type: String },
        endYear: { type: Number }
    },
    education: {
        instituteName: { type: String },
        degree: { type: String },
        studyField: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
        startMonth: { type: String },
        endMonth: { type: String },
        descprition: { type: String },
        grade: { type: String }
    },
    userAbout: { type: String },
    projects: {
        projectName: { type: String },
        description: { type: String },
        projectStartMonth: { type: String },
        projectStartYear: { type: Number },
        projectEndMonth: { type: String },
        projectEndYear: { type: Number },
        projectLink: { type: String }
    },
    skills: {
        Skill: { type: String }
    },
    LicenceAndCertificate: {
        certificateName: { type: String },
        organizationName: { type: String },
        issueDateMonth: { type: String },
        issueDateYear: { type: Number },
        expiryDateMonth: { type: String },
        expiryDateYear: { type: Number }
    },
    Publication: {
        title: { type: String },
        publication: { type: String },
        publicationDateMonth: { type: String },
        publicationDateYear: { type: Number },
        publicationURL: { type: String },
        description: { type: String }
    },
    HonorsAndAwards: {
        titel: { type: String },
        associateWith: { type: String },
        issuer: { type: String },
        issueDateMonth: { type: String },
        issueDateYear: { type: Number },
        description: { type: String }
    },
    Courses: {
        courceName: { type: String },
        number: { type: String },
        associatewith: { type: String }
    },
    Languages: {
        language: { type: String },
        languageProficiency: { type: String }
    },
    industry: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    profileHeadline: { type: String }
},
    { timestamps: true }
);

export const userprofile = mongoose.model('userprofile', userProfile);