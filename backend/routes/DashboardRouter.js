const express = require("express");
const UserController = require("../controllers/DashboardController");

const router = express.Router();

// //registration route
// router.post("/register", UserController.registerUser);

// //login route
// router.post("/login", UserController.loginUser);

// //History adding
// router.post("/volunteering-history", UserController.addHistory);

// //Get history for showing
// router.get("/volunteering-history", UserController.getHistory);
// router.get("/profile", UserController.getUserData);

module.exports = router;
