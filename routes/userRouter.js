import { Router } from "express";
import User from "../models/User.js";
import { emailMiddleware } from "../middleware/userValidation.js";

const userRouter = Router()

userRouter.get('/users', async (req, res) => {
    try {  
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({message: "Internal server error" + error})
    }
})

userRouter.post('/users', emailMiddleware, async (req, res) => {
    let {email, name, last_name, age, password} = req.body
    try {  
        if(email, name, last_name, age, password){
            const newUser = await new User({
                email,
                name,
                last_name,
                age,
                password
            })
            newUser.save()
            return res.status(201).json({message: "User has been created"})
        } else {
            return res.status(500).json({message: "All fields are required"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export default userRouter