const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

//registration route
router.post("/register", UserController.registerUser);

//login route
router.post("/login", UserController.loginUser);

//History adding
router.post("/volunteering-history", UserController.addHistory);

//Get history for showing
router.get("/volunteering-history", UserController.getHistory);
router.get("/profile", UserController.getUserData);

router.put("/edit_profile", UserController.editUserProfile);
router.put("/update_points", UserController.UpdateUserPoint);
router.get("/sorted_by_points", UserController.getUsersSortedByPoints);
                                                       

module.exports = router;
