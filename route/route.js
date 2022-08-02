const express = require("express");
const getUser = require("../controller/controller");
const verifyToken = require("../middleware/jwt");
// const {
//   userAuth,
//   adminAuth,
//   superAdminAuth,
// } = require("../middleware/roleAuthorization");
const passport = require("passport");
const {
  paystackTransaction,
  paystackVerification,
} = require("../services/paystackTransaction");
const {
  createCustomer,
  updateCustomer,
  fetchCustomer,
  listCustomers,
} = require("../services/paystackCustomer");
// const {paystackSubscription} = require("../services/paystackSubscription")

const router = express.Router();



// get all user
/**
 *        @swagger
 *        /getAllUser:
 *        get:
 *           description: get all the users
 *           responses:
 *               "200":
 *                   description: response successful
 */

router.get("/getAllUser", getUser.getAllUser);
//  get document
/**
 *  @swagger
 *  /getUser:
 *  get:
 *     description: get all document of a user
 *     response:
 *         "200":
 *             description: response successful
 *     parameters:
 *       - in: body
 *         name: email
 *         description: get the document of a particular user via the email
 *         schema:
 *           type: string
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *
 */
router.get("/getUser", getUser.getDocument);

//user registration route
/**
 *  @swagger
 *  /register:
 *  get:
 *     description: register a user
 *     response:
 *         "200":
 *             description: response successful
 *     parameters:
 *       - in: body
 *         name: user
 *         description: register a particular user
 *         schema:
 *           type: object
 *           required:
 *             - user
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 */
router.post("/register", getUser.register);
// //Admin registration route
router.post("/register-admin", getUser.adminRegister);
// //super Admin registration route
router.post("/register-superAdmin", getUser.superAdminRegister);

// //user login route
router.post("/login", getUser.login);
//Admin login route
router.post("/login-admin", getUser.adminLogin);
// //super admin login route
router.post("/login-super-admin", getUser.login);
router.post("/paystack", paystackTransaction);
router.post("/customer/create", createCustomer);
router.post("/customer/update", updateCustomer);
router.get("/customer/fetch", fetchCustomer);
router.get("/customer/list", listCustomers);
//patch
router.patch("/update", getUser.updateProfile);
//delete
router.post("/delete", getUser.deleteProfile);

// //profile
// router.get("profile", profile)

// //user protected route
// router.post("/user-protected" , userProfile)

// //Admin protected route
// router.post("/admin-protected" , AdminProfile)

// //Super Admin protected route
// router.post("/super-admin-protected" , superAdminProfile)

module.exports = router;
