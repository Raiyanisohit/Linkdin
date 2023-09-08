import express from "express";
import { checkUserExist } from "../Controller/SignUpControl.js";
import { logInUser } from "../Controller/LogInControl.js";
import { forgetPassword } from "../Controller/ForgetPassword.js";
import { validater } from "../MiddleWare/Middleware.js";
import { addUser } from "../Controller/Create.userProfile.js";
import { createUserPost } from "../Controller/UserPostAPI/CreateUserPost.js";
import { checkUserOTP } from "../Controller/UserRegister.checkotp.js";
import { userProfile } from "../Controller/Login.userdata.js";
import { forgetPasswordOTPCheck } from "../Controller/Forgetpassword.checkotp.js";
import { updateNewPassword } from "../Controller/Updatenewpassword.js";
import { getAllPost, logInUserPost } from "../Controller/Allpostdata.js";
import { uploadUserProfile, userBackgroundImage } from "../Controller/UploadUserProfile.js";
import { editUserInfo } from "../Controller/UserProfilePageAPI/EditUserAbout.js";
import { addUserExperience, deleteUserExperience, editUserExperience, getUserExperience } from "../Controller/UserProfilePageAPI/AddUserExperience.js";
import { addUserEducation, deleteUserEducation, editUserEducation, getUserEducation } from "../Controller/UserProfilePageAPI/AddUserEducation.js";
import { addUserProject, deleteUserProject, editUserProject, getUserProject } from "../Controller/UserProfilePageAPI/AddUserProject.js";
import { addUserSkill, deleteUserSkill, editUserSkill, getAllSkills } from "../Controller/UserProfilePageAPI/AddUserSkill.js";
import { userComment } from "../Controller/CommentAPI/UserComment.js";
import { getPostCommentNo, getPostComments, getUsersComments } from "../Controller/CommentAPI/GetPostCommentNo.js";
import { postLike } from "../Controller/UserPostAPI/PostLike.js";
import { postLikeCalculate } from "../Controller/UserPostAPI/CheckPostLike.js";
import { userSearch } from "../Controller/UserSearch/UserSearch.js";
import { checkUserPostLike } from "../Controller/UserPostAPI/CheckUserLikePost.js";
import { acceptOrDeclineRequest, checkConnectionRequest, getAllConnectionRequest, getTotalConnections, removeUserConnection, sendConnectionRequest, userConnections } from "../Controller/ConnectionRequest/SendConnectionRequest.js";
import { commentLike } from "../Controller/CommentAPI/CommentLike.js";
import { checkLikeComment, countCommentLikes } from "../Controller/CommentAPI/CheckCommentLike.js";
import { deleteUserPost } from "../Controller/UserPostAPI/DeleteUserPost.js";
import { addLicenceAndCertificate, deleteLicenceAndCertificate, editLicenceAndCertificate, getLicenceAndCertificateData } from "../Controller/UserProfilePageAPI/LicenceAndCertificate.js";
import { addPublication, deleteUserPublication, editUserPublication, getUserPublicationData } from "../Controller/UserProfilePageAPI/AddPublication.js";
import { addHonorsAndAwards, deleteHonorsAndAward, editUserHonorsdAndAward, getHonorsAndAward } from "../Controller/UserProfilePageAPI/AddHonorsAndAwards.js";
import { addCourses, deleteUserCource, getUserCources, updateCourceData } from "../Controller/UserProfilePageAPI/AddCourses.js";
import { getRecommendationRequest, sendRecommendationRequest, userRecommendation, userRecommendationSearch, usersGivenRecommendation, usersReceivedRecommendation } from "../Controller/UserProfilePageAPI/UserRecommendation.js";
import { updateUserProfile } from "../Controller/UserProfilePageAPI/UpdateUserProfile.js";
import { addUserLanguage, deleteUserLanguage, editUserLanguage, getAllUserLanguage } from "../Controller/UserProfilePageAPI/AddUserLanguage.js";
import { editUserPost } from "../Controller/UserPostAPI/Editpost.js";
const route = express.Router();

route.post("/", checkUserExist);
route.post("/logIn", logInUser);
route.post("/forgetPassword", forgetPassword);
route.post("/addUser", addUser);
route.post("/checkUserOTP", checkUserOTP);
route.post("/checkForgetOTP", forgetPasswordOTPCheck);
route.put("/updatePassword", updateNewPassword);

