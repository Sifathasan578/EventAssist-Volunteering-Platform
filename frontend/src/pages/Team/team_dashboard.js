import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const TeamDashboard = () => {
    const location = useLocation();
    const team_id = location.state?.team_id;
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/teams/see_events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ team_id: team_id }),
                });
                // console.log("Team is is ", team_id);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data.events || []);
                    console.log("-- is ", data.events);
                } else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        const fetchMembers = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/teams/see_members", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ team_id: team_id }),
                });
                // console.log("Team iD is ", team_id);
                if (res.ok) {
                    const data = await res.json();
                    setMembers(data.members || []);
                    // console.log("-- is === ", data.members);
                } else {
                    console.error("Failed to fetch members");
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchEvents();
        fetchMembers();
    }, [team_id]);

    return (
        <div className="min-h-screen bg-gray-400 p-6">
            <header className="bg-black text-red-500 text-center py-6 text-2xl font-bold shadow-lg">
                Team Dashboard
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-red-500">🏆 Total Events</h3>
                    <p className="text-2xl font-semibold">{events.length}</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-red-500">👥 Total Members</h3>
                    <p className="text-2xl font-semibold">{members.length}</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-red-500">🎯 Team Score</h3>
                    <p className="text-2xl font-semibold">1200</p>
                </div>
            </div>

            <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold text-black mb-4">📅 Team Events</h2>
                {events.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                        {events.map((event) => (
                            <li key={event.event_id} className="text-lg">
                                {event.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No events found for this team.</p>
                )}
            </div>

            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-black mb-4">👥 Team Members</h2>
                {members.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                        {members.map((member) => (
                            <li key={member.id} className="text-lg">
                                {member.full_name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No members found in this team.</p>
                )}
            </div>
        </div>
    );
};

export default TeamDashboard;
