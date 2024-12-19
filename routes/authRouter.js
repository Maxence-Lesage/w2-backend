import { Router } from "express";
import { registerNewUser, loginUser } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post('/register', registerNewUser)
authRouter.post('/login', loginUser)

export default authRouter