// Middleware for validate user request
route.use(validater);

// API for user post
route.post("/checkUserLikePost", checkUserPostLike);
route.post("/postLikeCalculate", postLikeCalculate);
route.post("/postLike", postLike);
route.post("/getPostComments", getPostComments);
route.post("/getPostCommentNo", getPostCommentNo);
route.post("/allUserPost", getAllPost);
route.delete("/deleteUserPost", deleteUserPost);
route.post("/createUSerPost", createUserPost);
route.put("/editUserPost", editUserPost);

// other APIs
route.post("/userSearch", userSearch);
route.post("/getUserData", userProfile);
route.get("/userConnections", userConnections);

// API for userProfie page
route.put("/updateUserProfile", updateUserProfile);
route.post("/editUserInfo", editUserInfo);
route.post("/loginUserPosts", logInUserPost);
route.post("/userCommentData", getUsersComments);
route.post("/uploadUserProfile", uploadUserProfile);

// API for CRUD on userSkill
route.get("/getUserSkill", getAllSkills);
route.post("/addUserSkill", addUserSkill);
route.put("/updateUserSkill", editUserSkill);
route.delete("/removeSkill", deleteUserSkill);

// API for userProject CRUD
route.post("/addUserProject", addUserProject);
route.get("/getUserProject", getUserProject);
route.put("/editUserProject", editUserProject);
route.delete("/deleteUserProject", deleteUserProject);

// API for userEducation CRUD
route.post("/addUserEducation", addUserEducation);
route.get("/getUserEducationData", getUserEducation);
route.put("/editUserEducation", editUserEducation);
route.delete("/deleteUserEducation", deleteUserEducation);

// API for user experience CRUD
route.post("/addUserExperience", addUserExperience);
route.get("/getUserExperience", getUserExperience);
route.put("/editUserExperience", editUserExperience);
route.delete("/deleteUserExperience", deleteUserExperience);

// API for CRUD licence and certificate
route.get("/getLicenceAndCertificate", getLicenceAndCertificateData);
route.post("/addLicenceAndCertificate", addLicenceAndCertificate);
route.put("/editLicenceAndCertificate", editLicenceAndCertificate);
route.delete("/deleteLicenceAndCertificate", deleteLicenceAndCertificate);

// API to CRUD user publication
route.post("/addPublication", addPublication);
route.get("/getUserPublication", getUserPublicationData)
route.put("/editUserPublication", editUserPublication);
route.delete("/delteUserPublication", deleteUserPublication)

// API for cource CRUD
route.post("/addCourses", addCourses);
route.get("/getUserCource", getUserCources);
route.put("/updateUserCource", updateCourceData);
route.delete("/deleteUserCourec", deleteUserCource);

// API for honorsAndAwards CRUD
route.post("/addHonorsAndAwards", addHonorsAndAwards);
route.get("/getHonorsAndAwars", getHonorsAndAward);
route.put("/editHonorsAndAwars", editUserHonorsdAndAward);
route.delete("/deleteHonorsAndAwards", deleteHonorsAndAward);

route.post("/userBackgroundImage", userBackgroundImage);

// User language CRUD
route.post("/addUserLanguage", addUserLanguage);
route.put("/editUserLanguage", editUserLanguage);
route.get("/getUserLanguage", getAllUserLanguage);
route.delete("/deleteUserLanguage", deleteUserLanguage);

// API for connections
route.post("/checkConnectionRequest", checkConnectionRequest);
route.get("/getAllConnectionRequest", getAllConnectionRequest);
route.post("/sendConnectionRequest", sendConnectionRequest);
route.post("/acceptOrDeclineRequest", acceptOrDeclineRequest);
route.post("/getTotalConnectionNo", getTotalConnections);

// API for comment
route.post("/userComment", userComment);
route.post("/commentLike", commentLike);
route.post("/checkCommentLike", checkLikeComment);
route.post("/getCommentLikes", countCommentLikes);

// API for recommendation
route.post("/userRecommendationSearch", userRecommendationSearch);
route.post("/sendRecommendationRequest", sendRecommendationRequest);
route.get("/getRecommendationRequest", getRecommendationRequest);
route.post("/userRecommendation", userRecommendation);
route.post("/usersReceivedRecommendation", usersReceivedRecommendation);
route.post("/usersGivenRecommendation", usersGivenRecommendation);

// API for connection
route.delete("/removeConnection", removeUserConnection);

export default route;
