import { Router } from "express";
const router = Router();
/**
 * ! import all the controllers
 */
import * as controller from "../controllers/appController.js";
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

// POST Methods
router.route("/register").post(upload, controller.register);
router.route("/registerMail").post(registerMail); // send the mail
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser, controller.login); //login  app

// GET Methods
router.route("/user/:username").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); //generate OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //reset all the variables

// PUT Methods
router.route("/updateuser").put(Auth, upload, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

export default router;
