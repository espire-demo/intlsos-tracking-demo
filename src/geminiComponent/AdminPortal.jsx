import React, { useState } from 'react';
// Assuming lucide-react is available for icons
// If not available, use inline SVG or standard emojis
import {
  LogIn, LayoutDashboard, Wallet, Stethoscope, FileText, Settings, BarChart3, Users, ClipboardList
} from 'lucide-react';

// --- Icon Mapping (For simplicity and readability) ---
const Icons = {
  LogIn, LayoutDashboard, Wallet, Stethoscope, FileText, Settings, BarChart3, Users, ClipboardList
};

// ====================================================================
// 1. DATA AND CONSTANTS
// ====================================================================

const NAV_ITEMS = [
  { id: 'dashboard', name: 'Dashboard', icon: Icons.LayoutDashboard, domain: 'all' },
  { id: 'claims', name: 'Digital Claims', icon: Icons.Wallet, domain: 'claims' },
  { id: 'rpm_careplans', name: 'RPM: Care Plans', icon: Icons.FileText, domain: 'rpm' },
  { id: 'rpm_workflows', name: 'RPM: Workflows', icon: Icons.Settings, domain: 'rpm' },
  { id: 'rpm_reporting', name: 'RPM: Reporting', icon: Icons.BarChart3, domain: 'rpm' },
];

const mockClaimsData = [
  { id: 'C9001', user: 'Alice Johnson', amount: 55.00, status: 'Pending', type: 'Prescription' },
  { id: 'C9002', user: 'Bob Smith', amount: 120.50, status: 'Pending', type: 'Wellness Class' },
  { id: 'C9003', user: 'Charlie Brown', amount: 350.00, status: 'Approved', type: 'Equipment' },
  { id: 'C9004', user: 'Diana Prince', amount: 22.99, status: 'Pending', type: 'Over-the-Counter' },
];

// ====================================================================
// 2. CHILD COMPONENTS
// ====================================================================

