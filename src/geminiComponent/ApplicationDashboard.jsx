import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Stethoscope, UserCog, User } from "lucide-react";

const ApplicationDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Admin Portal",
      description: "Manage users, clinicians, and care plan approvals.",
      icon: <UserCog className="w-12 h-12 text-indigo-600" />,
      path: "/admin",
      color: "from-indigo-500 to-blue-700",
    },
    {
      title: "Client Portal",
      description: "Access organization analytics, reports, and compliance data.",
      icon: <Users className="w-12 h-12 text-green-600" />,
      path: "/client",
      color: "from-green-500 to-emerald-700",
    },
    {
      title: "Clinician Portal",
      description: "View patients, consultations, and EMR integrations.",
      icon: <Stethoscope className="w-12 h-12 text-sky-600" />,
      path: "/clinician",
      color: "from-sky-500 to-cyan-700",
    },
    {
      title: "Member Portal",
      description: "Track your vitals, consultations, and care plans.",
      icon: <User className="w-12 h-12 text-amber-600" />,
      path: "/member",
      color: "from-amber-500 to-orange-700",
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-10"
      style={{
        background:
          "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        Digital Health & RPM Dashboard
      </h1>
      <p className="text-gray-200 mb-12 text-lg">
        Choose a portal to manage or access your digital health services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-3xl transform transition-all duration-300 border-t-4 bg-gradient-to-br ${card.color}`}
          >
            <div className="bg-white p-4 rounded-full shadow-lg mb-4">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {card.title}
            </h3>
            <p className="text-gray-100 text-sm max-w-xs">{card.description}</p>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-gray-300 text-sm">
        © 2025 Digital Health RPM Platform
      </footer>
    </div>
  );
};

export default ApplicationDashboard;
