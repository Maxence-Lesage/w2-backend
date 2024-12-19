import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40
    }
});

export default mongoose.model('Music', musicSchema)