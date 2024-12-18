import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    list: {
        type: [String],
        require: true
    },
    genres:{
        type: [String],
        require: true
    },
    version: Number
});

export default mongoose.model('Playlist', playlistSchema)