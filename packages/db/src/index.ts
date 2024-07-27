import mongoose from "mongoose"

require("dotenv").config()

async function connect() {
   try{
    const url =process.env.DATABASE_URL || "mongodb://localhost:27017/chat_app"
    await mongoose.connect(url)
    console.log("Database connected to "+url);
   }catch(error){
    console.error("DATABASE_ERR:\n"+ error)
    process.exit(1)
   }
   return mongoose.connection
}
const db_client = connect()
export default db_client

