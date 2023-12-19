import express from "express";
import { registerUser } from "../controllers/userControllers";
import { authUser } from "../controllers/userControllers";
import { allUsers } from "../controllers/userControllers";
import { protect } from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(authUser);
userRoutes.route('/').get(protect,allUsers);

export default userRoutes;