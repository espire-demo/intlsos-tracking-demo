import React from 'react';
import './virtualCare.css'; // We'll extract the CSS
import logo from "../../assets/logo.png";

const VirtualCareDashboard = () => {
  return (
    <div className="bg-virtual-bg min-h-screen font-sans">
      {/* Header */}
      <header className="bg-virtual-secondary text-white shadow-lg sticky top-0 z-10" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              <img src={logo} alt="Company Logo" width={110} style={{display: 'inline-block', marginRight: 15}} /> telehealth Connect
            </h1>
          </div>
          <nav className="flex space-x-4">
            <button className="bg-virtual-primary px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition duration-150 shadow-md">
              Notifications (3)
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Virtual Care Module</h2>

        {/* Top Section: Teleconsultation & Patient Info */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Teleconsultation Panel */}
          <div className="lg:col-span-2 bg-white panel p-6 border-t-4 border-virtual-primary flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-virtual-secondary mb-4">Teleconsultation & Video Visit</h3>
            <p className="text-gray-600 mb-6">Your scheduled appointment is today at <strong>2:00 PM</strong> with Dr. E. Thompson.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-virtual-primary hover:bg-cyan-600 text-white p-4 rounded-xl font-bold transition duration-150 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/50">
                <VideoIcon />
                <span>Join Virtual Visit Now</span>
              </button>
              <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 p-4 rounded-xl font-semibold transition duration-150">
                <CalendarIcon />
                Reschedule
              </button>
            </div>
          </div>

          {/* EMR Integration Status / CDS */}
          <div className="bg-virtual-secondary panel p-6 text-white flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-3">System Status</h3>
            <p className="text-sm opacity-90 mb-4">
              Data flow is <strong>seamless</strong> thanks to <strong>EMR Integration</strong> (Epic).
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheckIcon />
              <span className="font-semibold text-lg">CDS Activated</span>
            </div>
            <p className="text-xs opacity-70">
              Clinical Decision Support provides real-time alerts and recommendations during care administration.
            </p>
          </div>
        </section>

        {/* Middle Section: Remote Patient Monitoring (RPM) */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-5">📈 Remote Patient Monitoring (RPM) Vitals</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Vitals Card 1: Heart Rate */}
            <VitalsCard 
              title="Heart Rate (BPM)"
              value="78"
              valueColor="text-red-600"
              borderColor="border-red-500"
              status="Normal Range: 60-100"
            />

            {/* Vitals Card 2: Blood Pressure */}
            <VitalsCard 
              title="Blood Pressure (mm Hg)"
              value="128/84"
              valueColor="text-yellow-600"
              borderColor="border-yellow-500"
              status="Slightly elevated"
            />

            {/* Vitals Card 3: Blood Glucose */}
            <VitalsCard 
              title="Blood Glucose (mg/dL)"
              value="105"
              valueColor="text-virtual-primary"
              borderColor="border-virtual-primary"
              status="Last reading: 1 hour ago"
            />

            {/* Vitals Card 4: Oxygen Saturation */}
            <VitalsCard 
              title="Oxygen Saturation (%)"
              value="98"
              valueColor="text-green-600"
              borderColor="border-green-500"
              status="Excellent range"
            />
          </div>
          
          <div className="mt-6 text-center">
            <button className="text-virtual-secondary hover:text-blue-900 font-semibold text-sm py-2 px-4 rounded-lg bg-white shadow">
              View Full Monitoring History &rarr;
            </button>
          </div>
        </section>

        {/* Bottom Section: Care Plan & e-Prescribing */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CarePlanSection />
          <EPrescribingSection />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm">
          &copy; 2025, Espire Infolabs Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

// Component for vitals cards
const VitalsCard = ({ title, value, valueColor, borderColor, status }) => (
  <div className={`bg-white panel p-5 border-b-4 ${borderColor}`}>
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className={`vitals-value ${valueColor} mt-2`}>{value}</p>
    <p className="text-xs text-gray-500 mt-1">{status}</p>
  </div>
);

// Care Plan Component
const CarePlanSection = () => (
  <div className="bg-white panel p-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">🩺 Active Care Plan</h3>
    <p className="text-sm text-gray-600 mb-4">Current focus: Post-operative recovery and weight management. Plan expires: <strong>Jan 15, 2025</strong>.</p>
    
    <ul className="space-y-3 text-gray-700">
      <li className="flex items-center space-x-2">
        <span className="text-green-500">✓</span>
        <span>Daily 30-min physical therapy exercises.</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="text-green-500">✓</span>
        <span>Weekly video check-in with Physical Therapist.</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="text-yellow-500">●</span>
        <span>Log meals twice daily (2/7 required).</span>
      </li>
    </ul>

    <button className="mt-6 w-full bg-virtual-primary/10 text-virtual-secondary border border-virtual-primary p-3 rounded-xl font-semibold hover:bg-virtual-primary/20 transition duration-150">
      Edit / Administer Care Plan
    </button>
  </div>
);

// e-Prescribing Component
const EPrescribingSection = () => (
  <div className="bg-white panel p-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">℞ e-Prescribing Management</h3>
    <p className="text-sm text-gray-600 mb-4">View your active prescriptions, request refills, and see dispensing status at your preferred pharmacy.</p>
    
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <span className="font-medium text-gray-900">Medication A (5mg)</span>
        <span className="text-sm text-red-600 font-semibold">Refill Due (3 days)</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <span className="font-medium text-gray-900">Medication B (100mg)</span>
        <span className="text-sm text-green-600 font-semibold">Active (20 days left)</span>
      </div>
    </div>

    <button className="mt-6 w-full bg-red-500 text-white p-3 rounded-xl font-semibold hover:bg-red-600 transition duration-150">
      Request e-Refill Now
    </button>
  </div>
);

// Icon Components
const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.275A.82.82 0 0121 8.4v7.2c0 .28-.158.544-.45.655L15 14m-5 4h10a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.03 12.03 0 005 15.176V14h14v1.176a12.03 12.03 0 001.618-8.156zM8 18h8v2H8z" />
  </svg>
);

export default VirtualCareDashboard;