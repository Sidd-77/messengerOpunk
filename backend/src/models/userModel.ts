import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String, required: true, default: "https://robohash.org/default"},
},
{
    timestamps: true
});


const User = mongoose.model("User", userSchema);

export default User;