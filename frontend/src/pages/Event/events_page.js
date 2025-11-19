import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";

const EventPage = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");
    const [filteredEvents, setFilteredEvents ] = useState([]);

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocationFilter(e.target.value);
    }
    const handleAvailabilityChange = (e) => {
        setAvailabilityFilter(e.target.value);
    };
    const makeFilter = () => {
        const filtered = events.filter((event) => {
            const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
            const matchesLocation = locationFilter ? event.location === locationFilter : true;
            const matchesAvailability = availabilityFilter
                ? event.availability === availabilityFilter
                : true;

            return matchesCategory && matchesLocation && matchesAvailability;
        });

        setFilteredEvents(filtered);
    };


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/event/get_events", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched Event data:", data);
                    setEvents(data.events || []); 
                } else {
                    console.error("Failed to fetch Events");
                }
            } catch (error) {
                console.error("Error events history:", error);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        makeFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryFilter, locationFilter, availabilityFilter, events]);

    return (
        <>
            {/* <Header /> */}
            <div>
                <div className="min-h-screen bg-gray-400">
                    <div className="sticky top-0 bg-black p-4 flex justify-between items-center z-10 shadow-lg">
                        <h1 className="text-2xl font-semibold text-red-500  ">
                            Contribute to the Community
                        </h1>
                        <button
                            onClick={() => navigate("/add_event")}
                            className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
                        >
                            Add Event
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <h2 className="text-center text-3xl font-bold text-black mb-4">
                            Recent Events
                        </h2>
                        <h2 className="text-center text-xl font-bold text-black mt-6">
                            Filter Searches
                        </h2>
                        <div className="flex justify-center">
                            <select
                                value={categoryFilter}
                                onChange={handleCategoryChange}
                                className="px-4 py-2 bg-red-500 outline-none"
                            >
                                <option value="">Select Category</option>
                                <option value="Sports">Sports</option>
                                <option value="Music">Music</option>
                                <option value="Art">Art</option>
                                <option value="Tech">Tech</option>
                            </select>

                            <select
                                value={locationFilter}
                                onChange={handleLocationChange}
                                className="px-4 py-2  bg-red-500 outline-none"
                            >
                                <option value="">Select Location</option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Chicago">Chicago</option>
                            </select>

                            <select
                                value={availabilityFilter}
                                onChange={handleAvailabilityChange}
                                className="px-4 py-2  bg-red-500 outline-none"
                            >
                                <option value="">Availability</option>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            {filteredEvents.map((event) => (
                                <EventCard event={event} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventPage;
