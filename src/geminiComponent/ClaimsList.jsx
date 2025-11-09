import React, { useEffect, useState } from "react";

const ClaimsGrid = () => {
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]);

  // Load users.json once on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/users.json`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  // Load claims from localStorage on mount
  useEffect(() => {
    const storedClaims = JSON.parse(localStorage.getItem("claimRequests")) || [];
    setClaims(storedClaims);
  }, []);

  // Helper: find user name by userId
  const getUserName = (userId) => {
    const user = users.find((u) => String(u.id) === String(userId));
    return user ? user.name : `User ${userId}`;
  };

  const updateClaimStatus = (id, newStatus) => {
    const updatedClaims = claims.map((claim) =>
      claim.claimId === id ? { ...claim, status: newStatus } : claim
    );
    setClaims(updatedClaims);
    localStorage.setItem("claimRequests", JSON.stringify(updatedClaims));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Claim Requests ({claims.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Claim ID",
                "Booking ID",
                "User Name",
                "Service Date",
                "Document",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim.claimId} className="hover:bg-indigo-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.claimId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {getUserName(claim.userId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(claim.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline cursor-pointer">
                    {claim.claimDocument}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        claim.status || "Pending"
                      )}`}
                    >
                      {claim.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {(!claim.status || claim.status === "Pending") ? (
                      <>
                        <button
                          onClick={() =>
                            updateClaimStatus(claim.claimId, "Approved")
                          }
                          className="text-green-600 hover:text-green-900 transition duration-150 p-1 rounded-full hover:bg-green-100"
                          title="Approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateClaimStatus(claim.claimId, "Rejected")
                          }
                          className="text-red-600 hover:text-red-900 transition duration-150 p-1 rounded-full hover:bg-red-100"
                          title="Reject"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">Action Complete</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No claim requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsGrid;
