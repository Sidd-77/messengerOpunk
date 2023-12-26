import expressAsyncHandler from "express-async-handler"
import Message from "../models/messageModel"
import { response } from "express";
import Chat from "../models/chatModel";

export const sendMessage = expressAsyncHandler(async (req, res)=>{
    const { content, chatId} = req.body;
    if(!content || !chatId){
        console.log("Invalid content or chatId");
        res.status(400);
        return;
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("chat");
        message = await message.populate("sender","-password");
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error:any) {
        res.status(400);
        throw new Error(error.message)
    }
})



export const allMessages = expressAsyncHandler(async (req, res) => {
    try{
        const messages = await Message.find({ chat:req.params.chatId }).populate("sender", "name picture email").populate("chat");
        res.json(messages);
    }catch(error:any){
        res.status(400);
        throw new Error(error.message);
    }
})