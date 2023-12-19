interface IUser {
    _id: string;
    name: string;
    token: string;
    email: string;
    picture: string;
    password?: string;
}

// interface Iheader {
//     authorization: string;
// }


namespace Express {
    interface Request {
        user: IUser;
    }
}