const userSchema = require("../model/user")
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

exports.login = async (req, res) => {
    try {
        let data = await userSchema.findOne({ email: req.body.email, password: req.body.password })
        if (data) {
            const token = await jwt.sign(data.toJSON(), process.env.SECRET_KEY)
            res.json({
                message: "Login successfully",
                jwt_token: token,
                data
            })
        } else {
            res.json({
                message: "credentials is mismatch"
            })
        }
    } catch (error) {
        res.status(404).json({ messaage: "Something went wrong!" });
    }
}

exports.signup = async (req, res) => {
    try {
        let userCheck = await userSchema.findOne({ email: req.body.email })
        if (!userCheck) {
            let data = await userSchema.create(req.body)
            res.json({
                messaage: "Account created successfully",
                data
            })
        } else {
            res.status(409).json({ message: "Email is already registered" });

        }

    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(404).json({ message: "Something went wrong!" });
        }
    }
}