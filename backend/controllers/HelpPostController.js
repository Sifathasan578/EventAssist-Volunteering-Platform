const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createHelpPost, getHelpPost, createComment, getComments  } = require("../models/HelpPostModel");

const JWT_SECRET = process.env.JWT_SECRET;

const HelpPostController = {};

HelpPostController.createPost = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1];
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const { title, description, urgency } = req.body;

        // console.log(email,password);
        const post = await createHelpPost(title, description, urgency, userId);
        res.status(201).json({
            message: "Post added successfully",
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

HelpPostController.getPosts = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1];
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const posts = await getHelpPost(userId);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error feetching in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

HelpPostController.createCommentForPost = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1];
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const { post_id, comment } = req.body;

        // console.log(email,password);
        const post = await createComment(post_id, userId, comment);
        res.status(201).json({
            message: "Comment added successfully",
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

HelpPostController.getCommentsForPost = async (req, res) => {
    try {
        const { post_id } = req.params;
        // console.log("psot id is ",post_id);
        const comments = await getComments(post_id);
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
}

module.exports = HelpPostController;
