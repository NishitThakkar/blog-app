const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please fill title']
    },
    category: {
        type: String,
        required: [true, 'Please fill category']
    },
    description: {
        type: String,
        required: [true, 'Please fill description']
    },
    commentList: {
        type: Object
    },
    userId: {
        type: mongoose.Schema.ObjectId
    },
    creator: {
        type: String
    },
}, { timestamps: true }

)

module.exports = mongoose.model("blog", blogSchema)