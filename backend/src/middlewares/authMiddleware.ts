import * as jwt from "jsonwebtoken";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import 'dotenv/config';


export const protect = expressAsyncHandler(async(req, res, next)=>{
    let token:string;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const tmp = process.env.SECRET || "my_secret";
            const decoded:any = jwt.verify(token, tmp);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, bad token")
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, where is the fucking token mate??");
    }
});