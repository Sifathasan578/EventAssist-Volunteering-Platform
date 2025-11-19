import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
    const navigate = useNavigate();

    const handleJoinTeam = () => {
        if (team.team_type === "Public") {
            navigate("/team_dashboard", { state: { team_id: team.team_id } });
        } else {
            alert("This is a private team!");
        }
    };

    return (
        <div className="bg-white p-5  shadow-lg hover:shadow-2xl cursor-pointer text-center bg-opacity-30 w-[100%]">
            <img
                src={`https://picsum.photos/500/300?random=${Math.floor(Math.random() * 1000)}`}
                alt="Random Post"
                className="mt-3 w-full h-56 object-cover shadow-md"
            />
            <h3 className="text-lg font-semibold mt-3">{team.team_name}</h3>
            <h3 className="text-lg font-semibold my-3">{team.team_type}</h3>
            <p className="text-gray-500 text-sm">{team.team_description}</p>
            <button
                className="px-4 py-2 mt-4 bg-black text-red-500 rounded-lg shadow-md hover:bg-white hover:text-black"
                onClick={handleJoinTeam}
            >
                Join Team
            </button>
        </div>
    );
};

export default TeamCard;
