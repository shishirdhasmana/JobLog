import mongoose from "mongoose"

const connect_db = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully!!");
        }

    catch(error){
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

export default connect_db