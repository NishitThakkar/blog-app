const express = require("express")
const passport = require("passport")
const router = express.Router()
const blogController = require("../controllers/blog")

router.post("/create_blog", passport.authenticate("jwt", { session: false }), blogController.createBlog);
router.get("/blog", blogController.findBlog);
router.get("/blog/:id", blogController.findOneBlog);
router.put("/blog/:id", passport.authenticate("jwt", { session: false }), blogController.updateBlog);
router.delete("/blog/:id", passport.authenticate("jwt", { session: false }), blogController.deleteBlog);
router.get("/my_blog/:id", passport.authenticate("jwt", { session: false }), blogController.myBlog);
router.post("/blog/searchData", blogController.searchData)
router.post("/blog/comment", passport.authenticate("jwt", { session: false }), blogController.createComment)

module.exports = router