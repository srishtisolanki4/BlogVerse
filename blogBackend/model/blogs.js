const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Match the model name from user.js
        required: true, // You should require a blog to have an author
    },
    title: String,
    content: String,
}, { timestamps: true }); // Place timestamps option here

module.exports = mongoose.model("blog", blogSchema);
