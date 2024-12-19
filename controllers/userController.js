import User from "../models/User.js"
import Playlist from "../models/Playlist.js"


export const getAllUsers = async (req, res) => {
    try {  
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({message: "Internal server error" + error})
    }
}

export const createUser = async (req, res) => {
    let {email, name, last_name, age, password} = req.body
    try {  
        if(email, name, last_name, age, password){
            const newUser = await new User({
                email,
                name,
                last_name,
                age,
                password
            })
            newUser.save()
            return res.status(201).json({message: "User has been created"})
        } else {
            return res.status(500).json({message: "All fields are required"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.deleteOne({ _id: id })
        if(deleteUser.deletedCount === 1) {
            return res.status(203).json({message: "User has been deleted"})
        } else {
            return res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

export const addNewPlaylist = async (req, res) => {
    try {
        const {userId, playlistId} = req.body
        const user = await User.findById(userId)
        const playlist = await Playlist.findById(playlistId)
        if(user && playlist){
            user.playlists_id.push(playlistId);
            await user.save();
            return res.status(200).json({ message: "Playlist ajouté avec succès" });
        }else {
            return res.status(404).json({ message: "Utilisateur ou playlist inexistante" });
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

export const showAllPlaylist = async (req, res) => {
    try {
        const {userId} = req.body
        const user = await User.findById(userId)
        const playlists = await user.populate('playlists_id', '-password')
        if(playlists){
            res.status(200).json(playlists.playlists_id)
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

//user     : 6762d5c648363a1b724ea60e
//playlist : 6762e91c0d5fcd4ddae18ab0
// Post.find().populate('user_id', '-password')