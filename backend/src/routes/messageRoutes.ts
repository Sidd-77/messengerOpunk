import express from "express"
import { protect } from "../middlewares/authMiddleware";
import { sendMessage, allMessages } from "../controllers/messageControllers";

const messageRoutes = express.Router();

messageRoutes.route('/').post(protect, sendMessage);
messageRoutes.route('/:chatId').get(protect, allMessages);

export default messageRoutes;