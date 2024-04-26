import express from "express";
import {
  changePassword,
  forgetpassword,
  login,
  logout,
  register,
  resetPassword,
  sendSMS,
} from "../controllers/adminAccount.js";
import { addSkill, allSkills } from "../controllers/skillController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { allProjects, projectAdd } from "../controllers/projectController.js";
// import { authorizedAdmin } from "../middleware/auth.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/changepassword").put(isAuthenticated, changePassword);

router.route("/forgetpassword").post(forgetpassword);
router.route("/resetpassword/:token").put(resetPassword);
router.route("/addSkill").post(isAuthenticated, addSkill);
router.route("/allSkills").get(allSkills);
router.route("/allProjects").get(allProjects);
router.route("/addProject").post(isAuthenticated, projectAdd);
router.route("/sendSMS").post(sendSMS);

export default router;
