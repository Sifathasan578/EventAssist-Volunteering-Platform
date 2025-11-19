import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

export default function TeamForm() {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(type,name,description);

        if (!type && !name && description) {
            alert("Fill All");
            return;
        }

        const userData = {
            type,
            name,
            description,
        };
        // console.log("user data is ", userData);

        try {
            const response = await fetch("http://localhost:5000/api/teams/add_teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Adding successful!");
                navigate("/");
            } else {
                alert(data.message || "Adding failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
        }
        navigate("/");
    };

    return (
        <>
            {/* <Header /> */}
            <div
                className="relative flex justify-center items-center h-screen bg-[#080710] bg-cover bg-center"
                style={{ backgroundImage: "url('/volunteerCover1.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="relative w-96 h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                    {/* Background Gradient Circles
                    <div className="absolute w-48 h-48 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full -top-10 -left-10 opacity-10 z-0"></div>
                    <div className="absolute w-48 h-48 bg-gradient-to-r from-red-500 to-orange-400 rounded-full -bottom-10 -right-10 opacity-10 z-0"></div> */}

                    <h3 className="text-red-500 text-2xl font-semibold text-center">
                        Form Your Team
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <>
                            <label className="text-red-500 font-medium mt-4 block">Team Type</label>
                            <select
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black placeholder-black"
                                value={type}
                                onChange={handleTypeChange}
                            >
                                <option value="">Select Privacy</option>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>

                            <label className="text-red-500 font-medium">Team Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Team Name"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black placeholder-black"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <label className="text-red-500 font-medium">Team Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Team Description"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-black placeholder-black"
                                value={description}
                                onChange={handleDescriptionChange}
                            />

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600"
                                >
                                    Go!!
                                </button>
                            </div>
                        </>
                    </form>
                </div>
            </div>
        </>
    );
}