/**
 * Renders the Login Page component.
 * @param {function} onLogin - Callback to execute on successful mock login.
 */
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid credentials. Use "admin" and "password".');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" style={{background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)",}}>
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white md:p-12 shadow-2xl rounded-xl transition-all duration-300 hover:shadow-3xl text-center" style={{background: "linear-gradient(to right, #2c3e50, #4ca1af)",}}>
        <div className="space-x-2 text-indigo-700 mb-2">
          <h1 className="text-4xl font-bold text-white ">Admin Portal Login</h1>
        </div>
        <p className="text-white mb-6">Access the Digital Health & RPM Management System.</p>

        {error && (
          <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username (admin)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
          <input
            type="password"
            placeholder="Password (password)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 flex items-center justify-center p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
        >
          <Icons.LogIn className="w-5 h-5 mr-2" />
          Log In
        </button>
        <p class="text-sm text-white mt-6">Forgot password? | Need to register?</p>
      </form>
    </div>
  );
};

/**
 * Renders the Dashboard overview.
 */
const Dashboard = () => (
  <div className="space-y-6 p-4 md:p-8">
    <h2 className="text-3xl font-extrabold text-white border-b pb-2 mb-6">Admin Overview</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Metric Card 1 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
        <p className="text-sm font-medium text-gray-500">Pending Claims</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">4</p>
        <p className="text-xs text-green-500 mt-2">+1 since last hour</p>
      </div>

      {/* Metric Card 2 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-500">
        <p className="text-sm font-medium text-gray-500">Active RPM Users</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">2,301</p>
        <p className="text-xs text-gray-500 mt-2">Target: 3,000</p>
      </div>

      {/* Metric Card 3 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-500">
        <p className="text-sm font-medium text-gray-500">New Care Plans</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">21</p>
        <p className="text-xs text-green-500 mt-2">Approved this week</p>
      </div>

      {/* Metric Card 4 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
        <p className="text-sm font-medium text-gray-500">Urgent Alerts</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">2</p>
        <p className="text-xs text-red-500 mt-2">Require immediate action</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Claims Submission Trend</h3>
        <p className="text-center text-gray-500 h-48 flex items-center justify-center">
          [Placeholder for Chart: Monthly Claims Volume]
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Workflow Approvals</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center text-gray-700"><span>Physician Review</span> <span className="font-semibold text-indigo-600">92%</span></li>
          <li className="flex justify-between items-center text-gray-700"><span>Billing Audit</span> <span className="font-semibold text-indigo-600">85%</span></li>
          <li className="flex justify-between items-center text-gray-700"><span>Patient Enrollment</span> <span className="font-semibold text-indigo-600">98%</span></li>
        </ul>
      </div>
    </div>
  </div>
);

/**
 * Manages Digital Wallet Claim Review and Approval.
 */
const ClaimsManagement = () => {
  const [claims, setClaims] = useState(mockClaimsData);

  const updateClaimStatus = (id, newStatus) => {
    setClaims(prevClaims => prevClaims.map(claim =>
      claim.id === id ? { ...claim, status: newStatus } : claim
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-white border-b pb-2 mb-6">
        Digital Wallet Claims Review
      </h2>
      <p className="text-white">Review and approve or reject claims submitted by users for digital wallet reimbursement.</p>

      <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Claim ID', 'User', 'Amount', 'Type', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-indigo-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{claim.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">${claim.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{claim.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {claim.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateClaimStatus(claim.id, 'Approved')}
                        className="text-green-600 hover:text-green-900 transition duration-150 p-1 rounded-full hover:bg-green-100"
                        title="Approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateClaimStatus(claim.id, 'Rejected')}
                        className="text-red-600 hover:text-red-900 transition duration-150 p-1 rounded-full hover:bg-red-100"
                        title="Reject"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {claim.status !== 'Pending' && (
                    <span className="text-gray-400">Action Complete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Manages the creation and editing of RPM Care Plan Templates.
 */
const CarePlanTemplates = () => (
  <div className="space-y-6 p-4 md:p-8">
    <h2 className="text-3xl font-extrabold text-white border-b pb-2 mb-6">
      RPM: Care Plan Templates Management
    </h2>
    <p className="text-white">Define reusable templates for conditions like Hypertension, Diabetes, and COPD.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Template Card 1 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-sky-500">
        <h3 className="text-xl font-semibold mb-2 flex justify-between items-start">
          <span>Hypertension Management</span>
          <span className="text-sm font-normal text-gray-500">V1.2</span>
        </h3>
        <p className="text-gray-600 text-sm">Focuses on daily BP readings, medication adherence, and weekly dietitian check-ins.</p>
        <div className="mt-4 flex space-x-2">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">30-day plan</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">Daily BP</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">Medication</span>
        </div>
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">Edit Template</button>
      </div>

      {/* Template Card 2 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-amber-500">
        <h3 className="text-xl font-semibold mb-2 flex justify-between items-start">
          <span>Diabetes Monitoring</span>
          <span className="text-sm font-normal text-gray-500">V2.0</span>
        </h3>
        <p className="text-gray-600 text-sm">Includes continuous glucose monitoring (CGM) data collection and bi-weekly endocrinologist review.</p>
        <div className="mt-4 flex space-x-2">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">90-day plan</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">CGM</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">Exercise Log</span>
        </div>
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">Edit Template</button>
      </div>
    </div>

    <div className="mt-8">
      <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
        <Icons.FileText className="w-5 h-5 mr-2" />
        Create New Template
      </button>
    </div>
  </div>
);

/**
 * Manages configurable workflows and role-based approvals for RPM processes.
 */
const WorkflowManagement = () => (
  <div className="space-y-6 p-4 md:p-8">
    <h2 className="text-3xl font-extrabold text-white border-b pb-2 mb-6">
      RPM: Configurable Workflows & Approvals
    </h2>
    <p className="text-white">Configure multi-step workflows for critical RPM events like new patient enrollment and critical alert escalations.</p>

    <div className="space-y-4">
      {/* Workflow 1 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <h3 className="text-xl font-semibold mb-3">New Patient Enrollment Workflow</h3>
        <ol className="text-sm text-gray-700 space-y-1">
          <li className="flex items-center"><Icons.Users className="w-4 h-4 mr-2 text-green-600"/> 1. Patient Data Entry (Role: Enrollment Specialist)</li>
          <li className="flex items-center"><Icons.FileText className="w-4 h-4 mr-2 text-green-600"/> 2. Care Plan Assignment (Role: RN/Case Manager)</li>
          <li className="flex items-center"><Icons.ClipboardList className="w-4 h-4 mr-2 text-green-600"/> 3. Device Provisioning (Role: Logistics Admin)</li>
          <li className="flex items-center"><Icons.Stethoscope className="w-4 h-4 mr-2 text-green-600"/> 4. Final Approval (Role: Clinical Lead) <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 ml-2 rounded-full">Requires 24h SLA</span></li>
        </ol>
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">Edit Workflow</button>
      </div>

      {/* Workflow 2 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
        <h3 className="text-xl font-semibold mb-3">Critical Alert Escalation Workflow</h3>
        <ol className="text-sm text-gray-700 space-y-1">
          <li className="flex items-center"><Icons.Users className="w-4 h-4 mr-2 text-red-600"/> 1. Initial Triage (Role: RN Triage)</li>
          <li className="flex items-center"><Icons.FileText className="w-4 h-4 mr-2 text-red-600"/> 2. Physician Notification (Role: Primary Care Physician)</li>
          <li className="flex items-center"><Icons.ClipboardList className="w-4 h-4 mr-2 text-red-600"/> 3. Patient Follow-up (Role: RN Triage) <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 ml-2 rounded-full">Immediate Action</span></li>
        </ol>
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">Edit Workflow</button>
      </div>
    </div>

    <button className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
      <Icons.Settings className="w-5 h-5 mr-2" />
      Define New Workflow
    </button>
  </div>
);

/**
 * Provides reporting and program oversight tools for RPM.
 */
const RPMReporting = () => (
  <div className="space-y-6 p-4 md:p-8">
    <h2 className="text-3xl font-extrabold text-white border-b pb-2 mb-6">
      RPM: Program Reporting & Oversight
    </h2>
    <p className="text-white">Comprehensive view of program health, patient engagement, and financial metrics.</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><Icons.BarChart3 className="w-5 h-5 mr-2 text-teal-600"/> Patient Engagement Rate</h3>
        <p className="text-4xl font-bold text-gray-900">89.5%</p>
        <p className="text-sm text-green-600 mt-2">Up 2.1% from Q3</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><Icons.Wallet className="w-5 h-5 mr-2 text-teal-600"/> Billable Hours (RPM)</h3>
        <p className="text-4xl font-bold text-gray-900">4,120</p>
        <p className="text-sm text-gray-600 mt-2">Total billable minutes last month</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><Icons.Stethoscope className="w-5 h-5 mr-2 text-teal-600"/> Clinical Outcome Score</h3>
        <p className="text-4xl font-bold text-gray-900">7.8 / 10</p>
        <p className="text-sm text-amber-600 mt-2">Focus area for Q4</p>
      </div>
    </div>

    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Patient Risk Stratification</h3>
      <p className="text-center text-gray-500 h-48 flex items-center justify-center">
        [Placeholder for Chart: Patient Count by Risk Level (High, Medium, Low)]
      </p>
    </div>
  </div>
);


/**
 * Renders the appropriate component based on the current page state.
 * @param {string} currentPage - The ID of the currently selected page.
 */
const ContentArea = ({ currentPage }) => {
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'claims':
      return <ClaimsManagement />;
    case 'rpm_careplans':
      return <CarePlanTemplates />;
    case 'rpm_workflows':
      return <WorkflowManagement />;
    case 'rpm_reporting':
      return <RPMReporting />;
    default:
      return <Dashboard />; // Default to Dashboard
  }
};

/**
 * Renders the Navigation Sidebar.
 * @param {string} currentPage - The currently active page ID.
 * @param {function} onNavigate - Function to set the current page.
 * @param {function} onLogout - Function to handle logout.
 */
const Sidebar = ({ currentPage, onNavigate, onLogout }) => (
  <div className="flex flex-col h-full text-white w-74 md:w-58 flex-shrink-0" style={{background: "linear-gradient(to right, #2c3e50, #4ca1af)",}}>
    {/* Logo/Title */}
    <div className="p-6 text-3xl font-extrabold text-white border-b border-gray-700 flex items-center">
      D-Health Admin
    </div>

    {/* Navigation Items */}
    <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const isActive = currentPage === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center w-full p-3 rounded-lg transition duration-200 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        );
      })}
    </nav>

    {/* Logout Button */}
    <div className="p-4 border-t border-gray-700">
      <button
        onClick={onLogout}
        className="flex items-center w-full p-3 text-sm font-medium text-red-400 bg-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
      >
        <Icons.LogIn className="w-5 h-5 mr-3" />
        Log Out
      </button>
    </div>
  </div>
);


// ====================================================================
// 3. MAIN APP COMPONENT
// ====================================================================

/**
 * Main application component handling authentication and routing.
 */
const AdminPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setIsSidebarOpen(false);
  };
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setIsSidebarOpen(false); // Close sidebar after navigating on mobile
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Find the current page name for the header title
  const currentItem = NAV_ITEMS.find(item => item.id === currentPage) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen bg-gray-100 antialiased overflow-hidden" style={{background: "linear-gradient(180deg, #002940 0%, #16376A 34.13%, #154C91 52.88%, #16376A 69.71%, #002940 100%)",}}>
      {/* 1. Static Sidebar (Desktop) */}
      <div className="hidden md:flex">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* 2. Responsive Overlay Sidebar (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 transition-opacity duration-300 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* 3. Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center text-white border-b border-black p-4 shadow-sm flex-shrink-0" style={{minHeight: "85px"}}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg"
            aria-label="Open sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-white transition duration-150">
            {currentItem.name}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white hidden sm:inline">Hello, Admin User</span>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
              AU
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 hidden sm:block p-2 rounded-lg transition duration-200"
              title="Logout"
            >
              <Icons.LogIn className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <ContentArea currentPage={currentPage} />
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
