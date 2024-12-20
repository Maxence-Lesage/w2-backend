import { Router } from "express";
import { emailMiddleware, tokenVerification } from "../middleware/userValidation.js";
import { addNewPlaylists, createUser, deleteUser, getAllUsers, getUserById, showAllPlaylist, removePlaylists } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/users', getAllUsers)

userRouter.post('/users/playlists', tokenVerification, showAllPlaylist)

userRouter.post('/users', emailMiddleware, createUser)

userRouter.put('/users/playlists', tokenVerification, addNewPlaylists)

userRouter.delete('/user/playlists', tokenVerification, removePlaylists)

userRouter.put('/users/:id', getUserById)

userRouter.delete('/users/:id', deleteUser)

export default userRouter