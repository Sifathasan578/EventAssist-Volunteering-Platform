import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [historyData, setHistoryData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalhours, setTotalHours] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users/volunteering-history", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched history data:", data);
                    setHistoryData(data.history?.volunteeringHistory || []);
                    setEventData(data.history?.eventDetails || []);
                } else {
                    console.error("Failed to fetch history");
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched user data:", data);
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchHistory();
        fetchUserData();
    }, []);

    useEffect(() => {
        let totalHistoryHours = historyData.reduce((acc, item) => acc + item.total_hours, 0);
        let totalEventHours = eventData.reduce((acc, item) => acc + item.total_hours_rounded, 0);

        const totalhours = totalEventHours + totalHistoryHours;
        setTotalHours(totalhours);

        const points = totalhours * 5;
        setTotalPoints(points);

        const updateUserPoints = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const res = await fetch("http://localhost:5000/api/users/update_points", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ totalPoints: points }),
                });

                if (res.ok) {
                    console.log("User points updated successfully");
                } else {
                    const errorData = await res.json();
                    console.error("Failed to update user points", errorData);
                }
            } catch (error) {
                console.error("Error updating user points:", error);
            }
        };

        if (totalhours > 0) {
            updateUserPoints();
        }
    }, [historyData, eventData]);

    return (
        <>
            <div className="p-4 bg-gray-400 min-h-screen">
                <div className="bg-gray-200 rounded-lg p-6 shadow-lg  w-[90%] mx-auto">
                    <form>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/4 text-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                    alt="Profile"
                                    className="w-3/4 h-auto rounded-full mx-auto"
                                />
                                <label className="block mt-4">
                                    <span className="inline-block px-4 py-2 bg-black text-white rounded cursor-pointer">
                                        Change Photo
                                    </span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>

                            <div className="w-full mt-12 md:w-2/4">
                                <h5 className="text-black text-xl font-semibold">
                                    {userData ? userData.user.full_name : "Loading..."}
                                </h5>
                                <h6 className="text-blue-600 text-lg font-medium">
                                    {userData ? userData.user.email : ""}
                                </h6>
                            </div>
                            <Link to="/edit_userProfile" state={{ userData: userData?.user }}>
                                <button className="bg-black mt-20 h-10 text-white px-4 py-2 rounded-lg">
                                    Edit Profile
                                </button>
                            </Link>
                            <Link
                                to="/reward"
                                state={{
                                    userName: userData?.user?.full_name ?? "Guest",
                                    totalHour: totalhours ?? 0,
                                }}
                            >
                                <button className="bg-black ml-2 mt-20 h-10 text-white px-4 py-2 rounded-lg">
                                    Certificate
                                </button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap mt-8">
                            <div className="mx-auto w-full md:w-3/4">
                                <div className="border-t pt-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Name
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.full_name : "Loading..."}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Email
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.email : "Loading..."}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Age
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.age : "Loading..."}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Gender
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.gender : "Loading..."}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Skills
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.skills : "Loading..."}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="text-gray-700 font-semibold">
                                                Causes
                                            </label>
                                            <p className="text-blue-600">
                                                {userData ? userData.user.causes : "Loading..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="bg-[#828282] w-[90%] mx-auto mt-12 p-6 shadow-lg text-white rounded-lg">
                        <div className="flex justify-between items-center">
                            <button
                                className="bg-black text-white px-4 py-2 rounded-lg"
                                onClick={() => navigate("/add_history")}
                            >
                                Add History
                            </button>
                            <h1>Logged Hours: {totalhours}</h1>
                            <h1>Total points: {totalPoints}</h1>
                        </div>

                        {historyData.length > 0 || eventData.length > 0 ? (
                            <div className="text-white text-sm mt-4 p-3 bg-gray-700/50 rounded-md">
                                <h4 className="text-lg font-semibold">
                                    Your Volunteering History:
                                </h4>
                                <ul className="mt-2">
                                    {historyData.map((item, index) => (
                                        <li key={index} className="mt-1">
                                            {item.event_name} - {item.total_hours} hours
                                        </li>
                                    ))}
                                    {eventData.map((event, index) => (
                                        <li key={index} className="mt-1">
                                            {event.event_name} - {event.total_hours_rounded} hours
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <h2 className="text-white text-2xl font-semibold text-center">
                                No Volunteering History
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
