import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModel";
// import User from "../models/userModel";

export const accessChat = expressAsyncHandler(async(req, res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log("userId is required");
        res.status(400);
    }

    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users: {$elemMatch:{$eq: req.user._id}}},
            {users: {$elemMatch:{$eq: userId}}},
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await Chat.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name picture email",
    });

    if(isChat.length > 0 ){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }

        try{
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findById(createdChat._id).populate("users","-password");

            res.status(200).json(fullChat);
        }catch(error:any){
            res.status(400);
            throw new Error(error);
        }
    }
})

export const fetchChat = expressAsyncHandler(async(req, res)=>{
    try{
        const fetched = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users","-password")
            .populate("groupAdmin","-password")
            .populate("latestMessage");

        const result = await Chat.populate(fetched,{
            path:"latestMessage.sender",
            select:"name picture email",
        })

        res.status(200).send(result);
    }catch(error:any){
        res.status(400);
        throw new Error("Error while fetching chats");
    }
})

export const createGroupChat = expressAsyncHandler(async(req, res)=>{

    if(!req.body.users || !req.body.name){
        res.status(400)
        throw new Error("Enter all fields");
        return;
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        res.status(400)
        throw new Error("More than 2 users required to form group chat");
        return;
    }

    users.push(req.user);

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    }catch(error:any){
        res.status(400);
        throw new Error(error.message);
    }

})

export const renameGroup = expressAsyncHandler(async(req, res)=>{
    const {chatId, chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        }, {
            new: true,
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(400);
        throw new Error("Chat not updated");
    }else{
        res.json(updatedChat);
    }
})

export const addToGroup = expressAsyncHandler(async(req, res)=>{
    const { chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId}
        }, {
            new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if(!added){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.status(200).json(added);
    }
})

export const removeFromGroup = expressAsyncHandler(async(req, res)=>{
    const { chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId}
        }, {
            new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if(!removed){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.status(200).json(removed);
    }
})