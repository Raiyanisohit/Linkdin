import express from "express";
import { registerUser, checkUserExist } from "../Controller/SignUpControl.js";
import { logInUser } from "../Controller/LogInControl.js";
import { forgetPassword } from "../Controller/ForgetPassword.js";
import { validater } from "../MiddleWare/Middleware.js";
import { addUser } from "../Controller/Create.userProfile.js";
// import { getAllData } from "../Controller/GetAllData.js";
import { createUserPost } from "../Controller/UserPostAPI/CreateUserPost.js";
import { checkUserOTP } from "../Controller/UserRegister.checkotp.js";
import { userProfile } from "../Controller/Login.userdata.js";
import { forgetPasswordOTPCheck } from "../Controller/Forgetpassword.checkotp.js";
import { updateNewPassword } from "../Controller/Updatenewpassword.js";
import { getAllPost, logInUserPost } from "../Controller/Allpostdata.js";
import { uploadUserProfile, userBackgroundImage } from "../Controller/UploadUserProfile.js";
import { editUserInfo } from "../Controller/UserProfilePageAPI/EditUserAbout.js";
import { addUserExperience } from "../Controller/UserProfilePageAPI/AddUserExperience.js";
import { addUserEducation } from "../Controller/UserProfilePageAPI/AddUserEducation.js";
import { addUserProject } from "../Controller/UserProfilePageAPI/AddUserProject.js";
import { addUserSkill } from "../Controller/UserProfilePageAPI/AddUserSkill.js";
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
import { addLicenceAndCertificate } from "../Controller/UserProfilePageAPI/LicenceAndCertificate.js";
import { addPublication } from "../Controller/UserProfilePageAPI/AddPublication.js";
import { addHonorsAndAwards } from "../Controller/UserProfilePageAPI/AddHonorsAndAwards.js";
import { addCourses } from "../Controller/UserProfilePageAPI/AddCourses.js";
import { getRecommendationRequest, sendRecommendationRequest, userRecommendation, userRecommendationSearch, usersGivenRecommendation, usersReceivedRecommendation } from "../Controller/UserProfilePageAPI/UserRecommendation.js";
import { updateUserProfile } from "../Controller/UserProfilePageAPI/UpdateUserProfile.js";
import { addUserLanguage } from "../Controller/UserProfilePageAPI/AddUserLanguage.js";
import { editUserPost } from "../Controller/UserPostAPI/Editpost.js";
const route = express.Router();

route.post("/", checkUserExist); //done
route.post("/registerUser", registerUser);//done
route.post("/logIn", logInUser); //done
route.post("/forgetPassword", forgetPassword);
route.post("/addUser", addUser); //done
route.post("/checkUserOTP", checkUserOTP); //done
route.post("/checkForgetOTP", forgetPasswordOTPCheck);
route.put("/updatePassword", updateNewPassword);
route.use(validater);
route.post("/checkUserLikePost", checkUserPostLike); //done
route.post("/userSearch", userSearch); //done
route.post("/postLikeCalculate", postLikeCalculate); //done
route.post("/postLike", postLike); //done
route.post("/getPostComments", getPostComments);//done
route.post("/getPostCommentNo", getPostCommentNo);//done
route.post("/userComment", userComment);//done
route.post("/addUserSkill", addUserSkill);//done
route.post("/addUserProject", addUserProject);//done
route.post("/addUserEducation", addUserEducation);//done
route.post("/addUserExperience", addUserExperience);//done
route.post("/uploadUserProfile", uploadUserProfile);//done
route.post("/editUserInfo", editUserInfo);//done
route.post("/allUserPost", getAllPost);//done
route.post("/createUSerPost", createUserPost);//done
// route.get("/getAllData", getAllData);
route.post("/getUserData", userProfile);//done
route.post("/checkConnectionRequest", checkConnectionRequest);//done
route.get("/getAllConnectionRequest", getAllConnectionRequest); //done
route.post("/sendConnectionRequest", sendConnectionRequest); //done
route.post("/acceptOrDeclineRequest", acceptOrDeclineRequest); //done
route.post("/getTotalConnectionNo", getTotalConnections); //done
route.post("/commentLike", commentLike);//done
route.post("/checkCommentLike", checkLikeComment);//done
route.post("/getCommentLikes", countCommentLikes);//done
route.delete("/deleteUserPost", deleteUserPost);//done
route.post("/loginUserPosts", logInUserPost);//done
route.post("/userCommentData", getUsersComments);//done
route.post("/addLicenceAndCertificate", addLicenceAndCertificate);//pending
route.post("/addPublication", addPublication);//pending
route.post("/addHonorsAndAwards", addHonorsAndAwards);//pending
route.post("/addCourses", addCourses);//pending
route.post("/userRecommendationSearch", userRecommendationSearch);//pending
route.post("/sendRecommendationRequest", sendRecommendationRequest);//pending
route.get("/getRecommendationRequest", getRecommendationRequest);//pending
route.post("/userRecommendation", userRecommendation);//pending
route.post("/usersReceivedRecommendation", usersReceivedRecommendation);//pending
route.post("/usersGivenRecommendation", usersGivenRecommendation);//pending
route.put("/updateUserProfile", updateUserProfile);//done
route.post('/userBackgroundImage', userBackgroundImage)
route.get('/userConnections', userConnections) //done
route.delete('/removeConnection', removeUserConnection) //done
route.post('/addUserLanguage', addUserLanguage)
route.put('/editUserPost',editUserPost)

export default route;
