import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel";
import { generateToken } from "../config/genrateToken";
import bcrypt from "bcrypt";


export const registerUser =  expressAsyncHandler(async (req, res)=>{
    let {email, password, name} = req.body;

    if(!name || !password || !email){
        res.status(400);
        throw new Error("Please enter all fields"); 
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);

    const picture = "https://robohash.org/"+email;

    const user = await User.create({
        name,
        email,
        password,
        picture,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id.toString()),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }

})

export const authUser = expressAsyncHandler(async(req, res)=>{
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if(!isCorrect){
        res.status(400);
        throw new Error("Wrong password");
    }else{
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id.toString()),
        })
    }
})

