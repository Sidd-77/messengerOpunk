import mongoose from "mongoose";

// interface iChat {
//     chatName: string,
//     isGroupChat: boolean,
//     users: mongoose.Types.ObjectId[],
// }

const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true},
    isGroupChat: { type: Boolean, default: false},
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ],
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
},
{
    timestamps: true
});

type ChatModel = mongoose.InferSchemaType<typeof chatSchema>;

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;


