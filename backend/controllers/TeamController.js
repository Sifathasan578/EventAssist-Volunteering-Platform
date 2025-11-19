const { createTeamQuery, getTeamMembersQuery, getTeamEventsQuery } = require("../models/TeamModel");
const { getTeamsQuery, getUserPrivateTeamsQuery } = require("../models/TeamModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const TeamController = {};

TeamController.getTeams = async (req, res) => {
    try {
        const teams = await getTeamsQuery();
        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: "No teams found" });
        }
        res.status(200).json({ teams });
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


TeamController.createTeam = async (req, res) => {
    try {
        const { type, name, description } = req.body;
        // console.log(type,name,description);

        if (!type || !name || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTeam = await createTeamQuery(type, name, description);

        res.status(201).json({
            message: "Team added successfully",
            team: newTeam,
        });
    } catch (error) {
        console.error("Error adding team:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// This will  get all members of each team
TeamController.getTeamMembers = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = parseInt(decoded.userId, 10);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const { team_id } = req.body; 

        if (!team_id) {
            return res.status(400).json({ message: "team_id is required" });
        }
        const members = await getTeamMembersQuery(team_id);
        if (!members || members.length === 0) {
            return res.status(404).json({ message: "No members found for this team" });
        }
        res.status(200).json({ members });
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// This will provide the events of each team
TeamController.getTeamEvents = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        

        const userId = parseInt(decoded.userId, 10);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const { team_id } = req.body;
       
        if (!team_id) {
            return res.status(400).json({ message: "team_id is required" });
        }
        const events = await getTeamEventsQuery(team_id);
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No events found for this team" });
        }
        res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching team events:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

TeamController.getUserPrivateTeams = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1];
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);
        if (!userId) {
            return res.status(400).json({ message: "user_id is required" });
        }
        const privateTeams = await getUserPrivateTeamsQuery(userId);
        if (!privateTeams || privateTeams.length === 0) {
            return res.status(404).json({ message: "No private teams found for this user" });
        }
        res.status(200).json({ privateTeams });
    } catch (error) {
        console.error("Error fetching private teams:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



module.exports = TeamController;