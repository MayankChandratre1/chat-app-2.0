import express from "express"
import { WebSocketServer, WebSocket } from "ws";
import { WebSocketArray,
    event_types,
    create_room,
    join_room,
    leave_room,
    broadcast_message } from "./lib/util";

const app = express()

const server = app.listen(8080, ()=> {
    console.log("Server started at http://localhost:8080");
})



const webSocketServer = new WebSocketServer({server})

let rooms = new Map<String, WebSocketArray>([])

webSocketServer.on('connection',(socket)=>{
    console.log("Client Connected");
    
    socket.on('error', (error)=> console.error("WS ERROR:\n"+ error))

    socket.on('message',(data_string)=>{
        const data = JSON.parse(data_string.toString())
        console.log(data);
        
        // console.log(data);

        switch(data.type){
            case event_types.CREATE_ROOM:{
                create_room(socket, rooms, data.room_id)
                console.log("CREATE: "+rooms.get(data.room_id)?.length+ " Users in "+data.room_id);
            }
            break;
            case event_types.JOIN_ROOM:{
                join_room(socket, rooms, data.room_id)
                console.log("JOIN: "+rooms.get(data.room_id)?.length+ " Users in "+data.room_id);
            }
            break
            case event_types.LEAVE_ROOM:{
                leave_room(socket, rooms, data.room_id)
                console.log("LEAVE: "+rooms.get(data.room_id)?.length+ " Users in "+data.room_id);
            }
            break
            case event_types.BROADCAST_MESSAGE:{
                broadcast_message(socket, rooms, data.room_id, data.message)
                console.log("Message sent on room "+data.room_id);   
            }
            default: break;
        }
        
        
    })

    socket.send("You are connected to the server ws://localhost:8080")
})


