import React from "react";
import { useLocation } from "react-router-dom"; 

const Certificate = () => {
    const location = useLocation();
    const { userName, totalHour } = location.state || {};
    // fix the level
    const getCertificateLevel = (totalHour) => {
        if (totalHour >= 100) return "Platinum";
        if (totalHour >= 50) return "Gold";
        if (totalHour >= 20) return "Silver";
        return "Bronze";
    };

    const certificateLevel = getCertificateLevel(totalHour);

    const handlePrint = () => {
        if (totalHour < 20) {
            alert("You need at least 20 hours to receive a certificate.");
            return;
        }
        window.print();
    };

    return (
        <div className="h-screen flex bg-gray-400 flex-col items-center p-10">
            {/* If hours are less than 20, no certificate we will provide */}
            {totalHour < 20 ? (
                <div className="text-center">
                    <h2 className="text-2xl text-red-600 font-bold">Certificate Not Available</h2>
                    <p className="text-lg mt-4">
                        You need at least 20 hours to receive a certificate.
                    </p>
                </div>
            ) : (
                <div
                    className="w-[600px] h-[400px] border-4 border-yellow-500 bg-white text-center shadow-lg rounded-lg p-10"
                    id="certificate"
                >
                    <h1 className="text-3xl font-bold text-gray-800">Certificate of Achievement</h1>
                    <p className="text-lg mt-4">This is awarded to</p>
                    <h2 className="text-2xl font-semibold text-blue-600 mt-2">{userName}</h2>
                    <p className="text-lg mt-4">
                        For successfully completing{" "}
                        <span className="font-bold">{totalHour} hours</span> of learning.
                    </p>
                    <p className="text-lg mt-4">
                        You have achieved the{" "}
                        <span className="text-yellow-600 font-bold">{certificateLevel} Level</span>.
                    </p>
                    <div className="mt-10">
                        <p className="text-sm text-gray-500">
                            Issued on: {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-3xl text-red-500 font-bold">RoBenDevs</p>
                    </div>
                </div>
            )}

            <button
                onClick={handlePrint}
                className="mt-6 px-5 py-2 bg-red-500 text-black rounded-lg"
                disabled={totalHour < 20}
            >
                {totalHour < 20 ? "Not Eligible" : "Download Certificate"}
            </button>
        </div>
    );
};

export default Certificate;
