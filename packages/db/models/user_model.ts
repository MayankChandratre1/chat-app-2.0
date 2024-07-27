import mongoose, { Schema } from "mongoose";
interface IUser {
    username: string,
    phone: string,
    email: string,
    password:string,
    rooms: {
        name: {type: string},
        id: {type: Schema.Types.ObjectId}
    }[]
}

const userSchema = new Schema<IUser>({
    username: {type: String},
    phone: {type: String},
    email: {type: String},
    password: {type: String},
    rooms: []
})

const User = mongoose.model('user',userSchema)

export {
    User
};
export type { IUser };
 