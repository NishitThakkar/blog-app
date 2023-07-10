const mongoose = require("mongoose");
const blogSchema = require("../model/blog")
const userSchema = require("../model/user")
const commentSchema = require("../model/comment")
const { ObjectId } = require('mongodb');

exports.createBlog = async (req, res) => {
    try {
        let data = await blogSchema.create(req.body)
        res.json({
            message: "Blog created successfully",
            data
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(404).json({ message: "Something went wrong!" });
        }
    }
}

exports.findBlog = async (req, res) => {
    try {
        let data = await blogSchema.find()
        res.json({
            message: "Get all Blogs",
            length: data.length,
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.findOneBlog = async (req, res) => {

    try {
        let data = await blogSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "commentList",
                }
            }
        ])
        res.json({
            message: "Get One Blog",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}


exports.updateBlog = async (req, res) => {
    try {
        let data = await blogSchema.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: "Blog updated successfully",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        let data = await blogSchema.findByIdAndDelete(req.params.id)
        res.json({
            message: "Blog deleted successfully",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }

}

exports.myBlog = async (req, res) => {
    try {
        let data = await userSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            }, {
                $lookup: {
                    from: "blogs",
                    localField: "_id",
                    foreignField: "userId",
                    as: "myBlog"
                }
            }
        ])

        res.json({
            message: "Get My Blog",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.searchData = async (req, res, next) => {
    try {
        const data = await blogSchema.find({ $or: [{ "title": { $regex: req.body.search } }, { "category": { $regex: req.body.search } }] });
        res.json({
            message: "search blog successfully",
            length: data.length,
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.createComment = async (req, res, next) => {
    try {
        const data = await commentSchema.create(req.body);
        res.json({
            message: "Comment add successfully",
            length: data.length,
            data
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(404).json({ message: "Something went wrong!" });
        }
    }
}