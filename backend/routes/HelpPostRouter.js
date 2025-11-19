const express = require("express");
const HelpPostController = require("../controllers/HelpPostController");


const router = express.Router();

//Create Help post route
router.post("/create_post", HelpPostController.createPost);
router.get("/getPosts", HelpPostController.getPosts);
router.post("/submitComment", HelpPostController.createCommentForPost);
router.get("/getComments/:post_id", HelpPostController.getCommentsForPost);

module.exports = router;
