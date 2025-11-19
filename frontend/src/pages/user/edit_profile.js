import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const location = useLocation();
    const user = location.state?.userData || {};

    const [fullName, setFullName] = useState(user.full_name || "");
    const [email, setEmail] = useState(user.email || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [causes, setCauses] = useState(user.causes || "");

    useEffect(() => {
        console.log("Received User Data:", user);
    }, [user]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { fullName, email, age, gender, skills, causes };

        try {
            const res = await fetch("http://localhost:5000/api/users/edit_profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                navigate("/profile");
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div
            className="py-6 flex justify-center items-center min-h-screen bg-[#080710] bg-cover bg-center"
            style={{ backgroundImage: "url('/volunteerCover1.jpg')" }}
        >
            <div className="fixed inset-0 bg-black bg-opacity-70"></div>
            <div className="relative w-96 h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                <h3 className="text-red-500 text-2xl font-semibold text-center">Edit Profile</h3>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className="text-red-500 font-medium">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <label className="text-red-500 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <label className="text-red-500 font-medium">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <label className="text-red-500 font-medium">Gender</label>
                    <input
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Gender"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <label className="text-red-500 font-medium">Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Skills"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <label className="text-red-500 font-medium">Causes</label>
                    <input
                        type="text"
                        value={causes}
                        onChange={(e) => setCauses(e.target.value)}
                        placeholder="Causes"
                        className="mt-2 mb-2 w-full p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                    />

                    <button
                        type="submit"
                        className="w-full mt-6 bg-black text-red-500 p-3 text-lg font-semibold rounded-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
