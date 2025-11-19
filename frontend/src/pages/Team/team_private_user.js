import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateTeams = () => {
    const [privateTeams, setPrivateTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleJoinTeam = (teamId) => {
        navigate("/team_dashboard", { state: { team_id: teamId } });
    };

    useEffect(() => {
        const fetchPrivateTeams = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/teams/see_private_teams", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch teams");
                }

                const data = await response.json();
                setPrivateTeams(data.privateTeams);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrivateTeams();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-400 min-h-screen">
            <h2 className="bg-gray-200 p-5 shadow-lg text-center text-4xl font-bold rounded-xl">
                Your Private Teams
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {privateTeams.map((team) => (
                    <div
                        key={team.team_id}
                        onClick={() => handleJoinTeam(team.team_id)}
                        className="bg-gray-200 p-6 rounded-xl shadow-lg text-center hover:shadow-2xl cursor-pointer"
                    >
                        <h3 className="text-xl font-semibold">{team.team_name}</h3>
                        <p className="mt-2 text-gray-600">{team.team_description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivateTeams;
