import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({event}) => {
    const [isModalOpenForJoin, setIsModalOpenForJoin] = useState(false);
    const [isModalOpenForLeave, setIsModalOpenForLeave] = useState(false);
    const [joined, setJoined] = useState(false);
    // const [leave, setLeave] = useState(false);
    const navigate = useNavigate();

    const onClick = (e) => {
        const decission = e.target.textContent;
        if(decission === "Join Event"){
            setIsModalOpenForJoin(true);
            setJoined(true);
        }
        else{
            setIsModalOpenForLeave(true);
            setJoined(false);
        }
        
    };
    const closeModalForJoin = () => {
        setIsModalOpenForJoin(false);
        navigate("/events"); 
    };
    const closeModalForLeave = () => {
        setIsModalOpenForLeave(false);
        navigate("/events"); 
    }
    console.log(event);
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl w-full sm:w-[45%] md:w-[30%] cursor-pointer bg-opacity-30">
            <img
                src={`https://picsum.photos/500/300?random=${Math.floor(Math.random() * 1000)}`}
                alt="Random Post"
                className="mt-3 w-full h-56 object-cover shadow-md"
            />

            <div className="mb-3 mt-3">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>

            <div className="text-gray-700 text-sm space-y-2">
                <div className="flex items-center">
                    <span className="font-semibold">📅 Date:</span>
                    <span className="ml-2">
                        {event.event_date && !isNaN(new Date(event.event_date).getTime())
                            ? new Date(event.event_date).toISOString().split("T")[0]
                            : "No date available"}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">⏰ Time:</span>
                    <span className="ml-2">
                        {event.start_time} - {event.end_time}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">📍 Location:</span>
                    <span className="ml-2">{event.location}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">🏷️ Category:</span>
                    <span className="ml-2">{event.category}</span>
                </div>
            </div>

            <div className="flex justify-between text-gray-500 text-xs mt-3">
                <span>Posted 10 mins ago</span>
            </div>
            <div className="flex justify-center mt-3">
                <button
                    onClick={onClick}
                    className="bg-black text-white py-2 px-4 font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    {joined ? "Leave Event" : "Join Event"}
                </button>
            </div>
            {isModalOpenForJoin && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-black p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold text-red-500">
                            Successfully joined the Event!
                        </h2>
                        <p className="mt-4 text-white">Email will be sent.</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModalForJoin}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpenForLeave && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-black p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold text-red-500">
                            Successfully Left the Event!
                        </h2>
                        <p className="mt-4 text-white">Email will be sent.</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModalForLeave}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCard;
