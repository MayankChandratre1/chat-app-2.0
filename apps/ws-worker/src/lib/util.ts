import { WebSocket } from "ws";
type WebSocketArray = WebSocket[]

const event_types = {
    CREATE_ROOM:"CREATE_ROOM",
    JOIN_ROOM:"JOIN_ROOM",
    LEAVE_ROOM:"LEAVE_ROOM",
    BROADCAST_MESSAGE:"BROADCAST_MESSAGE",
    CHAT:"CHAT",
    ROOM_CREATED:"ROOM_CREATED",
    ROOM_JOINED:"ROOM_JOINED",
    ROOM_DELETED:"ROOM_DELETED",
    ROOM_LEFT:"ROOM_LEFT",
    ERROR:"ERROR"
}

const create_room = (socket: WebSocket, rooms:Map<String, WebSocketArray>, room_id:string)=>{
    if(rooms.get(room_id)){
        socket.send(JSON.stringify({
            type:event_types.ERROR,
            message:'Room Already Exist'
        }))
        return
    }
    rooms.set(room_id, [])
    socket.send(JSON.stringify({
        type:event_types.ROOM_CREATED,
        message:'Created a new room',
        room_id
    }))
}

const join_room = (socket: WebSocket, rooms:Map<String, WebSocketArray> ,room_id:string) => {
    if(!rooms.get(room_id)){
        socket.send(JSON.stringify({
            type:event_types.ERROR,
            message:'Room Does Not Exist'
        }))
        return
    }
    rooms.get(room_id)?.push(socket)
    socket.send(JSON.stringify({
        type:event_types.ROOM_JOINED,
        message:"joined the room",
        room_id
    }))
}

const leave_room = (socket: WebSocket, rooms:Map<String, WebSocketArray> ,room_id:string)=>{
    if(!rooms.get(room_id)){
        socket.send(JSON.stringify({
            type:event_types.ERROR,
            message:'Room Does Not Exist'
        }))
        return
    }
    if(rooms.get(room_id)?.length === 1){
        rooms.delete(room_id)
        socket.send(JSON.stringify({
            type:event_types.ROOM_DELETED,
            message:"delete the room",
            room_id
        }))
    }else{
        let newRoom = rooms.get(room_id)?.filter(clients => clients != socket)
        if(newRoom)
          rooms.set(room_id, newRoom) 
        socket.send(JSON.stringify({
            type:event_types.ROOM_LEFT,
            message:"left the room",
            room_id
        }))
    }
}

const broadcast_message = (socket: WebSocket, rooms:Map<String, WebSocketArray> ,room_id:string, message:string) => {
    if(!rooms.get(room_id)){
        socket.send(JSON.stringify({
            type:event_types.ERROR,
            message:'Room Does Not Exist'
        }))
        return
    }
    rooms.get(room_id)?.forEach(client => {
        if(client.readyState == WebSocket.OPEN){
            client.send(JSON.stringify({
                type:event_types.CHAT,
                message:message,
                room_id
            }))
        }
    })
}

export {
    WebSocketArray,
    event_types,
    create_room,
    join_room,
    leave_room,
    broadcast_message
}