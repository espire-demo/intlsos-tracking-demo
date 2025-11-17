import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Phone, Calendar, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentGateway from "./paymentgateway";

// --- Icon Definitions (Inline SVGs to maintain Single File Mandate) ---
const HomeIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
const PhoneCallIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.04-6.04 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const FileTextIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>);
const BookOpenIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>);
const HeartPulseIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.4 12.2a2.3 2.3 0 0 0 0 3.3l1.8 1.8a2 2 0 0 1 0 2.8l-1.8 1.8a2 2 0 0 1-2.8 0l-1.8-1.8a2.3 2.3 0 0 0-3.3 0l-1.8 1.8a2 2 0 0 1-2.8 0l-1.8-1.8a2.3 2.3 0 0 0-3.3 0l-1.8 1.8a2 2 0 0 1-2.8 0l-1.8-1.8a2.3 2.3 0 0 0 0-3.3l1.8-1.8a2 2 0 0 1 2.8 0l1.8 1.8a2.3 2.3 0 0 0 3.3 0l1.8-1.8a2 2 0 0 1 2.8 0l1.8 1.8a2.3 2.3 0 0 0 3.3 0z" /><path d="m18 14-1.4-1.4c-.4-.4-.7-.4-1 0L12 15l-2.6-2.6c-.4-.4-.7-.4-1 0L7 14" /><path d="M6 18c-3 0-4-2-4-4" /></svg>);
const UsersIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const ShieldCheckIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>);
const AwardIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" /></svg>);
// --- Utility Components ---

const Panel = ({ children, title, icon: Icon, className = "" }) => (
  <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      {Icon && <Icon className="w-6 h-6 mr-3 text-indigo-500" />}
      {title}
    </h2>
    <div className="border-t border-gray-100 pt-4">
      {children}
    </div>
  </div>
);

