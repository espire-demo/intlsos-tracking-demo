import React from 'react';
import './AdminnConfigHub.css';
import logo from "../../assets/logo.png";

function AdminnConfigHub() {
  return (
    <div className="bg-admin-bg min-h-screen font-sans">
      {/* Overall Layout: Sidebar and Main Content */}
      <div className="flex h-screen">
        {/* Left Sidebar: Configuration Navigation */}
        <aside className="w-64 bg-admin-dark text-white p-4 flex flex-col sticky top-0 h-full overflow-y-auto">
          <div className="text-2xl font-bold mb-8 border-b border-gray-700 pb-4" style={{margin: '0 auto'}}>
            <img src={logo} alt="Company Logo" width={110} style={{marginBottom: 10,}} /> Admin Hub
          </div>

          <nav className="space-y-2 flex-grow">
            <a href="#benefits" className="flex items-center space-x-3 p-3 rounded-lg bg-admin-primary text-white font-semibold shadow-md transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
              </svg>
              <span>Benefits Configurator</span>
            </a>
            <a href="#network" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm10 0a1 1 0 110 2h2a1 1 0 110-2h-2z" clipRule="evenodd" />
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span>Network Management</span>
            </a>
            <a href="#audit" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" clipRule="evenodd" />
              </svg>
              <span>Audit Trails</span>
            </a>
            <a href="#privacy" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1-1-9-9 9-9 9 9zM10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
              </svg>
              <span>Privacy Portal</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow p-8 overflow-y-auto">
          
          <header className="mb-8">
            <p className="text-sm text-gray-500">Configuration / Settings</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Platform Administration & Configuration</h2>
          </header>

          {/* 1. No-Code Benefits Configurator */}
          <section id="benefits" className="bg-white panel p-6 mb-10">
            <h3 className="text-2xl font-bold text-admin-primary mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>No-Code Benefits Configurator</span>
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Design and deploy complex benefit plans without writing code. Drag and drop components to define coverage, limits, and eligibility rules.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg config-card">
                <p className="text-gray-700 font-medium">Drag Components Here</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg config-card">
                <p className="text-gray-700 font-medium">Rule Builder</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg config-card">
                <p className="text-gray-700 font-medium">Preview & Test Plan</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-red-500 font-semibold">Current Draft: V2.1 (Needs Publishing)</span>
              <button className="bg-admin-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition duration-150 shadow-lg shadow-teal-500/50">
                Launch Configurator &rarr;
              </button>
            </div>
          </section>

          {/* 2. Network Management Tools */}
          <section id="network" className="bg-white panel p-6 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h6" />
              </svg>
              <span>Network Management Tools</span>
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Manage the directory of contracted providers, hospitals, and specialty care centers. Sync and update provider status in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <button className="bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-150">
                Search & Edit Providers
              </button>
              <button className="bg-gray-200 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-150">
                Contract & Credentialing
              </button>
              <button className="bg-gray-200 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-150">
                Network Utilization Report
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              Last Network Sync: **3 minutes ago**. 12 new providers added this week.
            </div>
          </section>
          
          {/* 3. Audit Trails & Activity Log */}
          <section id="audit" className="bg-white panel p-6 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>System Audit Trails</span>
            </h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {/* Audit Log Entry 1 */}
              <div className="flex justify-between text-sm p-2 border-b">
                <span className="text-gray-800 font-medium">Rule 'R-015' Modified in CMS</span>
                <span className="text-gray-500">Admin User ID 734 | 10:15 AM</span>
              </div>
              {/* Audit Log Entry 2 */}
              <div className="flex justify-between text-sm p-2 border-b bg-red-50">
                <span className="text-red-700 font-medium">SECURITY ALERT: Unauthorized Login Attempt</span>
                <span className="text-gray-500">System | 09:45 AM</span>
              </div>
              {/* Audit Log Entry 3 */}
              <div className="flex justify-between text-sm p-2 border-b">
                <span className="text-gray-800 font-medium">New Benefit Plan 'Dental Pro' Published</span>
                <span className="text-gray-500">Benefits Manager 401 | Yesterday</span>
              </div>
              {/* Audit Log Entry 4 */}
              <div className="flex justify-between text-sm p-2 border-b">
                <span className="text-gray-800 font-medium">25 Documents Digitized by OCR</span>
                <span className="text-gray-500">Data Pipeline | Yesterday</span>
              </div>
              <div className="flex justify-between text-sm p-2 border-b">
                <span className="text-gray-800 font-medium">Personalization Rule 'New Parent' Toggled On</span>
                <span className="text-gray-500">Admin User ID 734 | 2 days ago</span>
              </div>
            </div>
            <button className="mt-4 text-sm text-admin-primary hover:text-teal-700 font-semibold">
              View Full Audit History & Search &rarr;
            </button>
          </section>
          
          {/* 4. Privacy Portal & Data Governance */}
          <section id="privacy" className="bg-white panel p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-4-4m5-4a2 2 0 11-4 0 2 2 0 014 0zM12 21h4a2 2 0 002-2v-4a2 2 0 00-2-2h-3l-2 2H9m1.5-1.5L21 21m-10.5-1.5L3.75 4.5" />
              </svg>
              <span>Privacy Portal & Compliance</span>
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Manage data access controls, member consent forms, and view compliance status reports (e.g., HIPAA, GDPR).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-medium text-green-800">Data Governance Status: <span className="font-bold">Compliant</span></p>
                <p className="text-xs text-gray-600 mt-1">Last review: Today. All access rules verified.</p>
              </div>
              <button className="bg-admin-primary/10 text-admin-primary border border-admin-primary p-4 rounded-lg font-semibold hover:bg-admin-primary/20 transition duration-150">
                Manage Member Consent Forms
              </button>
            </div>
            
            <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 font-semibold">
              Download Annual Compliance Report
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminnConfigHub;