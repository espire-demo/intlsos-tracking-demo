import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClaimsSubmissionTrend = () => {
  const [chartData, setChartData] = useState([]);
  const [totalClaims, setTotalClaims] = useState(0);

  // Generate monthly claims & total
  const generateMonthlyClaims = () => {
    const claims = JSON.parse(localStorage.getItem("claimRequests")) || [];

    const monthly = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      claims: claims.filter(
        (c) => new Date(c.createdAt).getMonth() === i
      ).length,
    }));

    setChartData(monthly);
    setTotalClaims(claims.length);
  };

  useEffect(() => {
    generateMonthlyClaims();

    const handleStorageChange = (e) => {
      if (e.key === "claimRequests") generateMonthlyClaims();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("claims-updated", generateMonthlyClaims);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("claims-updated", generateMonthlyClaims);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Claims Submission Trend
        </h2>
        <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
          Total Claims: {totalClaims}
        </span>
      </div>

      {chartData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No claims submitted yet.
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width={650} height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="claims" fill="#4F46E5" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ClaimsSubmissionTrend;
