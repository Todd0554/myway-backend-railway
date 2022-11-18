import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/Validation.js";
import {
  deleteUser,
  getAllTheUsers,
  updateUserProfile,
  userLogin,
  userProfile,
  userRegister,
} from "../controller/userController.js";

// middleware for auth
import { authUser, authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  body("name")
    .isLength({ min: 2 })
    .withMessage("username must be 2 or more characters."),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 or more characters."),
  validate, // middleware
  userRegister
);

router.route("/").get(authUser, authAdmin, getAllTheUsers);
router.route("/:id").delete(authUser, authAdmin, deleteUser);

router.post("/login", userLogin);

router
  .route("/profile")
  .get(authUser, userProfile)
  .put(authUser, updateUserProfile);

export default router;
