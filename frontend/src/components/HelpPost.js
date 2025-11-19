import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const HelpPost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/helpPost/getPosts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched history data:", data);
                    setPosts(data.posts || []);//////////////////////
                } else {
                    console.error("Failed to fetch history");
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };  
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-400">
            <div className="sticky top-0 bg-black p-4 flex justify-between items-center z-10 shadow-lg">
                <h1 className="text-2xl font-semibold text-red-500">Contribute to the Community</h1>
                <button
                    onClick={() => navigate("/add_post")}
                    className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
                >
                    Add Request
                </button>
            </div>

            <div className="p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h2>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpPost;
