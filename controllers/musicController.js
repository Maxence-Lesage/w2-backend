import Music from "../models/Music.js"

export const getAllMusics = async (req, res) => {
    try {
        const musics = await Music.find()
        if(musics){
            return res.status(200).json(musics)
        } else {
            return res.status(404).json({message: "Aucune musique trouvée"})
        }
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}

export const addNewMusic = async (req, res) => {
    try {
        const {name} = req.body
        const music = await new Music({name: name})
        music.save()
        return res.status(200).json({message: "La musique a été ajouté"})
    } catch (error) {
        return res.status(500).json({message: "Erreur interne au serveur, veuillez réessayez plus tard."})
    }
}