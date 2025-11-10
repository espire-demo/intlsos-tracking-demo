import React, { useState, useMemo, useEffect } from 'react';
import { LogIn, User, Stethoscope, HeartPulse, ClipboardList, AlertTriangle, MessageSquare, ExternalLink, Activity, Plus, FileText, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// --- Configuration and Mock Data ---

// Professional, modern medical color palette
const primaryColor = '#009688'; // Teal/Medical Green
const accentColor = '#4db6ac'; // Lighter Teal
const textColor = '#1f2937';
const bgDark = '#00695c'; // Dark Teal for sidebar

// const mockClinicianData = {
//     id: 'clin-247',
//     name: 'Dr. Alex Varma, MD',
//     specialty: 'Internal Medicine',
// };

const mockPatients1 = [
    { id: 'M1001', name: 'Alice Johnson', age: 55, condition: 'Hypertension', vitalsStatus: 'Normal', adherence: 92, lastConsult: '2025-10-28', riskScore: 3.5 },
    { id: 'M1002', name: 'Robert Smith', age: 62, condition: 'Type 2 Diabetes', vitalsStatus: 'Alert', adherence: 75, lastConsult: '2025-10-30', riskScore: 7.1 },
    { id: 'M1003', name: 'Emily Davis', age: 38, condition: 'General Wellness', vitalsStatus: 'Normal', adherence: 99, lastConsult: '2025-11-01', riskScore: 1.2 },
    { id: 'M1004', name: 'John Brown', age: 71, condition: 'Post-Surgical Care', vitalsStatus: 'Warning', adherence: 85, lastConsult: '2025-11-04', riskScore: 5.8 },
];

const mockVitals = {
    M1001: {
        bloodPressure: '128/82',
        glucose: '95 mg/dL (Normal)',
        heartRate: '75 bpm',
        spo2: '99%',
    },
    M1002: {
        bloodPressure: '145/95',
        glucose: '185 mg/dL (High)',
        heartRate: '72 bpm',
        spo2: '98%',
    },
    M1003: {
        bloodPressure: '110/70',
        glucose: '88 mg/dL (Normal)',
        heartRate: '65 bpm',
        spo2: '99%',
    },
    M1004: {
        bloodPressure: '135/88',
        glucose: '115 mg/dL (Normal)',
        heartRate: '80 bpm',
        spo2: '96%',
    },
};

// --- Utility Components ---

const SectionTitle = ({ title, description }) => (
    <div className="mb-6 border-b pb-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">{description}</p>
    </div>
);

const Card = ({ title, value, icon: Icon, colorClass = 'text-primary', className = '' }) => (
    <div className={`bg-white p-5 rounded-xl shadow-lg border border-gray-100 ${className}`}>
        <div className="flex items-start justify-between">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
            <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <p className={`mt-3 text-3xl font-extrabold ${colorClass}`}>{value}</p>
    </div>
);

// --- New EMR Mobile Component ---

/**
 * Simulates the EMR view deeplink target, designed for mobile resolution.
 */
const EMRContextView = ({ patient, onClose }) => {
    const vitals = mockVitals[patient.id] || {};   

    const handleChartUpdate = () => {
        // Simulates Clinician updates chart -> update flows back to Member’s PHR.
        // Replaced alert with a custom message that closes the view
        alert(`Chart for ${patient.name} successfully updated! Changes are flowing back to the Member's Personal Health Record (PHR).`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 flex items-center justify-center p-0 sm:p-4">
            {/* Mobile-sized Container - Full screen on mobile, constrained width on desktop */}
            <div className="bg-white w-full max-w-sm h-full sm:h-[90vh] rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp border-t-4" style={{ borderColor: primaryColor }}>

                {/* Header */}
                <header className="p-4 flex justify-between items-center text-white sticky top-0 shadow-md" style={{ backgroundColor: primaryColor }}>
                    <h2 className="text-xl font-bold flex items-center">
                        <FileText className="w-5 h-5 mr-2" /> EMR: {patient.memberName}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-teal-700 transition">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                {/* Content Area */}
                <div className="p-4 flex-grow overflow-y-auto space-y-6">
                    {/* Patient Context */}
                    <div className="text-center pb-4 border-b border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800">{patient.memberName}</h3>
                        <p className="text-sm text-gray-500">{patient.userId} | {patient.bookingId} | {patient.condition}</p>
                    </div>

                    {/* Vitals Snapshot from PHR */}
                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                        <h4 className="font-bold text-lg text-indigo-700 mb-3 flex items-center">
                            <HeartPulse className="w-5 h-5 mr-2" /> Live Vitals Context
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <p><strong>BP:</strong> <span className="font-semibold">{vitals.bloodPressure}</span></p>
                            <p><strong>Glucose:</strong> <span className="font-semibold">{vitals.glucose}</span></p>
                            <p><strong>HR:</strong> <span className="font-semibold">{vitals.heartRate}</span></p>
                            <p><strong>SpO2:</strong> <span className="font-semibold">{vitals.spo2}</span></p>
                        </div>
                    </div>

                    {/* Chart Notes/History Summary */}
                    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-800 mb-2">Edit/Update Chart Notes</h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <span className='font-bold'>Current Summary:</span> Patient last seen {patient.lastConsult}. Risk Score: {patient.riskScore}.
                        </p>
                        <textarea
                            rows="8"
                            placeholder="Add new notes or amend current records. This update will flow back to the Member's PHR upon saving."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm transition duration-150"
                        ></textarea>
                    </div>
                </div>

                {/* Footer/Action Button */}
                <div className="p-4 border-t sticky bottom-0 bg-white shadow-inner">
                    <button
                        onClick={handleChartUpdate}
                        className="w-full flex items-center justify-center text-white font-bold py-3 rounded-lg shadow-xl transition duration-300 bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Save & Update Chart in PHR
                    </button>
                </div>
            </div>
            {/* Simple CSS to simulate slide-up animation for mobile view */}
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
                /* Ensure full screen on smaller devices */
                @media (max-width: 640px) {
                    .max-h-\[90vh\] {
                        max-height: 100vh;
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    );
};


// --- Feature Components (Updated) ---
/**
 * Tab 1: My Patients & EMR
 */
const PatientEMRDashboard = ({ setActivePatient, user }) => {
    const [emrPatient, setEmrPatient] = useState(null);
    const [mockPatients, setMockPatients] = useState([]);
    const [users, setUsers] = useState([]);
    
    const openEmrView = (patient) => {
        setEmrPatient(patient);
    };

    const closeEmrView = () => setEmrPatient(null);

    // Load users.json once on mount
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/users.json`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Failed to load users:", err));
    }, []);

    // Load clinician bookings and enrich with random vitals
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("teleBookings")) || [];
        const targetClinicianId = user?.id;

        const clinicianBookings = stored.filter(
            (b) => b.clinicianId === targetClinicianId
        );

        const enriched = clinicianBookings.map((b) => ({
            ...b,
            condition: b.condition || "Hypertension",
            vitalsStatus:
                b.vitalsStatus ||
                (Math.random() > 0.7
                    ? "Alert"
                    : Math.random() > 0.4
                        ? "Warning"
                        : "Normal"),
        }));

        setMockPatients(enriched);
    }, [user?.id]);

    // Merge users with mockPatients once both are loaded
    const combinedPatients = mockPatients.map((p) => {
        const matchedUser = users.find((u) => u.id === p.userId);
        return {
            ...p,
            memberName: matchedUser ? matchedUser.name : `User ${p.userId}`,
        };
    });

    return (
        <div>
            <SectionTitle
                title="My Patients & EMR Integration"
                description="Initiate consultations, manage prescriptions, and access detailed patient records via deeplink."
            />

            <div className="bg-white rounded-xl shadow-lg overflow-auto border border-gray-200">
                {combinedPatients.length === 0 ? (
                    <p className="text-center text-gray-500 p-6">
                        No patients found for this clinician.
                    </p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Booking ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Condition
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vitals Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {combinedPatients.map((patient, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-teal-50 transition duration-150"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {patient.bookingId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {patient.memberName} ({patient.userId})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {patient.condition}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.vitalsStatus === "Alert"
                                                ? "bg-red-100 text-red-800"
                                                : patient.vitalsStatus === "Warning"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {patient.vitalsStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => openEmrView(patient)}
                                            className="text-primary hover:text-teal-700 inline-flex items-center text-sm font-semibold p-2 rounded-lg bg-teal-50"
                                        >
                                            <FileText className="w-4 h-4 mr-1" /> EMR Chart
                                        </button>

                                        <button
                                            onClick={() => setActivePatient(patient)}
                                            className="text-white bg-indigo-600 hover:bg-indigo-700 inline-flex items-center text-sm font-semibold p-2 rounded-lg shadow-md"
                                        >
                                            <Stethoscope className="w-4 h-4 mr-1" /> Start Consult
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Render the EMR view if a patient is selected */}
            {emrPatient && (
                <EMRContextView patient={emrPatient} onClose={closeEmrView} />
            )}
        </div>
    );
};

/**
 * Tab 2: Remote Monitoring (RPM) Dashboard
 */
const RpmDashboard = () => {
    const highRiskPatient = mockPatients1.find(p => p.riskScore > 5);

    return (
        <div>
            <SectionTitle
                title="Remote Patient Monitoring (RPM) Dashboard"
                description="Centralized view of patient vitals, adherence, and automated risk alerts."
            />

            {/* Risk Alert Section */}
            <div className="p-6 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500 mb-8">
                <h3 className="text-xl font-bold text-red-700 flex items-center mb-2">
                    <AlertTriangle className="w-6 h-6 mr-2" /> Automated High-Risk Alerts (Out-of-Range Vitals)
                </h3>
                {highRiskPatient ? (
                    <p className="text-red-600 mt-2">
                        **{highRiskPatient.name} ({highRiskPatient.id})** has critical vitals: Blood Pressure **{mockVitals[highRiskPatient.id]?.bloodPressure || 'N/A'}** and Glucose **{mockVitals[highRiskPatient.id]?.glucose || 'N/A'}**. **Immediate follow-up required.**
                    </p>
                ) : (
                    <p className="text-green-600 mt-2">No critical alerts currently detected.</p>
                )}
            </div>

            {/* Vitals & Adherence Overview */}
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Patient Performance Overview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Patient Adherence (Avg.)" value="88%" icon={Activity} colorClass="text-primary" />
                <Card title="Average Risk Score" value="4.4" icon={AlertTriangle} colorClass="text-yellow-600" />
                <Card title="Total RPM Patients" value={mockPatients1.length} icon={User} colorClass="text-indigo-600" />
                <Card title="Latest BP Reading (R. Smith)" value="145/95" icon={HeartPulse} colorClass="text-red-600" />
            </div>

            {/* AI-Driven Insights */}
            <div className="p-6 bg-white rounded-xl shadow-xl border-l-4 border-primary">
                <h3 className="text-2xl font-bold text-primary mb-3">AI-Driven Personalized Insights</h3>
                <p className="text-gray-700 mb-4">
                    The system suggests **Robert Smith** may be non-adherent on medication due to high afternoon glucose spikes, correlating with a drop in his daily step count.
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-2">
                    <li>**Actionable Tip:** Review his care plan adherence targets and modify the afternoon reminder time.</li>
                    <li>**Risk Projection:** High adherence variance could increase 90-day readmission risk by 12%.</li>
                </ul>
            </div>
        </div>
    );
};

/**
 * Tab 3: Care Plans & Actions
 */
const CarePlanTools = () => {
    const [selectedPatient, setSelectedPatient] = useState(mockPatients1[1].id);
    const [actionText, setActionText] = useState('');
    const patient = mockPatients1.find(p => p.id === selectedPatient) || mockPatients[0];

    const handlePushAction = () => {
        if (actionText.trim()) {
            alert(`Pushed new action to ${patient.name}: "${actionText}".`);
            setActionText('');
        }
    };

    return (
        <div>
            <SectionTitle
                title="Care Plan Management and Member Engagement"
                description="Update care plans, tailor adherence goals, and push daily actions to members' devices."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary">
                    <h3 className="text-2xl font-bold text-primary mb-4">Update and Tailor Care Plans</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patient-select">Select Patient</label>
                        <select
                            id="patient-select"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            className="w-full lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        >
                            {mockPatients1.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.condition})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-4 mb-6 p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-bold text-lg text-gray-800">Current Plan Summary for {patient.name}</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                            <li>Medication Adherence Target: **{patient.adherence}%**</li>
                            <li>Daily Steps Goal: **6,000 steps**</li>
                            <li>Next Scheduled Consult: **2025-11-15**</li>
                        </ul>
                        <button className="text-sm font-semibold text-white bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded-lg">
                            Modify Targets & Goals
                        </button>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" /> Assign Daily Actions & Reminders
                        </h4>
                        <textarea
                            value={actionText}
                            onChange={(e) => setActionText(e.target.value)}
                            placeholder={`Assign a daily reminder (e.g., "Check glucose 30 mins after dinner").`}
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        ></textarea>
                        <button
                            onClick={handlePushAction}
                            className="mt-3 inline-flex items-center text-white bg-primary hover:bg-teal-700 font-semibold py-2 px-4 rounded-lg shadow-md"
                        >
                            <Plus className="w-5 h-5 mr-1" /> Push Action to Member
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
                    <h3 className="text-2xl font-bold text-indigo-700 mb-4">Partner Pharmacy App</h3>
                    <p className="text-lg font-medium text-gray-700 mb-4">
                        Seamless e-Prescription fulfillment and confirmation.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Once an e-Rx is issued (in the Consult), the partner app sends back a dispense confirmation status to the patient record.
                    </p>
                    <button
                        onClick={() => alert('Simulating Partner Pharmacy Deeplink: Viewing fulfillment status.')}
                        className="w-full inline-flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                    >
                        View Fulfillment Status
                        <ExternalLink className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * The main Clinician Dashboard layout.
 */
const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('patients');
    const [activePatient, setActivePatient] = useState(null); // Used to simulate starting a consult

    const renderContent = () => {
        if (activePatient) {
            return (
                <div className="p-8 bg-indigo-50 rounded-xl shadow-inner border border-indigo-200">
                    <div className="flex justify-between items-center mb-6 border-b pb-3">
                        <h3 className="text-3xl font-bold text-indigo-700 flex items-center">
                            <Stethoscope className="w-8 h-8 mr-2" /> Teleconsult: {activePatient.name}
                        </h3>
                        <button
                            onClick={() => {
                                alert(`e-Prescription issued and sent to Partner Pharmacy App for ${activePatient.name}.`);
                                setActivePatient(null);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Issue & End Consult
                        </button>
                    </div>
                    <p className="text-gray-700 mb-4">
                        **EMR Context:** {activePatient.name} has a current Risk Score of **{activePatient.riskScore}**. Last visit was **{activePatient.lastConsult}**.
                    </p>
                    <div className="h-64 flex items-center justify-center bg-white rounded-lg border-dashed border-2 border-indigo-300 text-gray-500">
                        [Placeholder for Live Video Feed & e-Prescription Form]
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'patients':
                return <PatientEMRDashboard setActivePatient={setActivePatient} user={user} />;
            case 'rpm':
                return <RpmDashboard />;
            case 'careplans':
                return <CarePlanTools />;
            default:
                return <PatientEMRDashboard setActivePatient={setActivePatient} user={user} />;
        }
    };

    const tabs = [
        { id: 'patients', label: 'My Patients & EMR', icon: ClipboardList },
        { id: 'rpm', label: 'Remote Monitoring (RPM)', icon: HeartPulse },
        { id: 'careplans', label: 'Care Plan Tools', icon: Activity },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar Navigation */}
            <nav className="hidden md:flex flex-col w-74 text-white p-6 shadow-2xl" style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)", }}>
                <div className="text-3xl font-extrabold mb-8 text-white text-center">
                    Clinician Portal
                </div>
                <div className="space-y-4 flex-grow">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${activeTab === tab.id
                                ? 'shadow-lg font-bold'
                                : 'hover:bg-teal-700'
                                }`}
                            style={{ backgroundColor: activeTab === tab.id ? primaryColor : 'transparent' }}
                        >
                            <tab.icon className="w-5 h-5" style={{ color: activeTab === tab.id ? 'white' : accentColor }} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
                {/* User Info / Logout */}
                <div className="pt-6 border-t border-teal-700">
                    <div className="flex items-center mb-4 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <User className="w-5 h-5 mr-2" style={{ color: accentColor }} />
                        <span className="text-sm font-semibold">{user.name}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition duration-300"
                    >
                        <LogIn className="w-4 h-4 transform rotate-180" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto" style={{ background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)", }}>
                {/* Mobile Tab Navigation */}
                <div className="md:hidden mb-6 bg-white p-4 rounded-xl shadow-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Navigation</label>
                    <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    >
                        {tabs.map(tab => (
                            <option key={tab.id} value={tab.id}>{tab.label}</option>
                        ))}
                    </select>
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-2">Welcome, {user.name}</h1>
                <p className="text-lg text-white mb-8">{user.specialty} Dashboard</p>

                <div className="bg-white p-6 rounded-xl shadow-2xl min-h-[70vh]">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

/**
 * Simple Login Page component.
 */
const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [clinicians, setClinicians] = useState([]);

    //Load clinicians.json once on mount
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/clinicians.json`)
            .then((res) => res.json())
            .then((data) => setClinicians(data))
            .catch((err) => console.error("Failed to load clinicians:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            alert("Please enter a username and password.");
            return;
        }

        // Validate clinician
        const foundUser = clinicians.find(
            (u) => u.username === username && u.pwd === password
        );

        // Simple mock login logic
        // if (username === 'doctor' && password === 'securepass') {
        //     onLogin(mockClinicianData);
        // } else {
        //     setError('Invalid credentials. Try "doctor" and "securepass".');
        // }

        if (foundUser) {
            alert(`Welcome, ${foundUser.name}!`);
            onLogin(foundUser); // Pass user info to parent
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" style={{ background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)", }}>
            <div className="w-full max-w-md bg-white p-12 rounded-2xl shadow-2xl" style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)", }}>
                <h2 className="text-4xl font-bold text-center text-white mb-2">Clinician Portal Login</h2>
                <p className="text-center text-white mb-6">Secure Access Required</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-white mt-6 text-center">Forgot password? | Need to register?</p>
            </div>
        </div>
    );
};

/**
 * Main application component.
 */
const ClinicianPortal = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    // Use useMemo to prevent unnecessary re-renders of the main view
    const mainView = useMemo(() => {
        if (user) {
            return <Dashboard user={user} onLogout={handleLogout} />;
        }
        return <LoginPage onLogin={handleLogin} />;
    }, [user]);

    return (
        <div className="font-sans">
            {mainView}
        </div>
    );
};

export default ClinicianPortal;