import React from "react";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import TeamCard from "../../components/TeamCard";

const TeamsPage = () => {
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/teams/get_teams", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched Event data:", data);
                    setTeams(data.teams || []);
                } else {
                    console.error("Failed to fetch Events");
                }
            } catch (error) {
                console.error("Error events history:", error);
            }
        };

        fetchTeams();
    }, []);


    return (
        <div className="min-h-screen bg-gray-400">
            <header className="bg-black text-red-500 text-center py-6 text-2xl font-bold shadow-lg">
                Teams All-Over Country
            </header>

            <div className="flex justify-center space-x-4 py-6">
                <button
                    onClick={(e) => {
                        navigate("/leaderboard");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-black"
                >
                    Leaderboard
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-black">
                    Invitations
                </button>
                <button
                    onClick={(e) => {
                        navigate("/add_teams");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-black"
                >
                    Form Team
                </button>
                <button
                    onClick={(e) => {
                        navigate("/team_private");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-black"
                >
                    Private Teams
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                {teams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
};

export default TeamsPage;
