import React from "react";

const TeamLeaderboard = ({ topTeams, otherTeams }) => {
    return (
        <div>
            <div className="p-6 bg-gray-400 min-h-screen">
                {topTeams && topTeams.length > 0 && (
                    <>
                        <h2 className="bg-white p-5  shadow-lg hover:shadow-2xl cursor-pointer text-center bg-opacity-30 w-[100%] relative bg-white p-6 rounded-xl shadow-lg text-center text-4xl p-6 font-bold">
                            Leader Board
                        </h2>
                        <h2 className="mt-6 text-2xl text-center flex justify-center items-center font-bold mb-4">
                            Top 3 Teams Of The Month
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {topTeams.map((Team) => (
                                <div
                                    key={Team.id}
                                    className="bg-white p-5  shadow-lg hover:shadow-2xl cursor-pointer text-center bg-opacity-30 w-[100%] relative bg-white p-6 rounded-xl shadow-lg text-center"
                                >
                                    <div
                                        className={`absolute top-0 right-0 px-3 py-1 text-white text-sm font-bold rounded-bl-lg ${Team.ribbonColor}`}
                                    >
                                        {Team.position}
                                    </div>
                                    <img
                                        src="https://i.pravatar.cc/50"
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full border-2 border-blue-500 mx-auto"
                                    />
                                    <h3 className="text-lg font-semibold mt-3">{Team.name}</h3>

                                    <p className="mt-2 text-sm text-gray-600">
                                        Working Time:{" "}
                                        <span className="font-semibold">{Team.workingTime}</span>
                                    </p>
                                    <div className="flex justify-between mt-3 text-sm text-gray-700">
                                        <p>
                                            Accuracy:{" "}
                                            <span className="font-semibold">{Team.accuracy}</span>
                                        </p>
                                        <p>
                                            Aesthetic:{" "}
                                            <span className="font-semibold">{Team.aesthetic}</span>
                                        </p>
                                    </div>
                                    <p className="mt-3 font-bold text-lg">{Team.points} Points</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                ​<h2 className="text-2xl font-bold mb-4">Teams</h2>
                <div className="bg-white p-5  shadow-lg hover:shadow-2xl cursor-pointer text-center bg-opacity-30 w-[100%] relative bg-white p-6 rounded-xl shadow-lg text-center">
                    {otherTeams.map((Team) => (
                        <div
                            key={Team.id}
                            className="flex items-center justify-between border-b last:border-0 py-3 text-gray-700 "
                        >
                            <div className="flex items-center space-x-3 ">
                                <img
                                    src="https://i.pravatar.cc/50"
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                                />
                                <p className="font-semibold">
                                    #{Team.id} {Team.name}
                                </p>
                            </div>
                            <p className="font-bold">{Team.points} Points</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamLeaderboard;