const Button = ({ children, onClick, primary = true, disabled = false, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-center py-3 px-6 rounded-xl font-semibold transition duration-200 shadow-md transform active:scale-[0.99]
      ${primary
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300'
      }
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      ${className}
    `}
  >
    {children}
  </button>
);

// --- Feature Components (Content for Tabs) ---

/**
 * Tab 1: Home/PHR (Personal Health Record)
 * Shows a quick overview, confirmations, and RPM vitals summary.
 */
const PHR = ({ rpmData, telehealthConfirmation, user }) => {

  // Helper: convert date + timeSlot → Date object
  const getBookingDateTime = (b) => {
    try {
      const [time, modifier] = b.timeSlot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return new Date(
        `${b.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
      );
    } catch {
      return new Date(0); // fallback to epoch if invalid
    }
  };

  return (
    <div className="space-y-8">
      <Panel
        title={`Welcome Back, ${user?.name || 'Member'}`}
        icon={HomeIcon}
        className="bg-indigo-50"
      >
        <p className="text-gray-600 mb-4">
          Your personalized health hub. Quick glance at your essential health stats and recent activity.
        </p>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* 🩺 Last Teleconsultation */}
          {(() => {

            const userId = user?.id; // 🔹 get current logged-in user ID
            const allBookings = JSON.parse(localStorage.getItem("teleBookings")) || [];
            // 🔹 Filter only this user's bookings
            const bookings = allBookings.filter(b => b.userId === userId);

            if (bookings.length === 0) {
              return (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-200">
                  <p className="text-sm text-gray-500">Last Teleconsultation</p>
                  <p className="text-xl font-bold text-gray-400">No Data</p>
                </div>
              );
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0); // midnight for "today" comparison

            // Filter for only past bookings (before today) and get the latest one
            const pastBookings = bookings
              .map((b) => ({ ...b, dateTime: getBookingDateTime(b) }))
              .filter((b) => b.dateTime < today)
              .sort((a, b) => b.dateTime - a.dateTime);

            const latest = pastBookings[0] || null;

            let displayText = "No Data";
            if (latest) {
              const bookingDate = new Date(getBookingDateTime(latest));
              const bookingLocal = new Date(bookingDate);
              bookingLocal.setHours(0, 0, 0, 0);

              // Calculate day difference based on calendar days
              const diffDays = Math.floor(
                (today - bookingLocal) / (1000 * 60 * 60 * 24)
              );

              // Format display
              displayText =
                diffDays === 0
                  ? "Today"
                  : diffDays === 1
                    ? "1 Day Ago"
                    : diffDays > 1
                      ? `${diffDays} Days Ago`
                      : "No Data";
            }

            // const bookingDate = new Date(getBookingDateTime(latest));
            // const bookingLocal = new Date(bookingDate);
            // bookingLocal.setHours(0, 0, 0, 0);

            // // Calculate day difference based on calendar days
            // const diffDays = Math.floor(
            //   (today - bookingLocal) / (1000 * 60 * 60 * 24)
            // );

            // // Format display
            // const displayText =
            //   diffDays === 0
            //     ? "Today"
            //     : diffDays === 1
            //       ? "1 Day Ago"
            //       : diffDays > 1 ? `${diffDays} Days Ago` : "No Data";

            return (
              <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-200">
                <p className="text-sm text-gray-500">Last Teleconsultation</p>
                <p className="text-xl font-bold text-indigo-600">{displayText}</p>
                <p className="text-xs text-gray-500 mt-1">

                  {displayText !== "No Data" && (() => {
                    try {
                      const [time, modifier] = latest.timeSlot.split(" ");
                      let [hours, minutes] = time.split(":").map(Number);

                      if (modifier === "PM" && hours !== 12) hours += 12;
                      if (modifier === "AM" && hours === 12) hours = 0;

                      const combined = new Date(
                        `${latest.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
                      );

                      return combined.toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      });
                    } catch (e) {
                      return "Invalid Date";
                    }
                  })()}

                </p>
              </div>
            );
          })()}

          {/* Health Score */}
          <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-200">
            <p className="text-sm text-gray-500">Health Score</p>
            <p className="text-xl font-bold text-green-600">88/100</p>
          </div>

          {/* Rewards */}
          <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-200">
            <p className="text-sm text-gray-500">Rewards Points</p>
            <p className="text-xl font-bold text-yellow-600">450</p>
          </div>
        </div>
      </Panel>

      {/* <Panel title="Recent Consultations" icon={PhoneCallIcon}>
      {(() => {
        const userId = user?.id; // get current logged-in user ID
        const allBookings = JSON.parse(localStorage.getItem("teleBookings")) || [];

        // Filter only this user's bookings
        const bookings = allBookings.filter(b => b.userId === userId);

        if (bookings.length > 0) {
          return (
            <div className="space-y-4">
              {bookings
                .slice(-5) // show last 5 bookings
                .reverse() // newest first
                .map((b, i) => (
                  <div
                    key={i}
                    className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg text-green-800"
                  >
                    <h3 className="font-semibold">Consultation Confirmed!</h3>
                    <p className="text-sm">
                      {b.specialty} —{" "}
                      {(() => {
                        try {
                          const [time, modifier] = b.timeSlot.split(" ");
                          let [hours, minutes] = time.split(":").map(Number);
                          if (modifier === "PM" && hours !== 12) hours += 12;
                          if (modifier === "AM" && hours === 12) hours = 0;

                          // Combine date + time into one Date object
                          const combined = new Date(
                            `${b.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
                          );

                          return combined.toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          });
                        } catch (e) {
                          return "Invalid Date";
                        }
                      })()}

                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Booked on {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          );
        } else {
          return (
            <p className="text-gray-500">
              No recent teleconsultations confirmed in your PHR. Book one today!
            </p>
          );
        }
      })()}
    </Panel> */}

      <Panel title="Recent Consultations" icon={PhoneCallIcon}>
        {(() => {
          const userId = user?.id;
          const allBookings = JSON.parse(localStorage.getItem("teleBookings")) || [];

          // Helper function to combine date + timeSlot into a single Date object
          const getBookingDateTime = (b) => {
            try {
              const [time, modifier] = b.timeSlot.split(" ");
              let [hours, minutes] = time.split(":").map(Number);
              if (modifier === "PM" && hours !== 12) hours += 12;
              if (modifier === "AM" && hours === 12) hours = 0;
              return new Date(
                `${b.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
              );
            } catch {
              return new Date(0); // fallback if invalid
            }
          };

          const now = new Date();

          // Filter by user and past consultations
          const bookings = allBookings
            .filter((b) => b.userId === userId)
            .map((b) => ({ ...b, dateTime: getBookingDateTime(b) }))
            .filter((b) => b.dateTime < now) // only before now
            .sort((a, b) => b.dateTime - a.dateTime); // newest first

          if (bookings.length > 0) {
            return (
              <div className="space-y-4">
                {bookings.slice(0, 5).map((b, i) => (
                  <div
                    key={i}
                    className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg text-green-800"
                  >
                    <h3 className="font-semibold">Consultation Completed</h3>
                    <p className="text-sm">
                      {b.specialty} —{" "}
                      {b.dateTime.toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Booked on {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <p className="text-gray-500">
                No past teleconsultations found in your PHR. Book one today!
              </p>
            );
          }
        })()}
      </Panel>

      {/* EMR/Partner Data Sync (PHR Requirement) */}
      <Panel title="Synchronized Health Record" icon={ShieldCheckIcon}>
        <p className="text-sm text-gray-500 mb-2">Data synced from your EMR and partner wellness apps.</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Last medication update (EMR Sync): **Amlodipine** (Oct 20, 2025)</li>
          <li>Wellness Coaching Task (Partner App Sync): **Module 3 complete** (Yesterday)</li>
        </ul>
      </Panel>

      {/* RPM Vitals Summary */}
      <Panel title="Remote Patient Monitoring Summary" icon={HeartPulseIcon}>
        <div className="grid grid-cols-2 gap-4">
          {rpmData.map((data, index) => (
            <div key={index} className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">{data.label}</p>
              <p className="text-2xl font-bold text-blue-600">{data.value}</p>
              <p className="text-xs text-gray-400">Target: {data.target}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};

/**
 * Tab 2: Teleconsultation Booking
 */
const Teleconsultation = ({ setTelehealthConfirmation, user }) => {
  const [specialty, setSpecialty] = useState("General Practitioner");
  const [consultType, setConsultType] = useState("Audio Consultation");
  const [clinician, setClinician] = useState({ id: "", name: "" });
  const [timeSlot, setTimeSlot] = useState("");
  const [paymentType, setPaymentType] = useState("cashless");
  const [isBooked, setIsBooked] = useState(false);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [clinicians, setClinicians] = useState([]);
  const [conditions, setConditions] = useState([]); // list of available conditions
  const [condition, setCondition] = useState("");   // selected condition
  const [showPayment, setShowPayment] = useState(false);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [userId] = useState(user.id);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
    "11:30 AM", "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM",
    "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const specialties = [
    "General Practitioner", "Cardiology", "Dermatology", "Pediatrics",
    "Orthopedics", "Neurology"
  ];

  // Load clinicians.json once on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/clinicians.json`)
      .then((res) => res.json())
      .then((data) => setClinicians(data))
      .catch((err) => console.error("Failed to load clinicians:", err));
  }, []);

  // Load previous bookings
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("teleBookings")) || [];
    setPreviousBookings(storedBookings);
  }, [isBooked]);

  // Load dynamic care plan conditions
  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem("carePlans")) || [];
    const uniqueConditions = [...new Set(storedPlans.map(p => p.title))];
    setConditions(uniqueConditions);
  }, []);

  const resetForm = () => {
    setIsBooked(false);
    setSpecialty("General Practitioner");
    setClinician({ id: "", name: "" });
    setConsultType("Audio Consultation");
    setPaymentType("cashless");
    setTimeSlot("");
    setCondition("");
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  };

  const handleConfirmBooking = () => {
    if (!clinician.id) {
      alert("Please select a clinician");
      return;
    }
    if (!timeSlot) {
      alert("Please select a time slot");
      return;
    }

    const bookingId = `BOOK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newBooking = {
      bookingId,
      userId,
      specialty,
      clinicianId: clinician.id,
      clinician: clinician.name,
      consultType,
      paymentType,
      date,
      timeSlot,
      condition,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("teleBookings")) || [];
    existing.push(newBooking);
    localStorage.setItem("teleBookings", JSON.stringify(existing));

    const confirmationMsg = `Booking Confirmed!\n\nSpecialty: ${specialty}\nClinician: ${clinician.name}\nType: ${consultType}\nPayment: ${paymentType}\nDate: ${new Date(date).toLocaleDateString()}\nTime: ${timeSlot}`;
    setTelehealthConfirmation(confirmationMsg);
    setIsBooked(true);

    setShowPayment(true);

  };

  // Filter clinicians by specialty
  const filteredClinicians = clinicians.filter(
    (doc) => doc.specialty === specialty
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Appointment Bookings Panel */}
        <Panel>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Appointment Bookings
              </h2>
            </div>

            <button
              onClick={() => {
                setShowBookingPanel(true);
                resetForm();
              }}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Add New
            </button>
          </div>

          {previousBookings.length === 0 ? (
            <p className="text-gray-500 italic">No previous bookings found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800 font-semibold">
                  <tr>
                    <th className="px-4 py-2 text-left">Booking ID</th>
                    <th className="px-4 py-2 text-left">Specialty</th>
                    <th className="px-4 py-2 text-left">Condition</th>
                    <th className="px-4 py-2 text-left">Clinician</th>
                    <th className="px-4 py-2 text-left">Consultation Type</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBookings
                    .filter((b) => b.userId === userId)
                    .reverse()
                    .map((b, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2">{b.bookingId}</td>
                        <td className="px-4 py-2">{b.specialty}</td>
                        <td className="px-4 py-2">{b.condition}</td>
                        <td className="px-4 py-2">
                          {b.clinician}{" "}
                          <span className="text-xs text-gray-500">
                            ({b.clinicianId})
                          </span>
                        </td>
                        <td className="px-4 py-2">{b.consultType}</td>
                        <td className="px-4 py-2">
                          {new Date(b.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">{b.timeSlot}</td>
                        <td className="px-4 py-2 capitalize">{b.paymentType}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        {/* Booking Form */}
        {showBookingPanel && (
          <Panel>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Book a consultation
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowBookingPanel(false);
                  resetForm();
                }}
                className="flex items-center gap-1 border border-gray-300 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
              >
                ✕ Close
              </button>
            </div>

            {!isBooked ? (
              <div className="space-y-4">
                {/* Specialty */}
                <label className="block">
                  <span className="text-gray-700 font-medium">Specialty</span>
                  <select
                    value={specialty}
                    onChange={(e) => {
                      setSpecialty(e.target.value);
                      setClinician({ id: "", name: "" });
                    }}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map((sp, i) => (
                      <option key={i} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Condition Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((cond, index) => (
                      <option key={index} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clinician Dropdown */}
                {filteredClinicians.length > 0 && (
                  <label className="block">
                    <span className="text-gray-700 font-medium">Clinician</span>
                    <select
                      value={clinician.id}
                      onChange={(e) => {
                        const selected = filteredClinicians.find(
                          (doc) => doc.id === e.target.value
                        );
                        setClinician(selected || { id: "", name: "" });
                      }}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
                    >
                      <option value="">Select Clinician</option>
                      {filteredClinicians.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.id})
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {/* Consultation Type */}
                <label className="block">
                  <span className="text-gray-700 font-medium">
                    Consultation Type
                  </span>
                  <select
                    value={consultType}
                    onChange={(e) => setConsultType(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
                  >
                    <option value="Audio Consultation">
                      Audio Consultation
                    </option>
                    <option value="Video Consultation">
                      Video Consultation
                    </option>
                  </select>
                </label>

                {/* Date Picker */}
                <label className="block">
                  <span className="text-gray-700 font-medium">Preferred Date:</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTimeSlot("");
                    }}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </label>

                {/* Time Slots */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Available Time Slots:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${timeSlot === slot
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                          }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Payment Type
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="cashless"
                        checked={paymentType === "cashless"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">Cashless</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="non-cashless"
                        checked={paymentType === "non-cashless"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">Non-Cashless</span>
                    </label>
                  </div>
                </div>

                <Button onClick={handleConfirmBooking}>Confirm Booking</Button>

              </div>
            ) : (
              <div className="text-center p-8 bg-green-50 border border-green-300 rounded-lg">
                <ShieldCheckIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-700">Success!</h3>
                <p className="text-green-800 font-medium">
                  Your appointment is confirmed and saved.
                </p>
                <Button primary={false} onClick={resetForm} className="mt-4">
                  Book Another
                </Button>
              </div>
            )}
          </Panel>
        )}

        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-3xl h-[95vh] bg-white rounded-xl shadow-xl overflow-y-auto relative">

              {/* Close button */}
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
              >
                ×
              </button>

              <PaymentGateway />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Tab 3: Claims and Reports
 * Includes Health Check deeplink, Reimbursement claim, and Lab Digitization.
 */
const ClaimsAndReports = ({ setClaimRequestConfirmation, user }) => {
  const [isClaimSubmit, setIsClaimSubmit] = useState(false);
  const [labReportFile, setLabReportFile] = useState(null);
  const [digitizationStatus, setDigitizationStatus] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [claimDocument, setClaimDocumentFile] = useState(null);
  const [claimDocumentStatus, setClaimDocumentStatus] = useState(null);

  const userId = user?.id || "";

  // Default to current date/time
  const [serviceDate, setServiceDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const resetServiceDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setServiceDate(now.toISOString().slice(0, 16));
  };

  // Helper function to combine date + timeSlot into a Date object
  const getBookingDateTime = (b) => {
    try {
      const [time, modifier] = b.timeSlot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return new Date(
        `${b.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
      );
    } catch {
      return new Date(0); // fallback if parsing fails
    }
  };


  // // Load user bookings from localStorage
  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("teleBookings")) || [];

  //   // Filter by user ID and payment type
  //   const userBookings = stored.filter(
  //     (b) => b.userId === user.id && b.paymentType?.toLowerCase() === "non-cashless"
  //   );
  //   setBookings(userBookings);
  // }, [user.id]);

  // Load user bookings from localStorage (only past non-cashless ones)
  useEffect(() => {

    const stored = JSON.parse(localStorage.getItem("teleBookings")) || [];
    const now = new Date();

    // Filter by user ID, payment type, and past date/time
    const userBookings = stored.filter((b) => {
      if (b.userId !== user.id) return false;
      if (b.paymentType?.toLowerCase() !== "non-cashless") return false;

      const bookingDateTime = getBookingDateTime(b);
      return bookingDateTime < now; // only bookings before current time
    });

    setBookings(userBookings);
  }, [user.id]);


  // Update serviceDate when a booking is selected
  useEffect(() => {
    if (!selectedBookingId) return;

    const selected = bookings.find((b) => b.bookingId === selectedBookingId);
    if (!selected) return;

    try {
      const [time, modifier] = selected.timeSlot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const combined = new Date(
        `${selected.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
      );
      combined.setMinutes(combined.getMinutes() - combined.getTimezoneOffset());
      setServiceDate(combined.toISOString().slice(0, 16));
    } catch (err) {
      console.error("Error parsing date/time:", err);
    }
  }, [selectedBookingId, bookings]);

  // --- File upload handlers ---
  const handleFileChange = (e) => {
    setLabReportFile(e.target.files[0]);
    setDigitizationStatus(null);
  };

  const handleClaimFileUpload = (e) => {
    setClaimDocumentFile(e.target.files[0]);
    setClaimDocumentStatus(null);
  };

  // --- Digitization mock ---
  const handleDigitization = () => {
    if (!labReportFile) {
      setDigitizationStatus({
        type: "error",
        message: "Please upload a file first.",
      });
      return;
    }

    setDigitizationStatus({
      type: "loading",
      message: "Analyzing report for digitization...",
    });

    setTimeout(() => {
      setDigitizationStatus({
        type: "success",
        message: `Successfully digitized ${labReportFile.name}. Key metrics are awaiting approval in your PHR.`,
      });
      setLabReportFile(null);
    }, 2500);
  };

  // --- Claim submission ---
  // const handleSubmitClaim = () => {
  //   if (!selectedBookingId) {
  //     setClaimDocumentStatus({
  //       type: "error",
  //       message: "Please select a booking before submitting.",
  //     });
  //     return;
  //   }

  //   if (!claimDocument) {
  //     setClaimDocumentStatus({
  //       type: "error",
  //       message: "Please upload claim support document.",
  //     });
  //     return;
  //   }

  //   const newClaimRequest = {
  //     bookingId: selectedBookingId,
  //     userId,
  //     serviceDate,
  //     claimDocument: claimDocument.name,
  //     createdAt: new Date().toISOString(),
  //   };

  //   try {
  //     const existingClaims =
  //       JSON.parse(localStorage.getItem("claimRequests")) || [];

  //     // prevent duplicate claims for same booking
  //     const duplicate = existingClaims.some(
  //       (c) => c.bookingId === selectedBookingId
  //     );

  //     if (duplicate) {
  //       setClaimDocumentStatus({
  //         type: "error",
  //         message: "A claim for this booking already exists.",
  //       });
  //       return;
  //     }

  //     existingClaims.push(newClaimRequest);
  //     localStorage.setItem("claimRequests", JSON.stringify(existingClaims));

  //     setIsClaimSubmit(true);
  //     const formattedDate = new Date(serviceDate).toLocaleString([], {
  //       dateStyle: "medium",
  //       timeStyle: "short",
  //     });

  //     const confirmationMsg = `Claim request submitted for booking **${selectedBookingId}** on ${formattedDate}.`;
  //     setClaimRequestConfirmation(confirmationMsg);

  //   } catch (error) {
  //     console.error("Error saving claim:", error);
  //     setClaimDocumentStatus({
  //       type: "error",
  //       message: "Error saving claim. Please try again.",
  //     });
  //   }
  // };

  const handleSubmitClaim = () => {
    if (!selectedBookingId) {
      setClaimDocumentStatus({
        type: "error",
        message: "Please select a booking before submitting.",
      });
      return;
    }

    if (!claimDocument) {
      setClaimDocumentStatus({
        type: "error",
        message: "Please upload claim support document.",
      });
      return;
    }

    try {
      const existingClaims =
        JSON.parse(localStorage.getItem("claimRequests")) || [];

      // prevent duplicate claims for same booking
      const duplicate = existingClaims.some(
        (c) => c.bookingId === selectedBookingId
      );

      if (duplicate) {
        setClaimDocumentStatus({
          type: "error",
          message: "A claim for this booking already exists.",
        });
        return;
      }

      //Auto-generate a unique claimId
      const newClaimId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;

      const newClaimRequest = {
        claimId: newClaimId, // <-- added here
        bookingId: selectedBookingId,
        userId,
        serviceDate,
        claimDocument: claimDocument.name,
        createdAt: new Date().toISOString(),
        status: "Pending", // optional default
      };

      existingClaims.push(newClaimRequest);
      localStorage.setItem("claimRequests", JSON.stringify(existingClaims));

      setIsClaimSubmit(true);

      const formattedDate = new Date(serviceDate).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const confirmationMsg = `Claim **${newClaimId}** submitted for booking **${selectedBookingId}** on ${formattedDate}.`;
      setClaimRequestConfirmation(confirmationMsg);
      setClaimDocumentStatus({
        type: "success",
        message: "Claim submitted successfully!",
      });
    } catch (error) {
      console.error("Error saving claim:", error);
      setClaimDocumentStatus({
        type: "error",
        message: "Error saving claim. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* --- Cashless Health Check --- */}
      <Panel title="Cashless Health Check" icon={ShieldCheckIcon}>
        <p className="text-gray-600 mb-4">
          Complete your Health Check cashless using your GOP/voucher benefit via
          our partner app.
        </p>
        <Button
          onClick={() =>
            console.log("Mock Deep-linking to Partner Health App with Voucher/SSO")
          }
          className="!bg-purple-600 hover:!bg-purple-700 focus:ring-purple-300"
        >
          Access Partner Health Check (Deep-link)
        </Button>
      </Panel>

      {/* --- Submit Claim --- */}
      <Panel title="Submit Out-of-Network Claim" icon={FileTextIcon}>
        <p className="text-gray-600 mb-4">
          Submit a claim for services paid out-of-pocket.
        </p>

        {isClaimSubmit ? (
          <div className="text-center p-8 bg-green-50 border border-green-300 rounded-lg">
            <ShieldCheckIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-700">Success!</h3>
            <p className="text-green-800 font-medium">
              Your claim request has been submitted.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Check your PHR tab for details.
            </p>
            <Button
              primary={false}
              onClick={() => {
                setIsClaimSubmit(false);
                setClaimDocumentFile(null);
                setClaimDocumentStatus(null);
                setSelectedBookingId("");
                resetServiceDate();
              }}
              className="mt-4"
            >
              Submit Another Claim
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Booking selection */}
            <select
              value={selectedBookingId}
              onChange={(e) => {
                setSelectedBookingId(e.target.value);
                setClaimDocumentStatus(null);
              }}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
            >
              <option value="">Select Booking</option>
              {bookings.map((b) => (
                <option key={b.bookingId} value={b.bookingId}>
                  {b.bookingId} | {b.specialty} | {b.clinician}
                </option>
              ))}
            </select>

            {/* Service date */}
            <input
              type="datetime-local"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50"
              disabled
            />

            {/* Upload claim document */}
            <div className="border border-dashed border-gray-300 p-6 rounded-lg text-left mb-4">
              <label
                htmlFor="claimFile"
                className="inline-flex items-center justify-center cursor-pointer bg-indigo-50 text-indigo-700 font-semibold text-sm px-4 py-2 rounded-md hover:bg-indigo-100 transition-all"
              >
                Upload claim support document
              </label>
              <input
                id="claimFile"
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleClaimFileUpload}
                className="hidden"
              />
              {claimDocument && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected:{" "}
                  <span className="font-medium">{claimDocument.name}</span>
                </p>
              )}
              {claimDocumentStatus?.type === "error" && (
                <div className="p-3 bg-red-100 rounded-lg text-sm text-red-800 font-medium">
                  {claimDocumentStatus.message}
                </div>
              )}
            </div>

            <Button onClick={handleSubmitClaim}>Submit Claim Documents</Button>
          </div>
        )}
      </Panel>

      {/* --- Submitted Claims List --- */}
      <Panel title="Submitted Claims" icon={FileTextIcon}>
        <p className="text-gray-600 mb-4">
          View all your previously submitted out-of-network claims.
        </p>

        {(() => {
          const storedClaims = JSON.parse(localStorage.getItem("claimRequests")) || [];
          const userClaims = storedClaims.filter((c) => c.userId === userId);

          if (userClaims.length === 0) {
            return (
              <p className="text-gray-500 italic">
                No claim submissions found.
              </p>
            );
          }

          return (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800 font-semibold">
                  <tr>
                    <th className="px-4 py-2 text-left">Claim ID</th>
                    <th className="px-4 py-2 text-left">Booking ID</th>
                    <th className="px-4 py-2 text-left">Service Date</th>
                    <th className="px-4 py-2 text-left">Document</th>
                    <th className="px-4 py-2 text-left">Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {userClaims
                    .slice()
                    .reverse()
                    .map((c, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 font-medium">{c.claimId}</td>
                        <td className="px-4 py-2 font-medium">{c.bookingId}</td>
                        <td className="px-4 py-2">
                          {new Date(c.serviceDate).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="px-4 py-2">{c.claimDocument}</td>
                        <td className="px-4 py-2">
                          {new Date(c.createdAt).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        })()}
      </Panel>


      {/* --- Lab Report Auto-Digitization --- */}
      <Panel title="Lab Report Auto-Digitization" icon={BookOpenIcon}>
        <p className="text-gray-600 mb-4">
          Native ability to auto-digitize lab reports with governance workflows.
        </p>
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center mb-4">
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {labReportFile && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: <strong>{labReportFile.name}</strong>
            </p>
          )}
        </div>

        {/* Status messages */}
        {digitizationStatus && (
          <div
            className={`p-3 rounded-lg text-sm font-medium ${digitizationStatus.type === "success"
              ? "bg-green-100 text-green-800"
              : digitizationStatus.type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800 flex items-center"
              }`}
          >
            {digitizationStatus.type === "loading" && (
              <span className="animate-spin mr-2">⚙️</span>
            )}
            {digitizationStatus.message}
          </div>
        )}

        <Button
          onClick={handleDigitization}
          disabled={!labReportFile || digitizationStatus?.type === "loading"}
        >
          Digitize Report & Sync to PHR
        </Button>
      </Panel>
    </div>
  );
};

/**
 * Tab 4: Programs & Wellness
 * Includes service selection and deep-linking/SSO to EMR or partner modules.
 */
const ProgramsAndWellness = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    { id: 'nutrition', name: 'Personalized Nutrition Plan', partner: 'Partner App', action: 'Update dietary log' },
    { id: 'insurance', name: 'Insurance Top-Up Management', partner: 'Insurance Portal', action: 'Confirm top-up' },
    { id: 'chronic', name: 'Chronic Disease Management', partner: 'EMR System', action: 'Update health record' },
  ];

  const handleDeepLink = (program) => {
    setSelectedProgram(program);
    // Mock the deep-linking and SSO process
    console.log(`Deep-linking to ${program.partner} with SSO for ${program.name}`);

    // Mock success and data flow back
    setTimeout(() => {
      alert(`Success! Action completed in ${program.partner}. Data (${program.action}) synced back to your PHR.`);
      setSelectedProgram(null);
    }, 1500);
  };

  return (
    <Panel title="Select Programs and Services" icon={BookOpenIcon}>
      <p className="text-gray-600 mb-6">Access your curated wellness programs and benefits. Seamless SSO integration ensures no re-login is required.</p>

      <div className="space-y-4">
        {programs.map((program) => (
          <div key={program.id} className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-gray-50">
            <div>
              <p className="font-semibold text-gray-800">{program.name}</p>
              <p className="text-sm text-indigo-500">Via: {program.partner}</p>
            </div>
            <Button
              onClick={() => handleDeepLink(program)}
              primary={false}
              disabled={selectedProgram !== null}
              className="w-auto px-4 py-2 text-sm !bg-indigo-100 !text-indigo-700 hover:!bg-indigo-200"
            >
              Access & {program.action}
            </Button>
          </div>
        ))}
      </div>

      {selectedProgram && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
          <p className="font-semibold">Initiating SSO Deep-link...</p>
          <p className="text-sm">You are being seamlessly redirected to the **{selectedProgram.partner}** to complete your action. Data sync back is expected.</p>
        </div>
      )}
    </Panel>
  );
};

/**
 * Tab 5: RPM - Remote Patient Monitoring
 */

const RPM = ({ user }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolled2, setIsEnrolled2] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const userId = user?.id;

  // --- Load saved enrollment state from localStorage ---
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("rpmCare")) || [];
    const existingUser = existing.find((c) => c.userId === userId);

    if (existingUser) {
      setIsEnrolled(existingUser.isEnrolled || false);
      setIsEnrolled2(existingUser.isEnrolled2 || false);
    }
  }, [userId]);

  // --- Save to localStorage whenever enrollment changes ---
  const saveEnrolled = (updates) => {
    const existing = JSON.parse(localStorage.getItem("rpmCare")) || [];
    const existingUser = existing.find((c) => c.userId === userId);

    const newRpmCareEnroll = {
      userId,
      isEnrolled: updates.isEnrolled ?? existingUser?.isEnrolled ?? false,
      isEnrolled2: updates.isEnrolled2 ?? existingUser?.isEnrolled2 ?? false,
      updatedAt: new Date().toISOString(),
    };

    const updated = existingUser
      ? existing.map((c) => (c.userId === userId ? newRpmCareEnroll : c))
      : [...existing, newRpmCareEnroll];

    localStorage.setItem("rpmCare", JSON.stringify(updated));
  };

  // --- Handle enrollment actions ---
  const handleEnroll1 = () => {
    setIsEnrolled(true);
    saveEnrolled({ isEnrolled: true });
  };

  const handleEnroll2 = () => {
    setIsEnrolled2(true);
    saveEnrolled({ isEnrolled2: true });
  };

  return (
    <div className="space-y-8">
      {/* RPM Header */}
      <Panel title="Remote Patient Monitoring (RPM)" icon={HeartPulseIcon}>
        <p className="text-gray-600">
          Enroll in a personalized care plan and track your progress with integrated devices.
        </p>

        {/* --- Enrollment Sections --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              RPM Care Plan - 1 Enrollment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enrollment into personalized RPM care plan - 1.
            </p>
            <Button
              onClick={handleEnroll1}
              disabled={isEnrolled}
              primary={!isEnrolled}
              className={`w-full py-2 rounded-lg font-medium transition-all ${isEnrolled
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {isEnrolled ? "Enrolled in Diabetes Plan" : "Enroll Now"}
            </Button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              RPM Care Plan - 2 Enrollment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enrollment into personalized RPM care plan - 2.
            </p>
            <Button
              onClick={handleEnroll2}
              disabled={isEnrolled2}
              primary={!isEnrolled2}
              className={`w-full py-2 rounded-lg font-medium transition-all ${isEnrolled2
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {isEnrolled2
                ? "Enrolled in Medication Adherence Plan"
                : "Enroll Now"}
            </Button>
          </div>
        </div>

        {/* <div className="border p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-lg mb-2">RPM Care Plan - 1 Enrollment</h3>
          <p className="text-sm text-gray-500 mb-3">
            Enrollment into personalized RPM care plan - 1.
          </p>
          <Button
            onClick={handleEnroll1}
            disabled={isEnrolled}
            primary={!isEnrolled}
          >
            {isEnrolled ? "Enrolled in Diabetes Plan" : "Enroll Now"}
          </Button>
        </div>

        <div className="border p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-lg mb-2">RPM Care Plan - 2 Enrollment</h3>
          <p className="text-sm text-gray-500 mb-3">
            Enrollment into personalized RPM care plan - 2.
          </p>
          <Button
            onClick={handleEnroll2}
            disabled={isEnrolled2}
            primary={!isEnrolled2}
          >
            {isEnrolled2
              ? "Enrolled in Medication Adherence Plan"
              : "Enroll Now"}
          </Button>
        </div> */}

        {/* --- Connected Devices --- */}
        <div className="border rounded-2xl p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Connected Devices
          </h3>

          {/* Fitness Tracker */}
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
                <i className="fas fa-watch text-xl"></i>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Fitness Tracker 2.0</p>
                <p className="text-xs text-gray-500">Last Sync: 5 minutes ago</p>
              </div>
            </div>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Connected
            </span>
          </div>

          {/* Smart Scale */}
          <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                <i className="fas fa-weight text-xl"></i>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Smart Scale</p>
                <p className="text-xs text-gray-400">Last Sync: 3 days ago</p>
              </div>
            </div>
            <span className="text-xs font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full">
              Inactive
            </span>
          </div>

          {/* Add New Device */}
          <Button
            className="w-full text-center py-3 rounded-xl bg-indigo-50 text-indigo-600 font-semibold hover:bg-indigo-100 transition"
            onClick={() => setDeviceConnected(!deviceConnected)}
            primary={!deviceConnected}
          >
            {deviceConnected ? "Disconnect" : "Connect Device"}
          </Button>
        </div>
      </Panel>

      {/* --- Vitals & Adherence Tracking Panels --- */}
      {(isEnrolled || isEnrolled2) && (
        <Panel
          title="Vitals & Adherence Tracking"
          icon={HeartPulseIcon}
          className="bg-blue-50"
        >
          <h3 className="font-semibold text-lg mb-2">Tracking & Care Progress</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tracking of vitals, adherence, and care progress to goals.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Blood Pressure</p>
              <p className="text-2xl font-bold text-blue-600">125/80 mmHg</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Glucose (CGM)</p>
              <p className="text-2xl font-bold text-blue-600">110 mg/dL</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Medication Adherence</p>
              <p className="text-2xl font-bold text-green-600">95%</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Goal Progress</p>
              <p className="text-2xl font-bold text-indigo-600">80% Complete</p>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
};

/**
 * Tab 6: Consent, Gamification & Profile
 */
const ConsentAndGamification = ({ user }) => {
  const [allowHR, setAllowHR] = useState(false);
  const [allowClinical, setAllowClinical] = useState(false);
  const userId = user?.id;

  const rewards = [
    { title: 'Bronze Tier', points: 0, required: 0, icon: '🥉' },
    { title: 'Silver Tier', points: 450, required: 500, icon: '🥈' },
    { title: 'Gold Tier', points: 0, required: 1500, icon: '🥇' },
  ];

  // Load stored consent for this user on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("consentChanges")) || [];
    const found = stored.find((c) => c.userId === userId);
    if (found) {
      if (typeof found.allowHR === "boolean") setAllowHR(found.allowHR);
      if (typeof found.allowClinical === "boolean") setAllowClinical(found.allowClinical);
    }
  }, [userId]);

  // Helper: Save updated consent object for this user
  const saveConsent = (updates) => {
    const existing = JSON.parse(localStorage.getItem("consentChanges")) || [];
    const existingUser = existing.find((c) => c.userId === userId);

    const newConsent = {
      userId,
      allowHR: updates.allowHR ?? existingUser?.allowHR ?? false,
      allowClinical: updates.allowClinical ?? existingUser?.allowClinical ?? false,
      updatedAt: new Date().toISOString(),
    };

    const updated = existingUser
      ? existing.map((c) => (c.userId === userId ? newConsent : c))
      : [...existing, newConsent];

    localStorage.setItem("consentChanges", JSON.stringify(updated));
  };

  // Handlers
  const handleHRChange = (val) => {
    setAllowHR(val);
    saveConsent({ allowHR: val });
  };

  const handleClinicalChange = (val) => {
    setAllowClinical(val);
    saveConsent({ allowClinical: val });
  };

  return (
    <div className="space-y-8">
      {/* Consent Management */}
      <Panel title="Consent Management" icon={UsersIcon}>
        <p className="text-gray-600 mb-4">Manage who can see your health data.</p>

        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm transition duration-150">
          <p className="font-semibold text-gray-700">
            Allow HR to see Wellness Data (Steps, Diet, Challenges):
          </p>

          <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="consent-toggle"
              checked={allowHR}
              onChange={() => handleHRChange(!allowHR)}
              className="toggle-checkbox absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="consent-toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${allowHR ? 'bg-green-400' : 'bg-gray-300'
                }`}
            ></label>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {allowHR
            ? 'HR can view wellness data. Clinical history remains private.'
            : 'HR cannot view any wellness data.'}
        </p>

        <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm transition duration-150">
          <p className="font-semibold text-gray-700">
            Allow Clinical to see Wellness Data and Clinical history:
          </p>

          <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="clinical-consent-toggle"
              checked={allowClinical}
              onChange={() => handleClinicalChange(!allowClinical)}
              className="toggle-checkbox absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="clinical-consent-toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${allowClinical ? 'bg-green-400' : 'bg-gray-300'
                }`}
            ></label>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {allowClinical
            ? 'Clinical can view wellness data and Clinical history.'
            : 'Clinical cannot view any wellness data.'}
        </p>

        {/* ✅ Fixed Custom CSS */}
        <style>{`
    .toggle-label {
      position: relative;
      display: block;
      width: 100%;
      background-color: #ccc;
      border-radius: 9999px;
      transition: background-color 0.2s ease;
    }

    .toggle-label::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 9999px;
      background-color: white;
      transition: transform 0.2s ease;
    }

    /* When checked → move the circle to the right */
    #consent-toggle:checked + .toggle-label::before {
      transform: translateX(1.5rem);
    }

    /* When checked → move the circle to the right */
    #clinical-consent-toggle:checked + .toggle-label::before {
      transform: translateX(1.5rem);
    }

    .toggle-checkbox:checked {
            right: 0;
            border-color: #68D391; /* green-400 */
          }
          .toggle-checkbox:checked + .toggle-label {
            background-color: #68D391;
          }
            .toggle-checkbox {
            opacity: 0;
            width: 0;
            height: 0;
          }


  `}</style>
      </Panel>


      {/* Gamification, Rewards & Recognition */}
      <Panel title="Rewards & Gamification" icon={AwardIcon} className="bg-yellow-50">
        <p className="text-gray-600 mb-4">Personalized CX and optimized to drive engagement + utilization of benefits. Your Current Points: **450**</p>

        <div className="grid grid-cols-3 gap-4 text-center">
          {rewards.map((reward, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md border-t-4 border-yellow-400">
              <span className="text-3xl block mb-2">{reward.icon}</span>
              <p className="font-bold text-gray-800">{reward.title}</p>
              <p className="text-sm text-gray-500">{reward.points > 0 ? `${reward.points} Points` : `${reward.required} to Next`}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">Complete your annual Health Check to unlock the Silver Tier!</p>
      </Panel>
    </div>
  );
};

// --- Main Components ---
const NavBar = ({ activeTab, setActiveTab, handleLogout }) => {
  const tabs = [
    { id: 'phr', label: 'PHR & Home', icon: HomeIcon },
    { id: 'teleconsult', label: 'Teleconsultation', icon: PhoneCallIcon },
    { id: 'claims', label: 'Claims & Reports', icon: FileTextIcon },
    { id: 'programs', label: 'Programs', icon: BookOpenIcon },
    { id: 'rpm', label: 'RPM', icon: HeartPulseIcon },
    { id: 'profile', label: 'Profile & Rewards', icon: UsersIcon },
  ];

  const NavItem = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center justify-start p-3 rounded-xl transition duration-150 w-full text-left
        ${activeTab === tab.id
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-white hover:bg-gray-100 hover:text-gray-800'
        }`}
    >
      <tab.icon className="w-5 h-5 mr-3" />
      <span className="font-medium text-sm lg:text-base">{tab.label}</span>
    </button>
  );

  return (
    <nav className="p-4 lg:p-6 bg-white shadow-xl lg:shadow-none min-h-screen" style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)", }}>
      <div className="text-2xl font-extrabold text-white mb-8 hidden lg:block">
        Member Portal
      </div>
      <div className="space-y-2">
        {tabs.map(tab => <NavItem key={tab.id} tab={tab} />)}
      </div>

      <div className="mt-12 pt-4 border-t border-gray-200">
        <Button onClick={handleLogout} primary={false} className="!bg-red-500 !text-white hover:!bg-red-600">
          Logout
        </Button>
        <p className="text-xs text-gray-400 mt-2 text-center"></p>
      </div>
    </nav>
  );
};

