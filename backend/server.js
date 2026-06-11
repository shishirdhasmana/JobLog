import "./src/config/dns.js" 
import "dotenv/config";
import express from "express"
import connect_db from "./src/config/db.js"

connect_db()

const app=express()
const port=process.env.PORT

app.get('/',(req,res) => {
    res.send("Hello Word")
})

app.get('/about',(req,res) => {
    res.send("This is about page")
})

app.listen(port,()=>{
console.log(`App listening at http://localhost:${port}`)
})