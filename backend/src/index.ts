import express from "express";
import { chats } from "./data/data";
import 'dotenv/config';
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { errorHandler, notFound } from "./middlewares/middleware";
import cors from "cors";
import { Server } from "socket.io";

interface IUser {
    _id: string;
    name: string;
    token: string;
    email: string;
    picture: string;
    password?: string;
}

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
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

const io = new Server(server, {cors:{ origin: 'http://localhost:5173',}, pingTimeout:60000},)

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
})