import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

const SpecialtyBookingChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("teleBookings")) || [];

        // Group by specialty
        const specialtyCounts = {};

        stored.forEach((b) => {
            if (!b.specialty) return;

            const key = b.specialty.trim();
            if (!specialtyCounts[key]) {
                specialtyCounts[key] = { specialty: key, bookings: 0 };
            }

            specialtyCounts[key].bookings += 1;
        });

        // Convert to array and sort by booking count (descending)
        const sorted = Object.values(specialtyCounts).sort(
            (a, b) => b.bookings - a.bookings
        );

        setData(sorted);
    }, []);

    return (
        <div className="bg-white rounded-xl p-4">
            {/* <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Bookings by Specialty
            </h3> */}

            <div className="flex justify-between items-center mb-4">
                {/* <h2 className="text-lg font-semibold text-gray-800">
                    Quarterly Service Utilization Trend
                </h2> */}
                {/* <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
                    Total Claims: 
                </span> */}
                <h3 className="text-xl font-bold mb-4 text-gray-800">Quarterly Service Utilization Trend</h3>
            </div>

            {data.length > 0 ? (
                <div className="h-64">
                {/* <ResponsiveContainer width={500} height={200}> */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="specialty" angle={-20} textAnchor="end" height={60} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="bookings"
                            fill="#4F46E5"
                            name="Total Teleconsults"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    No booking data available for visualization
                </div>
            )}
        </div>
    );
};

export default SpecialtyBookingChart;
