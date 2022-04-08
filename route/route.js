const express = require("express");
const getUser = require("../controller/controller");
const verifyToken = require("../middleware/jwt");
const {userAuth, adminAuth, superAdminAuth} = require("../middleware/roleAuthorization")


const router = express.Router();

// get all user
router.get("/getAllUser", getUser.getAllUser )
//get document
router.get("/getUser", getUser.getDocument)


//user registration route
router.post("/register" , getUser.register)
// //Admin registration route
router.post("/register-admin", getUser.adminRegister)
// //super Admin registration route
router.post("/register-superAdmin" , getUser.superAdminRegister)

// //user login route
router.post("/login" , getUser.login)
//Admin login route
router.post("/login-admin" , getUser.adminLogin)
// //super admin login route
router.post("/login-super-admin" , getUser.login)


//patch
router.patch("/update", getUser.updateProfile)
//delete
router.post("/delete" ,  getUser.deleteProfile)

// //profile
// router.get("profile", profile)

// //user protected route
// router.post("/user-protected" , userProfile)

// //Admin protected route
// router.post("/admin-protected" , AdminProfile)

// //Super Admin protected route
// router.post("/super-admin-protected" , superAdminProfile)



module.exports = router
