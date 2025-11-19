import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/signup"); 
    };

    return (
        <div
            className="relative bg-cover bg-center h-auto flex justify-center"
            style={{ backgroundImage: "url(/volunteering.jpg)" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white bg-opacity-90">
                <h1 className="text-4xl font-bold text-gray-900">
                    Hands<span className="text-red-500">ON</span>
                </h1>

                <div className="flex space-x-6 items-center">
                    <div className="text-black hover:text-black transform transition-transform duration-200 hover:scale-110">
                        <a href="/events">Events</a>
                    </div>
                    <div className="text-black hover:text-black transform transition-transform duration-200 hover:scale-110">
                        <a href="/www.linkedin.com">Linkedin</a>
                    </div>
                    <div className="text-black hover:text-black transform transition-transform duration-200 hover:scale-110">
                        <a href="/www.github.com">Github</a>
                    </div>
                    <div className="text-black hover:text-black transform transition-transform duration-200 hover:scale-110">
                        <a href="/profile">Profile</a>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-black hover:text-black transform transition-transform duration-200 hover:scale-110"
                    >
                        <Link to="/signup">Logout</Link>
                    </button>

                    <button onClick={() => navigate("/profile")}>
                        <img
                            src="https://i.pravatar.cc/50"
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full border-2 border-blue-500"
                        />
                    </button>
                </div>
            </div>

            <div className="mb-8 flex flex-row justify-center items-center h-screen space-x-6 px-6">
                <div
                    onClick={() => {
                        navigate("/community_help_post");
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-user text-4xl text-red-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Community Posts</h3>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate("/events");
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-home text-4xl text-red-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Events</h3>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate("/teams");
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-users text-4xl text-red-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Teams</h3>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate("/leaderboard_user");
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-rocket text-4xl text-red-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Leaderboard</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute flex-center bottom-0 w-[90%] bg-red-500 shadow-lg rounded-t-3xl py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-black">70+</h3>
                        <p className="text-black font-semibold">Countries</p>
                        <p className="text-black">
                            More than 70 countries are connected with this platform.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-black">15000+</h3>
                        <p className="text-black font-semibold">Active Volunteers</p>
                        <p className="text-black">
                            Active 15k volunteers across the world are contributing.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-black">6000+</h3>
                        <p className="text-black font-semibold">Events</p>
                        <p className="text-black">
                            Events are successfully done by the active volunteers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
