import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PostCardDetails() {
    const location = useLocation();
    const { post_id, description } = location.state || {};
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (post_id) {
            fetchComments();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post_id]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/helpPost/getComments/${post_id}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments);
            } else {
                console.error("Failed to fetch comments.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/helpPost/submitComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    post_id,
                    comment,
                }),
            });

            if (res.ok) {
                setComment("");
                fetchComments(); // Refresh comments after submitting
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("An error occurred while submitting the comment.");
        }
    };

    return (
        <div className="bg-gray-400 p-6">
            <div
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl w-[90%] m-auto 
                cursor-pointer bg-opacity-30"
            >
                <div>
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://i.pravatar.cc/50"
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full border-2 border-blue-500"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">John Doe</h3>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-gray-800 text-lg leading-relaxed">{description}</p>
                        <img
                            src={`https://picsum.photos/500/300?random=${Math.floor(
                                Math.random() * 1000
                            )}`}
                            alt="Random Post"
                            className="mt-3 w-full h-56 object-cover rounded-xl shadow-md"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4 text-gray-600">
                        <button className="flex items-center space-x-2 text-lg hover:text-red-500 transition-all">
                            ❤️ <span className="font-semibold">12</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg hover:text-blue-500 transition-all">
                            💬 <span className="font-semibold">{comments.length}</span>
                        </button>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                            className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={handleCommentSubmit}
                            className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Submit Comment
                        </button>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
                        {comments.length === 0 ? (
                            <p className="text-gray-500 mt-2">No comments yet.</p>
                        ) : (
                            <div className="space-y-4 mt-3">
                                {comments.map((cmt) => (
                                    <div
                                        key={cmt._id}
                                        className="bg-blue-100 p-3 rounded-lg shadow-sm"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src="https://i.pravatar.cc/40"
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full border"
                                            />
                                            <div>
                                                <h4 className="text-sm font-semibold">
                                                    {cmt.full_name || "Anonymous"}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {cmt.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
