import { Router } from "express";
import Playlist from "../models/Playlist.js";

const playlistRouter = Router()

//Get all existing playlist
playlistRouter.get('/playlists', async (req, res) => {
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
})

//Get a specific playlist by name
playlistRouter.get('/playlists/name', async (req, res) => {
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
})

//Create a new playlist
playlistRouter.post('/playlists', async (req, res) => {
    try {
        const {name, list, genres, version} = req.body
        const newPlaylist = await new Playlist({name, list, genres, version})
        newPlaylist.save()
        return res.status(201).json({message: "Playlist créée avec succès"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
})

//Update a playlist
playlistRouter.put('/playlists/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Playlist.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json({message: "Playlist actualisé avec succès"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
})

//Delete a playlist
playlistRouter.delete('/playlists/:id', async (req, res) => {
    try {
        const {id} = req.params
        const targetedPlaylist = await Playlist.findById(id)
        if(targetedPlaylist){
            await Playlist.deleteOne(targetedPlaylist)
            return res.status(201).json({message: "Playlist supprimé avec succès"})
        }else{
            return res.status(404).json({message: "La playlist n'existe pas"})
        }
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
})

export default playlistRouter