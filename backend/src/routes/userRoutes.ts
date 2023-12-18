import express from "express";
import { registerUser } from "../controllers/userControllers";
import { authUser } from "../controllers/userControllers";

const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(authUser);

export default userRoutes;