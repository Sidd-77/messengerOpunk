import express from "express";
import { chats } from "./data/data";
import 'dotenv/config';
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.get('/', ( req, res)=>{
    res.send("Api is up babyy....");
})

app.get('/api/chats', (req,res)=>{
    res.send(chats);
})

app.get('/api/chat/:id', (req, res)=>{
    const id:String = req.params.id;
    const singlechat = chats.find(c => c._id === id);
    res.send(singlechat);
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})