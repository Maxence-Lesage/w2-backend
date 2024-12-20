import { Router } from "express";
import { playlistIdExistMiddleware } from "../middleware/playlistValidation.js";
import {tokenVerification} from "../middleware/userValidation.js"
import { createNewPlaylist, deletePlaylists, getAllPlaylists, getPlaylistById, getPlaylistByName, updatePlaylist } from "../controllers/playlistController.js";

const playlistRouter = Router()

playlistRouter.get('/playlists', getAllPlaylists)

playlistRouter.get('/playlists/name', getPlaylistByName)

playlistRouter.get('/playlists/id/:id', getPlaylistById)

playlistRouter.post('/playlists', createNewPlaylist)

playlistRouter.put('/playlists/:id', updatePlaylist)

playlistRouter.delete('/playlists', tokenVerification, deletePlaylists)

export default playlistRouter