import express from "express"
import 'dotenv/config'
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