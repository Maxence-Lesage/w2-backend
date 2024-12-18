import Playlist from "../models/Playlist.js"

export const playlistIdExistMiddleware = async (req, res, next) => {
    const {id} = req.params
    const targetedPlaylist = await Playlist.findById(id)
    if(!targetedPlaylist){
        return res.status(404).json({message: "La playlist n'existe pas"})
    }
    next()
}