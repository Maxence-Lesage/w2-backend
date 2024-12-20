import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const emailMiddleware = async (req, res, next) => {
  let { email } = req.body
  const searchUserByEmail = await User.findOne({ email })
  if (searchUserByEmail) {
    return res.status(400).json({ message: "Email already used" })
  }
  next()
}

export const tokenVerification = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, "SECRET_JWT")
    if (verify) {
      next()
    } else {
      res.status(500).send("Token invalide")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Erreur")
  }
}
