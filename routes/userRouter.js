import { Router } from "express";
import { emailMiddleware } from "../middleware/userValidation.js";
import { addNewPlaylist, createUser, deleteUser, getAllUsers, getUserById, showAllPlaylist } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/users', getAllUsers)

userRouter.post('/users/playlists', showAllPlaylist)

userRouter.post('/users', emailMiddleware, createUser)

userRouter.put('/users/playlists', addNewPlaylist)

userRouter.put('/users/:id', getUserById)

userRouter.delete('/users/:id', deleteUser)

export default userRouter