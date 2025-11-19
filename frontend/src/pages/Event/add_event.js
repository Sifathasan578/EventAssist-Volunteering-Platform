import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function AddEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, description, eventDate, startTime, endTime, location, category };

        try {
            const response = await fetch("http://localhost:5000/api/event/add_event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });
            const data = await response.json();

            if (response.ok) {
                alert("Event created successfully!");
                navigate("/events");
            } else {
                alert(data.message || "Event creation failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <Header />
            <div className="relative flex justify-center items-center h-auto bg-[#080710] bg-cover bg-center">
                <div className="relative w-[50%] h-auto mt-6 mb-6 p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                    <h3 className="text-red-500 text-2xl font-semibold text-center">
                        Create Event
                    </h3>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <label className="text-red-500 font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="text-red-500 font-medium mt-4 block">Description</label>
                        <textarea
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={100}
                        ></textarea>
                        <label className="text-red-500 font-medium mt-4 block">Event Date</label>
                        <input
                            type="date"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                        <label className="text-red-500 font-medium mt-4 block">Start Time</label>
                        <input
                            type="time"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <label className="text-red-500 font-medium mt-4 block">End Time</label>
                        <input
                            type="time"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />

                        <div className="mt-6">
                            <label className="text-red-500 font-medium">Location</label>
                            <input
                                type="text"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <label className="text-red-500 font-medium mt-4 block">Category</label>
                            <input
                                type="text"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
