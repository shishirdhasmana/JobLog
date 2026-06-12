import express from "express"
import User from "../models/User.js"
const router = express.Router()

//Register User
//http://localhost:3000/users/signUp
router.post('/signUp', async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

//User LogIn
//http://localhost:3000/users/logIn
router.post('/logIn',async (req,res)=>{
    try{
        const user = await User.getUserCredentials(req.body.email,req.body.password);
        res.send(user)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }

})

export default router 