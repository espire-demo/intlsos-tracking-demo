import React, { useState } from 'react';
import './DigitalHeathWallet.css';
import logo from "../../assets/logo.png";

const DigitalHealthWallet = () => {
  const [transferAmount, setTransferAmount] = useState('');

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Wallet Summary & Actions */}
        <WalletSummary />
        
        {/* Funding Options */}
        <FundingOptions 
          transferAmount={transferAmount}
          setTransferAmount={setTransferAmount}
        />
        
        {/* Claims Reimbursement Management */}
        <ClaimsManagement />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-nowrap justify-between">
        <div>
          <img src={logo} alt="Company Logo" width={110} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-wallet-dark">Digital Health Wallet</h1>
          <p className="text-sm text-gray-500">Manage your cashless funds and reimbursement claims seamlessly.</p>
        </div>
      </div>
    </header>
  );
};

// Wallet Summary Component
const WalletSummary = () => {
  const quickStats = [
    {
      title: "Last Transaction",
      amount: "-$79.00",
      description: "Dietitian Session (Wellness)",
      borderColor: "border-wallet-primary",
      textColor: "text-wallet-primary"
    },
    {
      title: "Pending Claims",
      amount: "2 Items",
      description: "Totaling $215.50",
      borderColor: "border-wallet-secondary",
      textColor: "text-wallet-secondary"
    }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      {/* Wallet Balance Card */}
      <div className="lg:col-span-2 bg-wallet-dark text-white p-8 card shadow-xl flex flex-col justify-between">
        <h2 className="text-xl font-semibold opacity-80 mb-2">Available Cashless Balance</h2>
        <div className="flex items-end justify-between border-b border-gray-600 pb-4 mb-4">
          <p className="text-6xl font-bold tracking-tight">$1,450.<span className="text-4xl">00</span></p>
          <span className="text-sm bg-wallet-primary/70 px-3 py-1 rounded-full font-medium">HSA/FSA Eligible</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <WalletAction 
            icon={<FundingIcon />}
            text="Add/Fund Wallet"
            className="bg-wallet-primary hover:bg-wallet-primary/80"
          />
          <WalletAction 
            icon={<PaymentIcon />}
            text="Make Cashless Payment"
            className="bg-wallet-secondary hover:bg-wallet-secondary/80"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        {quickStats.map((stat, index) => (
          <div key={index} className={`bg-white p-5 card border-l-4 ${stat.borderColor}`}>
            <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.amount}</p>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Wallet Action Button Component
const WalletAction = ({ icon, text, className }) => {
  return (
    <button className={`flex-1 text-white p-4 rounded-lg font-semibold transition duration-150 flex items-center justify-center space-x-2 ${className}`}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

// Funding Options Component
const FundingOptions = ({ transferAmount, setTransferAmount }) => {
  const fundingOptions = [
    {
      icon: "💸",
      title: "Payroll Deduction (Automated)",
      description: "You currently contribute **$100.00** per paycheck, automatically increasing your balance.",
      buttonText: "Manage Settings &rarr;",
      buttonClass: "text-wallet-secondary font-medium hover:text-blue-700 text-sm",
      type: "managed"
    },
    {
      icon: "🏦",
      title: "One-Time Bank Transfer",
      description: "",
      buttonText: "Transfer Now",
      buttonClass: "w-full bg-wallet-secondary text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition duration-150",
      type: "transfer",
      input: true
    },
    {
      icon: "💳",
      title: "Credit/Debit Card",
      description: "Add funds instantly using your linked card ending in **4012** (No service fee).",
      buttonText: "Top Up with Card",
      buttonClass: "w-full bg-gray-200 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-300 transition duration-150",
      type: "card"
    }
  ];

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-5">Funding & Contributions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fundingOptions.map((option, index) => (
          <FundingOptionCard 
            key={index}
            option={option}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
          />
        ))}
      </div>
    </section>
  );
};

// Individual Funding Option Card
const FundingOptionCard = ({ option, transferAmount, setTransferAmount }) => {
  const getIconColor = (icon) => {
    switch(icon) {
      case "💸": return "text-green-600";
      case "🏦": return "text-blue-600";
      case "💳": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 card border-2 border-gray-200 hover:border-wallet-secondary transition duration-200">
      <div className="flex items-center space-x-3 mb-3">
        <span className={`text-2xl ${getIconColor(option.icon)}`}>{option.icon}</span>
        <h4 className="text-lg font-semibold text-gray-900">{option.title}</h4>
      </div>
      
      {option.description && (
        <p className="text-sm text-gray-600 mb-4">{option.description}</p>
      )}
      
      {option.input && (
        <input 
          type="number" 
          placeholder="Enter amount ($)" 
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-gray-800"
        />
      )}
      
      <button className={option.buttonClass}>
        {option.buttonText}
      </button>
    </div>
  );
};

// Claims Management Component
const ClaimsManagement = () => {
  const claims = [
    {
      date: "2024-10-01",
      service: "Chiropractic Visit",
      amount: "$85.00",
      status: "Approved",
      statusClass: "bg-wallet-primary/10 text-wallet-primary",
      action: "View Details",
      actionClass: "text-wallet-secondary hover:text-blue-700"
    },
    {
      date: "2024-09-25",
      service: "Prescription Refill",
      amount: "$45.50",
      status: "Pending Review",
      statusClass: "bg-yellow-100 text-yellow-800",
      action: "Upload Docs",
      actionClass: "text-red-500 hover:text-red-700"
    },
    {
      date: "2024-09-10",
      service: "Gym Membership (Denied)",
      amount: "$300.00",
      status: "Denied",
      statusClass: "bg-red-100 text-red-800",
      action: "Appeal",
      actionClass: "text-wallet-secondary hover:text-blue-700"
    }
  ];

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-5">Claims Reimbursement Management</h3>
      
      <div className="bg-white p-6 card">
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-700">Recent Claims Status</h4>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 text-sm shadow">
            Submit New Claim
          </button>
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{claim.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${claim.statusClass}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className={claim.actionClass}>{claim.action}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm">
        &copy; 2025, Espire Infolabs Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

// SVG Icon Components
const FundingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const PaymentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

export default DigitalHealthWallet;