const Dashboard = ({ handleLogout, user }) => {
  const [activeTab, setActiveTab] = useState('phr');
  const [telehealthConfirmation, setTelehealthConfirmation] = useState(null);
  const [claimRequestConfirmation, setClaimRequestConfirmation] = useState(null);

  // Mock RPM Data for PHR
  const rpmData = useMemo(() => ([
    { label: 'Blood Pressure', value: '120/80', target: 'Below 130/85' },
    { label: 'Glucose (Avg)', value: '105 mg/dL', target: 'Below 140' },
  ]), []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'phr':
        return <PHR rpmData={rpmData} telehealthConfirmation={telehealthConfirmation} user={user} />;
      case 'teleconsult':
        return <Teleconsultation setTelehealthConfirmation={setTelehealthConfirmation} user={user} />;
      case 'claims':
        return <ClaimsAndReports setClaimRequestConfirmation={setClaimRequestConfirmation} user={user} />;
      case 'programs':
        return <ProgramsAndWellness />;
      case 'rpm':
        return <RPM user={user} />;
      case 'profile':
        return <ConsentAndGamification user={user} />;
      default:
        return <PHR rpmData={rpmData} telehealthConfirmation={telehealthConfirmation} user={user} />;
    }
  }, [activeTab, rpmData, telehealthConfirmation]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar for Desktop / Hidden for Mobile (Hamburger not implemented to keep UI simple) */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0" style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)", }}>
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      </div>

      {/* Top Nav for Mobile */}
      <div className="lg:hidden bg-white p-3 shadow-md overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          {['phr', 'teleconsult', 'claims', 'programs', 'rpm', 'profile'].map(tabId => {
            const tab = {
              phr: 'Home', teleconsult: 'Consult', claims: 'Claims',
              programs: 'Programs', rpm: 'RPM', profile: 'Profile'
            }[tabId];
            return (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition duration-150 flex-shrink-0
                  ${activeTab === tabId
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tab}
              </button>
            );
          })}
          <button onClick={handleLogout} className="py-2 px-4 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 flex-shrink-0">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto" style={{ background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)", }}>
        <div className="max-w-7xl mx-auto space-y-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const LoginScreen = ({ handleLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  //Load users.json once on mount
  useEffect(() => {
    // fetch("/data/users.json")
    fetch(`${import.meta.env.BASE_URL}data/users.json`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    // Validate user
    const foundUser = users.find(
      (u) => u.email === username && u.pwd === password
    );

    if (foundUser) {
      // alert(`Welcome, ${foundUser.name}!`);
      handleLogin(foundUser); // Pass user info to parent
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4 font-sans" style={{ background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)", }}>
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md text-center" style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)", }}>
        <h1 className="text-4xl text-white font-extrabold mb-2">
          Member Portal
        </h1>
        <p className="text-white mb-8">Your personalized healthcare benefits hub.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
          <Button type="submit">
            Secure Login
          </Button>
        </form>

        <p className="text-sm text-white mt-6">
          Forgot password? | Need to register?
        </p>
      </div>
    </div>
  );
};

// --- App Component (The entry point) ---
const MemberPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = useCallback((loggedUser) => {
    setUser(loggedUser);
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen handleLogin={handleLogin} />;
  }
  return <Dashboard handleLogout={handleLogout} user={user} />;
};

export default MemberPortal;
