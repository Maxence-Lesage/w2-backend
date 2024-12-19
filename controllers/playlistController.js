import Playlist from "../models/Playlist.js";

export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        if(playlists.length >= 1){
            return res.status(200).json(playlists);
        }else{
            return res.status(404).json({message: "Aucune playlist n'a été trouvé"})
        }
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const getPlaylistByName = async (req, res) => {
    try {
        const {name} = req.body
        const playlist = await Playlist.findOne({name: name});
        if(playlist){
            return res.status(200).json(playlist);
        }else{
            return res.status(404).json({message: "Aucune playlist n'a été trouvé"})
        }
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const getPlaylistById = async (req, res) => {
    try {
        const {id} = req.params
        const playlist = await Playlist.findOne({_id: id});
        if(playlist){
            return res.status(200).json(playlist);
        }else{
            return res.status(404).json({message: "Aucune playlist n'a été trouvé"})
        }
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const createNewPlaylist = async (req, res) => {
    try {
        const {name, list, genres, version} = req.body
        const newPlaylist = await new Playlist({name, list, genres, version})
        newPlaylist.save()
        return res.status(201).json({message: "Playlist créée avec succès"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const updatePlaylist = async (req, res) => {
    try {
        const {id} = req.params
        await Playlist.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json({message: "Playlist actualisé avec succès"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const {id} = req.params
        const targetedPlaylist = await Playlist.findById(id)
        await Playlist.deleteOne(targetedPlaylist)
        return res.status(201).json({message: "Playlist supprimé avec succès"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}