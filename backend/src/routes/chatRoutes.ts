import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } from "../controllers/chatControllers";

const chatRoutes = express.Router();

chatRoutes.route('/').post(protect, accessChat);
chatRoutes.route('/').get(protect, fetchChat);
chatRoutes.route('/group').post(protect, createGroupChat);
chatRoutes.route('/rename').put(protect, renameGroup);
chatRoutes.route('/groupremove').put(protect, removeFromGroup);
chatRoutes.route('/groupadd').put(protect, addToGroup);

export default chatRoutes;

