import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const AddHistoryPage = () => {
    const [eventName, setEventName] = useState("");
    const [contributedHours, setContributedHours] = useState("");
    const navigate = useNavigate();
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Volunteering Data:", { eventName, contributedHours });
        console.log("Token is ", localStorage.getItem("token"));

        const historyData = {
            event_name: eventName,
            total_hours: parseInt(contributedHours, 10),
        };
        console.log("historeData is ",historyData);

        try {
            const res = await fetch("http://localhost:5000/api/users/volunteering-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(historyData),
            });

            if (res.ok) {
                alert("Volunteering history added successfully!");
                navigate("/profile");
            } else {
                const data = await res.json();
                alert(data.message || "Failed to add history.");
            }
        } catch (error) {
            console.error("Error adding history:", error);
        }
    };
    

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen bg-[#080710]">
                <div className="relative w-96 h-[420px] p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                    <h3 className="text-white text-2xl font-semibold text-center">
                        Add Volunteering History
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-6">
                        <label className="text-white font-medium">Event Name</label>
                        <input
                            type="text"
                            placeholder="Enter Event Name"
                            className="w-full mt-2 p-3 bg-white/20 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />

                        <label className="text-white font-medium mt-4 block">
                            Contributed Hours
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Hours"
                            className="w-full mt-2 p-3 bg-white/20 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={contributedHours}
                            onChange={(e) => setContributedHours(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="w-full mt-6 bg-white text-[#080710] p-3 text-lg font-semibold rounded-md hover:bg-gray-200 transition"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddHistoryPage;
