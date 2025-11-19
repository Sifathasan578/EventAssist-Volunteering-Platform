import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
        navigate("/dashboard");
    }
    const closeModal2 = () => {
        setIsModalOpen2(!isModalOpen2);
        setEmail("");
        setPassword("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Data:", { email, password });
        const userData = {
            email,
            password,
        };
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            console.log("Token is ", data.token);

            if (res.ok) {
                setIsModalOpen(true);
                localStorage.setItem("token", data.token);
            } else {
                setIsModalOpen2(true);
            }
        } catch (error) {
            console.error("Not fetched ", error);
        }
        // navigate("/");
    };

    return (
        <>
            <div
                className="relative flex justify-center items-center h-screen bg-[#080710] bg-cover bg-center"
                style={{ backgroundImage: "url('/volunteerCover1.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="relative w-96 h-[520px] p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                    <h3 className="text-red-500 text-2xl font-semibold text-center">Login Here</h3>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <label className="text-red-500 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <label className="text-red-500 font-medium mt-4 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <button
                            type="submit"
                            className="w-full mt-6 bg-black text-red-500 p-3 text-lg font-semibold rounded-md"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="flex justify-center gap-4 mt-6">
                        <div className="w-32 bg-white/20 text-black text-center py-2 rounded-md cursor-pointer hover:bg-white/30 transition">
                            <i className="fab fa-google mr-2"></i>Google
                        </div>
                        <div className="w-32 bg-white/20 text-black text-center py-2 rounded-md cursor-pointer hover:bg-white/30 transition">
                            <i className="fab fa-facebook mr-2"></i>Facebook
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        <p className="text-white z-10">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-black p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-xl font-semibold text-green-500">
                                Successfully Logged In !!
                            </h2>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isModalOpen2 && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-black p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-xl font-semibold text-red-500">
                                Opps! Log In Failed!
                            </h2>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeModal2}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginPage;
