const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createEventQuery, getEventQuery } = require("../models/EventModel");

const JWT_SECRET = process.env.JWT_SECRET;

const EventController = {};

EventController.createEvent = async (req, res) => {
    try {
        const { title, description, eventDate, startTime, endTime, location, category } = req.body;

        const event = await createEventQuery(
            title,
            description,
            eventDate,
            startTime,
            endTime,
            location,
            category
        );
        res.status(201).json({
            message: "Post added successfully",
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

EventController.getEvents = async (req,res) => {
    try{
        const events = await getEventQuery();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No Event found" });
        }
        res.status(200).json({ events });
    }catch(error){
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = EventController;
