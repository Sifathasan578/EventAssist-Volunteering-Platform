import React, { useEffect, useState } from "react";

function LeaderBoardUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/sorted_by_points", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }); 
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-gray-200 min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">🏆 Leaderboard 🏆</h2>

            <div className="w-full max-w-3xl bg-gray-400 p-6 shadow-lg rounded-xl">
                {users.length > 0 ? (
                    <ul>
                        {users.map((user, index) => (
                            <li
                                key={user.id}
                                className="flex items-center justify-between border-b last:border-0 py-3"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-lg font-semibold">{index + 1}.</span>
                                    <img
                                        src={`https://i.pravatar.cc/50?img=${index + 1}`} // Random avatar
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                                    />
                                    <span className="font-medium text-gray-700">
                                        {user.full_name}
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-blue-600">
                                    {user.points} pts
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center">Loading users...</p>
                )}
            </div>
        </div>
    );
}

export default LeaderBoardUser;
