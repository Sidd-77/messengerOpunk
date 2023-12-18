import express from "express";
import { chats } from "./data/data";
import 'dotenv/config';
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middlewares/middleware";
import cors from "cors";

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})