import React, { useState, useMemo } from 'react';
import { LogIn, PieChart, Wallet, Activity, Shield, LayoutDashboard, User, AlertCircle, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';

// --- Configuration and Mock Data ---

// Professional, modern color palette inspired by enterprise applications
const primaryColor = '#0078d4'; // Azure Blue
const accentColor = '#00a4ef'; // Lighter Blue
const textColor = '#1f2937';

const mockUserData = {
    id: 'empl-admin-789',
    name: 'Sarah Chen',
    company: 'Innovatech Global',
    role: 'HR Benefits Administrator',
};

const mockDashboardData = {
    // Aggregated Usage
    teleconsults: 450,
    pharmacyScripts: 1200,
    usageRate: 68, // Percentage of eligible employees
    
    // Digital Wallet & Claims
    walletBalance: 250000,
    claimsPaidYTD: 185000,
    claimsPending: 15,
    
    // Population Health Metrics (Aggregated, non-clinical)
    preventativeScreenings: 72, // % compliance
    avgCostPerMember: 480.55,
};

// Mock function for simple chart data (used for visualization mock)
const generateMockChartData = (label) => [
    { name: 'Q1', [label]: Math.floor(Math.random() * 500) + 100 },
    { name: 'Q2', [label]: Math.floor(Math.random() * 500) + 200 },
    { name: 'Q3', [label]: Math.floor(Math.random() * 500) + 300 },
    { name: 'Q4', [label]: Math.floor(Math.random() * 500) + 400 },
];

// --- Utility Components ---

const Card = ({ title, value, icon: Icon, colorClass = 'text-primary', className = '' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className}`}>
        <div className="flex items-start justify-between">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
            <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <p className={`mt-3 text-4xl font-extrabold ${colorClass}`}>{value}</p>
    </div>
);

const SectionTitle = ({ title, description }) => (
    <div className="mb-6 border-b pb-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">{description}</p>
    </div>
);

// --- Feature Components ---

/**
 * Renders the primary dashboard view for aggregated usage, wallet, and claims.
 * Includes placeholder for a chart visualization.
 */
const AnalyticsDashboard = () => (
    <div>
        <SectionTitle 
            title="Real-Time Utilization & Claims Analytics" 
            description="View aggregated usage of teleconsultation and pharmacy services alongside wallet and claims utilization."
        />
        
        {/* Aggregated Usage and Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card 
                title="Total Teleconsults" 
                value={mockDashboardData.teleconsults.toLocaleString()} 
                icon={PieChart} 
                colorClass="text-primary"
            />
            <Card 
                title="Total Pharmacy Scripts" 
                value={mockDashboardData.pharmacyScripts.toLocaleString()} 
                icon={PieChart} 
                colorClass="text-indigo-500"
            />
            <Card 
                title="YTD Claims Paid" 
                value={`$${(mockDashboardData.claimsPaidYTD / 1000).toFixed(0)}K`} 
                icon={DollarSign} 
                colorClass="text-green-600"
            />
            <Card 
                title="Active Usage Rate" 
                value={`${mockDashboardData.usageRate}%`} 
                icon={TrendingUp} 
                colorClass="text-yellow-600"
            />
        </div>

        {/* Wallet Utilization and Placeholder Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Quarterly Service Utilization Trend</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-dashed border-2 border-gray-300">
                    <p className="text-gray-500">
                        [Placeholder for D3.js or Recharts Visualization]
                        <br/>
                        Showing Teleconsult & Pharmacy usage over time.
                    </p>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Digital Wallet Status</h3>
                <div className="space-y-4">
                    <p className="text-lg font-medium text-gray-700">Real-Time Balance:</p>
                    <p className="text-5xl font-extrabold text-green-600">${mockDashboardData.walletBalance.toLocaleString()}</p>
                    <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-gray-600 flex justify-between items-center">
                            Claims Pending: 
                            <span className="text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1"/> {mockDashboardData.claimsPending}
                            </span>
                        </p>
                        <p className="text-sm font-semibold text-gray-600 mt-2">
                            Claims Processed (30 days): $15,200
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/**
 * Renders the Population Health section with the EMR deeplink context.
 */
const PopulationHealth = () => (
    <div>
        <SectionTitle 
            title="Actionable Population Health Analytics" 
            description="View high-level, actionable population metrics updated via EMR deeplink integration."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card 
                title="Preventative Screenings" 
                value={`${mockDashboardData.preventativeScreenings}%`} 
                icon={Shield} 
                colorClass="text-teal-600"
                className="bg-teal-50"
            />
            <Card 
                title="Avg. Cost Per Member (ACPM)" 
                value={`$${mockDashboardData.avgCostPerMember.toFixed(2)}`} 
                icon={DollarSign} 
                colorClass="text-orange-600"
                className="bg-orange-50"
            />
        </div>
        
        <div className="p-8 bg-white rounded-xl shadow-xl border-l-4 border-primary">
            <h3 className="text-2xl font-bold text-primary mb-3">EMR Deeplink with Context</h3>
            <p className="text-gray-700 mb-4">
                These population-level insights are derived from the integrated Electronic Medical Record (EMR) system, providing a high-level view of population trends without revealing individual patient data.
            </p>
            <p className="text-sm italic text-gray-500 mb-6">
                *The data displayed here is aggregated, anonymized, and updated in real-time as new EMR data flows into our analytics engine.
            </p>
            
            <a href="#" className="inline-flex items-center text-white bg-primary hover:bg-blue-600 font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
                View Detailed Population Insights Report 
                <ExternalLink className="w-5 h-5 ml-2" />
            </a>
        </div>
    </div>
);

/**
 * Renders the Consent and Audit Trail section.
 */
const AuditTrail = () => {
    const mockAuditLog = [
        { id: 1, timestamp: '2025-10-30 14:20', activity: 'Downloaded Claims Report Q3 2025.', user: 'SChen' },
        { id: 2, timestamp: '2025-10-30 10:45', activity: 'Updated Policy Settings (Cost Thresholds).', user: 'JDoe' },
        { id: 3, timestamp: '2025-10-29 16:10', activity: 'Accessed EMR Deeplink to view Population Health data.', user: 'SChen' },
        { id: 4, timestamp: '2025-10-28 09:30', activity: 'Login successful.', user: 'SChen' },
    ];

    return (
        <div>
            <SectionTitle 
                title="Consent & Audit Trail" 
                description="Review all administrative activities. Strict consent policies block access to clinical data."
            />
            
            <div className="p-6 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500 mb-6">
                <h3 className="text-xl font-bold text-red-700 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2" /> Clinical Data Access Blocked
                </h3>
                <p className="text-red-600 mt-2">
                    As an Employer Admin, you have access to aggregated activity and financial data only. **Individual clinical records, medical diagnoses, and private patient health information (PHI) are strictly inaccessible** as mandated by consent and privacy regulations.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Data</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockAuditLog.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{log.activity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


/**
 * The main Employer Admin Dashboard layout.
 */
const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('analytics');

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <AnalyticsDashboard />;
            case 'population':
                return <PopulationHealth />;
            case 'audit':
                return <AuditTrail />;
            default:
                return <AnalyticsDashboard />;
        }
    };

    const tabs = [
        { id: 'analytics', label: 'Usage & Claims', icon: LayoutDashboard },
        { id: 'population', label: 'Population Health', icon: TrendingUp },
        { id: 'audit', label: 'Consent & Audit Trail', icon: Shield },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar Navigation */}
            <nav className="hidden md:flex flex-col w-64 bg-bg-dark text-white p-6 shadow-2xl">
                <div className="text-2xl font-extrabold mb-10 text-secondary">
                    Client Portal
                </div>
                <div className="space-y-4 flex-grow">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-primary shadow-lg font-bold'
                                    : 'hover:bg-blue-800'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
                {/* User Info / Logout */}
                <div className="pt-6 border-t border-blue-800">
                    <div className="flex items-center mb-4 p-2 rounded-lg bg-blue-800/50">
                        <User className="w-5 h-5 mr-2 text-secondary" />
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
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
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

                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome, {user.name}</h1>
                <p className="text-lg text-gray-500 mb-8">{user.company} Administrator Dashboard</p>

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        // Simple mock login logic
        if (username === 'admin' && password === 'password') {
            onLogin(mockUserData);
        } else {
            setError('Invalid credentials. Try "admin" and "password".');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-primary">
                <div className="flex justify-center mb-6">
                    <LayoutDashboard className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Client Portal Login</h2>
                <p className="text-center text-gray-500 mb-8">Employer Admin Access</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
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
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg shadow-blue-200"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                    </button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-6">Use "admin" and "password" to access the demo.</p>
            </div>
        </div>
    );
};

/**
 * Main application component.
 */
const ClientPortal = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    // Use useMemo to prevent unnecessary re-renders of the main view
    const mainView = useMemo(() => {
        if (user) {
            return <Dashboard user={user} onLogout={handleLogout} />;
        }
        return <LoginPage onLogin={handleLogin} />;
    }, [user]);

    return (
        <div className="font-sans" style={{ '--primary': primaryColor, '--accent': accentColor, '--text': textColor }}>
            {mainView}
        </div>
    );
};

export default ClientPortal;
