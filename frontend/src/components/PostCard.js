import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
    const navigate = useNavigate();

    const onPostClick = () => {
    navigate(`/help_post_details/${post.req_id}`, {
        state: { post_id: post.req_id, description: post.description }
    });
};


    return (
        <div
            className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:scale-105 bg-opacity-30"
            onClick={onPostClick}
        >
            <div className="flex items-center mb-3">
                <div className="bg-gray-300 w-12 h-12 rounded-full mr-4"></div>{" "}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.description}</p>
                </div>
                <h2 className="ml-auto text-right text-xl font-bold">{post.urgency}</h2>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
                <span>10 mins ago</span>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <span>Read More</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
