
export const create_websocket_room = ({roomId}:{roomId:string})=>{
    const ws = new WebSocket(process.env.WEBSOCKET_URL||"ws://localhost:8080")
    ws.onopen = ()=>{
        console.log("Connected to ws");
        ws.onmessage = async (message) => {
            const data = await JSON.parse(message.data)
            switch(data.type){
                case "ROOM_CREATED":{
                    ws.send(JSON.stringify({
                        type:"JOIN_ROOM",
                        roomId
                    }))
                }
                break;
                default:break;
            }
            console.log("JOIN_LOGIC: "+data);
            
        }
        ws.send(JSON.stringify({
            type:"CREATE_ROOM",
            roomId
        }))
    }
    ws.onclose = () => {
        console.log("Disconnected from ws");  
    }
    return ws
}

export const getConnection = () => {
    const ws =  new WebSocket(process.env.WEBSOCKET_URL||"ws://localhost:8080")
    return ws
}