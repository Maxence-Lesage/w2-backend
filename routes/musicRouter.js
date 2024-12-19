import { Router } from "express";
import { getAllMusics, addNewMusic } from "../controllers/musicController.js";

const musicRouter = Router()

musicRouter.get('/musics', getAllMusics)

musicRouter.post('/musics', addNewMusic)

export default musicRouter