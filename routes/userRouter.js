import { Router } from "express";
import User from "../models/User.js";

const userRouter = Router()

userRouter.get('/users', async (req, res) => {
    try {  
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({message: "Internal server error" + error})
    }
})

export default userRouter