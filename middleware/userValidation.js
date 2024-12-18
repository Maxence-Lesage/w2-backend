import User from "../models/User.js"

export const emailMiddleware = async (req, res, next) => {
    let {email} = req.body
    const searchUserByEmail = await User.findOne({email})
    if(searchUserByEmail){
         return res.status(400).json({message: "Email already used"})
    }
    next()
}