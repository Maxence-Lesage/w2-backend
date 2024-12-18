import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
    },
    name: {
        type: String,
        required: true
    },
    last_name: String,
    age: Number,
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

export default mongoose.model('User', userSchema)