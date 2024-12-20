import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerNewUser = async (req, res) => {
    try {
        const {email, name, last_name, age, password} = req.body
        if(email, name, last_name, age, password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = await new User({
                email: email,
                name: name,
                last_name: last_name,
                age: age,
                password: hashedPassword
            })
            newUser.save()
            return res.status(200).send("good")
        }else{
            return res.status(400).send("not good")
        }
    } catch (error) {
        return res.status(500).send("error")
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email, password){
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "Identifiants invalides"})
            }
            const passwordverification = await bcrypt.compare(password, user.password)
            if(!passwordverification){
                return res.status(400).json({message: "Identifiants invalides"})
            }

            const token = jwt.sign({user: user._id}, "SECRET_JWT")

            return res.status(200).json({token: token, id: user._id})

        }else{
            return res.status(400).send("not good")
        }
    } catch (error) {
        return res.status(500).json({message: error})
    }
}