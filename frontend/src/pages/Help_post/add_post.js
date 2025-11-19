import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AddPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgency, setUrgency] = useState("");

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleUrgencyChange = (e) => {
        setUrgency(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            description,
            urgency,
        };
        console.log("Post data is ", postData);

        try {
            const response = await fetch("http://localhost:5000/api/helpPost/create_post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Post added successfully!");
                navigate("/community_help_post"); // Navigate to the posts page after successful post addition
            } else {
                alert(data.message || "Post addition failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during post submission:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-600">
                <div className="sticky top-0 bg-gray-400 p-4 flex justify-between items-center z-10 shadow-lg">
                    <h1 className="mx-auto text-2xl font-semibold text-black">Add a Post</h1>
                </div>

                <div className="flex justify-center items-center h-screen backdrop-blur-md bg-white/10 border border-white/20">
                    <div className="relative w-[50%] h-auto mt-6 mb-6 p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="text-red-500 text-2xl font-semibold text-center">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter your title"
                                    className="w-full mt-2 p-3 bg-gray-300 text-gray-800 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div>
                                <label className="text-red-500 text-2xl font-semibold text-center">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Enter a description"
                                    className="w-full mt-2 p-3 bg-gray-300 text-gray-800 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                            <div>
                                <label className="text-red-500 text-2xl font-semibold text-center">
                                    Urgency
                                </label>
                                <select
                                    className="w-full mt-2 p-3 bg-gray-300 text-gray-800 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    value={urgency}
                                    onChange={handleUrgencyChange}
                                >
                                    <option value="">Select Urgency</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Not Necessary">Not Necessary</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 m-auto"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
