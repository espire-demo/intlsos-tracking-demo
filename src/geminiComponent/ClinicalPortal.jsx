import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, query, serverTimestamp } from 'firebase/firestore';
import {
    Home, Users, HeartPulse, Stethoscope, MessageSquare, Menu, X, Pill, ExternalLink, Settings, AlertTriangle, Lightbulb
} from 'lucide-react';

// --- GLOBAL FIREBASE/ENV VARIABLES ---
// These variables are provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Helper to determine the Firestore path for public data
const getPublicCollectionPath = (collectionName) => 
    `/artifacts/${appId}/public/data/${collectionName}`;

// --- UTILITIES ---
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const PatientData = ({ patient }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6 transition duration-300 hover:shadow-xl">
        <div className="flex justify-between items-start mb-4 border-b pb-3">
            <h3 className="text-2xl font-bold text-indigo-700">{patient.name}</h3>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
            }`}>
                Risk: {patient.riskLevel}
            </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-red-500" />
                <span className="font-semibold">Vitals:</span> {patient.vitals.bloodPressure}
            </div>
            <div className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-cyan-500" />
                <span className="font-semibold">Adherence:</span> {patient.adherence}%
            </div>
            <div className="flex items-center col-span-2">
                <Stethoscope className="w-5 h-5 mr-2 text-indigo-500" />
                <span className="font-semibold">Care Plan:</span> {patient.carePlan.substring(0, 50)}...
            </div>
        </div>
    </div>
);

// --- MOCK INITIAL DATA FOR FIRST-TIME SETUP ---
const MOCK_PATIENTS = [
    { id: 'pat101', name: 'Alice Johnson', vitals: { bloodPressure: '145/95', heartRate: 88, spo2: 95 }, adherence: 75, riskLevel: 'High', carePlan: 'Diabetic management, 30 min daily walk, check glucose twice daily.', dailyActions: ['Take Metformin', 'Log blood pressure', 'Walk 30 minutes'] },
    { id: 'pat102', name: 'Robert Smith', vitals: { bloodPressure: '120/80', heartRate: 65, spo2: 98 }, adherence: 98, riskLevel: 'Low', carePlan: 'Post-op recovery, monitor pain levels, light stretching.', dailyActions: ['Record pain score', 'Perform stretches'] },
    { id: 'pat103', name: 'Emma Lee', vitals: { bloodPressure: '135/85', heartRate: 72, spo2: 97 }, adherence: 88, riskLevel: 'Medium', carePlan: 'Hypertension and cholesterol management, low-sodium diet, take Lipitor.', dailyActions: ['Take Lipitor', 'Log diet details'] },
];

// --- MAIN APPLICATION COMPONENT ---
const ClinicalPortal = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'dashboard', 'patientView', 'consult'
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. FIREBASE INITIALIZATION AND AUTHENTICATION
    useEffect(() => {
        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase config is missing. App cannot function.");
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);
            setDb(firestoreDb);
            setAuth(firebaseAuth);

            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    setIsAuthReady(true);
                    console.log("Authenticated user:", user.uid);
                    if (currentPage === 'login') {
                        setCurrentPage('dashboard');
                    }
                } else {
                    // Try to sign in using the custom token if available
                    if (initialAuthToken) {
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                        console.log("Signed in with custom token.");
                    } else {
                        // Fallback to anonymous sign-in
                        await signInAnonymously(firebaseAuth);
                        console.log("Signed in anonymously.");
                    }
                }
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(true); // Treat as ready to stop spinner even on error
        }
    }, []);

    // 2. PATIENT DATA SUBSCRIPTION (FIRESTORE)
    useEffect(() => {
        if (!db || !isAuthReady) return;

        const path = getPublicCollectionPath('patients');
        const q = query(collection(db, path));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPatients = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (fetchedPatients.length === 0) {
                // If no data, populate with mock data for the first time
                console.log("No patients found. Populating mock data...");
                MOCK_PATIENTS.forEach(p => {
                    const patientDocRef = doc(db, path, p.id);
                    setDoc(patientDocRef, { ...p, createdAt: serverTimestamp() }, { merge: true })
                        .catch(err => console.error("Error setting mock patient data:", err));
                });
                setPatients(MOCK_PATIENTS); // Display mock data immediately while Firestore updates
            } else {
                setPatients(fetchedPatients);
            }
        }, (error) => {
            console.error("Error fetching patients:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady]);

    // --- HANDLERS ---

    const handleLogin = () => {
        // Auth is handled in the useEffect. This button is only visible if auth hasn't settled.
        if (isAuthReady) {
            setCurrentPage('dashboard');
        } else {
            console.warn("Authentication still in progress.");
        }
    };

    const navigateToPatientView = (patient) => {
        setSelectedPatient(patient);
        setCurrentPage('patientView');
        setIsMenuOpen(false);
    };

    const handleDeeplink = (app) => {
        alert(`Simulating Deeplink to ${app}. In a real application, this would use a custom URL scheme or universal link to launch an external app with context.`);
    };

    const handlePrescribe = useCallback(debounce(async (patientId, medication) => {
        setLoading(true);
        try {
            // Simulate e-Prescription creation (update patient status)
            const path = getPublicCollectionPath('patients');
            const patientRef = doc(db, path, patientId);
            await setDoc(patientRef, {
                lastPrescription: {
                    medication: medication,
                    date: new Date().toISOString(),
                    status: 'Pending Fulfillment'
                }
            }, { merge: true });
            
            // Simulate Partner Pharmacy App confirmation after a short delay
            setTimeout(async () => {
                await setDoc(patientRef, {
                    lastPrescription: {
                        medication: medication,
                        date: new Date().toISOString(),
                        status: 'Fulfilled & Dispensed'
                    }
                }, { merge: true });
                alert(`Prescription for ${medication} for ${selectedPatient.name} confirmed as 'Fulfilled & Dispensed' (via simulated Partner Pharmacy App deeplink confirmation).`);
                setLoading(false);
            }, 3000); 

        } catch (error) {
            console.error("Error issuing prescription:", error);
            alert("Failed to issue prescription. Check console for details.");
            setLoading(false);
        }
    }, 500), [db, selectedPatient]);

    const handleCarePlanUpdate = useCallback(debounce(async (patientId, newCarePlan) => {
        if (!db) return;
        setLoading(true);
        try {
            const path = getPublicCollectionPath('patients');
            const patientRef = doc(db, path, patientId);
            await setDoc(patientRef, {
                carePlan: newCarePlan,
                lastUpdated: serverTimestamp()
            }, { merge: true });
            alert("Care plan updated successfully!");
        } catch (error) {
            console.error("Error updating care plan:", error);
            alert("Failed to update care plan.");
        } finally {
            setLoading(false);
        }
    }, 500), [db]);

    // --- UI COMPONENTS ---

    const Sidebar = () => (
        <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out w-64 bg-indigo-800 text-white p-6 z-30 flex flex-col`}>
            <div className="text-3xl font-extrabold mb-10 text-indigo-200">
                Clinician Portal
            </div>
            <nav className="flex-grow">
                <button
                    className="w-full flex items-center p-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-150 mb-3"
                    onClick={() => { setCurrentPage('dashboard'); setIsMenuOpen(false); }}
                >
                    <Home className="w-5 h-5 mr-3" /> Dashboard
                </button>
                <div className="text-sm font-semibold text-indigo-300 uppercase mt-6 mb-2">Patients</div>
                {patients.slice(0, 5).map(p => (
                    <button
                        key={p.id}
                        className="w-full text-left flex items-center p-3 rounded-lg hover:bg-indigo-700 transition duration-150 truncate text-sm"
                        onClick={() => navigateToPatientView(p)}
                    >
                        <Users className="w-4 h-4 mr-3" /> {p.name}
                    </button>
                ))}
                {patients.length > 5 && (
                    <div className="p-3 text-indigo-400 text-sm">...and {patients.length - 5} more</div>
                )}
            </nav>
            <div className="mt-auto pt-4 border-t border-indigo-700">
                <p className="text-xs text-indigo-400">
                    <span className="font-semibold">User:</span> {userId || 'N/A'}
                    <br />
                    <span className="font-semibold">App ID:</span> {appId}
                </p>
                <button
                    className="w-full flex items-center p-3 mt-3 rounded-lg text-sm bg-indigo-700 hover:bg-indigo-600 transition duration-150"
                    onClick={() => console.log("Settings action")}
                >
                    <Settings className="w-4 h-4 mr-3" /> Settings
                </button>
            </div>
        </div>
    );

    const Header = () => (
        <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-20">
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 hidden lg:block">
                {currentPage === 'dashboard' ? 'RPM Dashboard Overview' :
                 currentPage === 'patientView' ? `Patient Chart: ${selectedPatient?.name}` :
                 'Portal'}
            </h1>
            <div className="text-sm text-gray-500">
                Welcome, Clinician!
            </div>
        </header>
    );

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-t-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin"></div>
            <span className="ml-3 text-indigo-600 font-medium">Loading...</span>
        </div>
    );

    const DashboardView = () => {
        const highRiskPatients = patients.filter(p => p.riskLevel === 'High');

        return (
            <div className="p-4 sm:p-8 space-y-8">
                <section className="p-6 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md">
                    <div className="flex items-center mb-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                        <h2 className="text-xl font-bold text-red-700">Automated Risk Alerts ({highRiskPatients.length})</h2>
                    </div>
                    <p className="text-gray-700 mb-4">Immediate attention required for patients with out-of-range vital signs or critical adherence drop.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {highRiskPatients.length > 0 ? (
                            highRiskPatients.map(p => (
                                <button
                                    key={p.id}
                                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition text-left border border-red-200"
                                    onClick={() => navigateToPatientView(p)}
                                >
                                    <p className="font-semibold text-red-600">{p.name}</p>
                                    <p className="text-sm text-gray-500">BP: {p.vitals.bloodPressure} | Adherence: {p.adherence}%</p>
                                </button>
                            ))
                        ) : (
                            <p className="text-green-600">No critical alerts currently detected.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Centralized Patient Monitoring</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {patients.map(patient => (
                            <button
                                key={patient.id}
                                className="block w-full text-left"
                                onClick={() => navigateToPatientView(patient)}
                            >
                                <PatientCard patient={patient} />
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        );
    };
    
    // Component used in DashboardView
    const PatientCard = ({ patient }) => (
        <div className={`p-5 rounded-xl shadow-md transition duration-300 hover:shadow-lg h-full border ${
            patient.riskLevel === 'High' ? 'bg-red-50 border-red-300' :
            patient.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-300' :
            'bg-white border-gray-200'
        }`}>
            <h3 className="font-bold text-lg mb-1 truncate text-indigo-800">{patient.name}</h3>
            <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                    <HeartPulse className="w-4 h-4 mr-2 text-red-500" />
                    <span>BP: <span className="font-medium">{patient.vitals.bloodPressure}</span></span>
                </div>
                <div className="flex items-center">
                    <Pill className="w-4 h-4 mr-2 text-cyan-500" />
                    <span>Adherence: <span className="font-medium">{patient.adherence}%</span></span>
                </div>
            </div>
            <div className="mt-3 text-xs font-semibold">
                Risk: <span className={`p-1 rounded ${
                    patient.riskLevel === 'High' ? 'bg-red-200 text-red-900' :
                    patient.riskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-900' :
                    'bg-green-200 text-green-900'
                }`}>{patient.riskLevel}</span>
            </div>
        </div>
    );
    
    const PatientDetailView = () => {
        const [carePlanInput, setCarePlanInput] = useState(selectedPatient?.carePlan || '');
        const [actionInput, setActionInput] = useState('');
        const [medicationInput, setMedicationInput] = useState('');
        
        const currentPatient = patients.find(p => p.id === selectedPatient?.id) || selectedPatient;
        if (!currentPatient) return <div className="p-8 text-center text-red-500">Patient data not found.</div>;
        
        const handleAddAction = useCallback(debounce(() => {
            if (!db || !actionInput.trim()) return;
            const newAction = actionInput.trim();
            const newActions = [...currentPatient.dailyActions, newAction];
            
            setLoading(true);
            const path = getPublicCollectionPath('patients');
            const patientRef = doc(db, path, currentPatient.id);
            setDoc(patientRef, { dailyActions: newActions }, { merge: true })
                .then(() => {
                    setActionInput('');
                    alert(`Daily action "${newAction}" assigned.`);
                })
                .catch(err => console.error("Error adding action:", err))
                .finally(() => setLoading(false));
        }, 500), [db, actionInput, currentPatient.id, currentPatient.dailyActions]);


        return (
            <div className="p-4 sm:p-8 space-y-10">
                {/* AI Insights & Alerts Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200">
                        <div className="flex items-center mb-4">
                            <Lightbulb className="w-6 h-6 text-indigo-600 mr-3" />
                            <h3 className="text-xl font-bold text-indigo-700">AI-Driven Personalized Insights</h3>
                        </div>
                        <p className="text-gray-700 italic">
                            "Given the recent drop in adherence to 75% and elevated BP of {currentPatient.vitals.bloodPressure}, the AI suggests **simplifying the daily actions** and scheduling a check-in call to address potential medication side-effects."
                        </p>
                    </div>

                    <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-300">
                        <div className="flex items-center mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                            <h3 className="text-xl font-bold text-red-700">Vital Out-of-Range</h3>
                        </div>
                        <p className="text-gray-700 font-semibold">
                            Blood Pressure: <span className="text-red-600">{currentPatient.vitals.bloodPressure}</span> (Requires review)
                        </p>
                        <p className="text-gray-700 mt-2">
                            Latest Heart Rate: {currentPatient.vitals.heartRate} bpm.
                        </p>
                    </div>
                </section>

                {/* Patient Vitals & History */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Vitals & Activity Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-lg">
                        <StatBox icon={<HeartPulse className="text-red-500" />} label="BP" value={currentPatient.vitals.bloodPressure} unit="" />
                        <StatBox icon={<Users className="text-blue-500" />} label="Heart Rate" value={currentPatient.vitals.heartRate} unit="bpm" />
                        <StatBox icon={<Pill className="text-cyan-500" />} label="Adherence" value={currentPatient.adherence} unit="%" />
                        <StatBox icon={<MessageSquare className="text-purple-500" />} label="Last Consult" value="2 days ago" unit="" />
                    </div>
                </section>
                
                {/* EMR Deeplink & e-Prescription */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Clinical Actions & Deeplinks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* EMR Deeplink */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                                <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" /> EMR/EHR Access
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">Click to open the patient's full chart in the external EMR system with context.</p>
                            <button 
                                className="w-full bg-indigo-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition"
                                onClick={() => handleDeeplink('EMR/EHR')}
                            >
                                <ExternalLink className="w-5 h-5 mr-2" /> Open EMR Chart
                            </button>
                        </div>
                        
                        {/* e-Prescription */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                                <Pill className="w-5 h-5 mr-2 text-green-600" /> Issue e-Prescription
                            </h3>
                            <input
                                type="text"
                                placeholder="e.g., Lisinopril 10mg"
                                value={medicationInput}
                                onChange={(e) => setMedicationInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                className="w-full bg-green-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition disabled:bg-gray-400"
                                onClick={() => handlePrescribe(currentPatient.id, medicationInput)}
                                disabled={!medicationInput.trim() || loading}
                            >
                                {loading ? <LoadingSpinner /> : <><Pill className="w-5 h-5 mr-2" /> Send e-Prescription</>}
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Status: {currentPatient.lastPrescription?.status || 'No recent prescription'}</p>
                        </div>
                    </div>
                </section>

                {/* Care Plan & Daily Actions */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Care Plan Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Care Plan Update */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Update Care Plan</h3>
                            <textarea
                                value={carePlanInput}
                                onChange={(e) => setCarePlanInput(e.target.value)}
                                rows="5"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                                onClick={() => handleCarePlanUpdate(currentPatient.id, carePlanInput)}
                                disabled={loading || carePlanInput === currentPatient.carePlan}
                            >
                                {loading ? 'Saving...' : 'Save & Tailor Care Plan'}
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Last updated: {currentPatient.lastUpdated?.toDate().toLocaleTimeString() || 'N/A'}</p>
                        </div>

                        {/* Assign Daily Actions */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Daily Actions/Reminders</h3>
                            <ul className="list-disc list-inside space-y-1 mb-4 h-24 overflow-y-auto p-1 bg-gray-50 rounded">
                                {currentPatient.dailyActions.map((action, index) => (
                                    <li key={index} className="text-sm text-gray-700">{action}</li>
                                ))}
                            </ul>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Assign new action (e.g., 'Log water intake')"
                                    value={actionInput}
                                    onChange={(e) => setActionInput(e.target.value)}
                                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                />
                                <button
                                    className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-400"
                                    onClick={handleAddAction}
                                    disabled={!actionInput.trim() || loading}
                                >
                                    + Push
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        );
    };

    const StatBox = ({ icon, label, value, unit }) => (
        <div className="p-4 bg-gray-50 rounded-lg text-center shadow-inner">
            <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white rounded-full mb-2 shadow-sm">
                {icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label} {unit}</p>
        </div>
    );
    
    const LoginScreen = () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl space-y-6 text-center">
                <h2 className="text-3xl font-extrabold text-indigo-800">Clinician Portal</h2>
                <p className="text-gray-600">Secure Access Required</p>

                {isAuthReady ? (
                    <>
                        <p className="text-green-600 font-medium">Authentication Complete.</p>
                        <button
                            onClick={handleLogin}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                            Enter Dashboard
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <LoadingSpinner />
                        <p className="mt-4 text-indigo-600">Initializing Firebase and securing token...</p>
                    </div>
                )}
                
                <p className="text-xs text-gray-400 pt-4 border-t mt-4">
                    Using authenticated session ID: {userId || '...'}
                </p>
            </div>
        </div>
    );

    // --- MAIN RENDER LOGIC ---

    const renderContent = () => {
        if (currentPage === 'login' || !isAuthReady) {
            return <LoginScreen />;
        }
        
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className={`fixed inset-0 bg-black opacity-50 z-20 lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`} onClick={() => setIsMenuOpen(false)}></div>
                <main className="flex-1 overflow-x-hidden">
                    <Header />
                    <div className="p-0">
                        {currentPage === 'dashboard' && <DashboardView />}
                        {currentPage === 'patientView' && selectedPatient && <PatientDetailView />}
                        {loading && (
                             <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
                                <LoadingSpinner />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    };

    return renderContent();
};

export default ClinicalPortal;
