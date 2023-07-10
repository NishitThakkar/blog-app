const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.ObjectId
    },
    comment: {
        type: String,
        required: [true, 'Please fill comment'],

    },
    commentBy: {
        type: String
    }
}, { timestamps: true }
)

module.exports = mongoose.model("comment", commentSchema)