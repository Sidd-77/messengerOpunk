import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';

const tmp:any = process.env.SECRET || "my_secret";

export const generateToken = (id:string):string => {
    return jsonwebtoken.sign({id}, tmp , {expiresIn: "15d"})
}