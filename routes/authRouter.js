import { Router } from "express";
import { registerNewUser, loginUser } from "../controllers/authController.js";
import { emailMiddleware } from "../middleware/userValidation.js";

const authRouter = Router()

authRouter.post('/register',emailMiddleware, registerNewUser)
authRouter.post('/login', loginUser)

export default authRouter