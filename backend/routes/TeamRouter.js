const express = require("express");
const TeamController = require("../controllers/TeamController");


const router = express.Router();

router.get("/get_teams", TeamController.getTeams);
router.post("/add_teams", TeamController.createTeam);
router.post("/see_members", TeamController.getTeamMembers);
router.post("/see_events", TeamController.getTeamEvents);
router.get("/see_private_teams", TeamController.getUserPrivateTeams);

module.exports = router;