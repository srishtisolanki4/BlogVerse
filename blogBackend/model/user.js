const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // It's a good practice to make email unique
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Use minlength instead of minLen
    },
});

module.exports = mongoose.model("user", userSchema);
