const express = require("express");
const getUser = require("../controller/controller");
const verifyToken = require("../middleware/jwt");
const {userAuth, adminAuth, superAdminAuth} = require("../middleware/roleAuthorization")


const router = express.Router();

// get all user
router.get("/getAllUser",verifyToken,adminAuth,superAdminAuth, getUser.getAllUser )
//get document
router.get("/getUser",userAuth, getUser.getDocument)


//user registration route
router.post("/register" , getUser.register)
// //Admin registration route
router.post("/register-admin",verifyToken ,superAdminAuth, getUser.adminRegister)
// //super Admin registration route
router.post("/register-superAdmin",verifyToken, superAdminAuth , getUser.superAdminRegister)

// //user login route
router.post("/login" , getUser.login)
//Admin login route
router.post("/login-admin" , getUser.adminLogin)
// //super admin login route
router.post("/login-super-admin" , getUser.login)


//patch
router.patch("/update",verifyToken,userAuth, getUser.updateProfile)
//delete
router.post("/delete" ,verifyToken,  getUser.deleteProfile)

// //profile
// router.get("profile", profile)

// //user protected route
// router.post("/user-protected" , userProfile)

// //Admin protected route
// router.post("/admin-protected" , AdminProfile)

// //Super Admin protected route
// router.post("/super-admin-protected" , superAdminProfile)



module.exports = router
