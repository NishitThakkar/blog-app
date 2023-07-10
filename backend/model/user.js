const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill name']
    },
    email: {
        type: String,
        required: [true, 'Please fill email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: [true, 'Please fill password'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password have minimum eight characters, at least one uppercase letter, one lowercase letter and one number']
    }
}, { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)