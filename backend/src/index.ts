import express from "express";
import { chats } from "./data/data";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { errorHandler, notFound } from "./middlewares/middleware";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import path from "path";
dotenv.config();

interface IUser {
    _id: string;
    name: string;
    token: string;
    email: string;
    picture: string;
    password?: string;
}

const PORT = process.env.PORT ;
connectDB();

const app = express();
app.use(cors({
    origin: "*",
}))
app.use(express.json());


app.get('/', ( req, res)=>{
    res.send("Api is up babyy....");
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})

const io = new Server(server, {cors:{ origin: "*",}, pingTimeout:60000},)

io.on("connection",(socket)=>{
    console.log("Connected to socket.io");

    socket.on("setup", (userData)=>{
        socket.join(userData._id);
        socket.emit("connection");
    })

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("User joined :"+room);
    })

    socket.on("typing", (room)=> {
        room?.forEach((u:IUser) => {
            socket.in(u._id).emit("typing")
        })
    });

    socket.on("stop typing", (room)=> {
        room?.forEach((u:IUser) => {
            socket.in(u._id).emit("stop typing");
        })
    });

    socket.on('new message', (newMessageRecieved)=>{
        console.log("Inside new message");
        let chat  = newMessageRecieved.chat;
        if(!chat.users){
            console.log("chat.users is undefined")
            return;
        }

        chat.users.forEach((u:string) => {
            if(u === newMessageRecieved.sender._id) {
                console.log("sender is herer");
                return;
            };

            console.log(u);
            socket.in(u).emit("message received", newMessageRecieved);
        })
    })

    socket.off("setup", (userData)=>{
        console.log("User disconnected");
        socket.leave(userData._id)
    })
})