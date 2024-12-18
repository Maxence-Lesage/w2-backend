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

//FIND BY ID
userRouter.put('/users/:id', async (req, res) => {
    const {id} = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

userRouter.delete('/users/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.deleteOne({ _id: id })
        if(deleteUser.deletedCount === 1) {
            return res.status(203).json({message: "User has been deleted"})
        } else {
            return res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export default userRouter