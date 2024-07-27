import mongoose, { Schema } from "mongoose";

interface IRoom {
    name: string,
    messages:{
        message: {type: string},
        user: {type: Schema.Types.ObjectId},
        time: {type: Date}
    }[],
    users: {
        name: {type: string},
        id: {type: Schema.Types.ObjectId}
    }[]
}

const roomSchema = new Schema<IRoom>({
    name: {type: String},
    messages: [],
    users: []
})

const Room = mongoose.model('room',roomSchema)

export default Room