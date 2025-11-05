import React from 'react';
import './DatanAnalyticsReporting.css';
import logo from "../../assets/logo.png";

const DataAnalyticsDashboard = () => {
  return (
    <div className="bg-analytics-bg min-h-screen font-sans">
      {/* Header / Navigation */}
      <header className="bg-analytics-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold"><img src={logo} alt="Company Logo" width={110} style={{display: 'inline-block', marginRight: 15}} /> Data Insights Hub</h1>
          <nav className="flex space-x-4">
            <button className="bg-analytics-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-150 shadow-md">
              Generate Ad-Hoc Report
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Data, Analytics & Reporting</h2>

        {/* Quick Metrics: Engagement & Utilization */}
        <MetricsSection />
        
        {/* Main Dashboard Insight (Employer/Admin View) */}
        <DashboardInsightSection />
        
        {/* Data Pipeline Health & Configuration */}
        <DataPipelineSection />
      </main>

      {/* Footer for context */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm">
          &copy; 2025, Espire Infolabs Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

// Metrics Section Component
const MetricsSection = () => {
  const metrics = [
    {
      title: "Active Member Enrollment",
      value: "12,450",
      trend: "↑ 1.2% Month-over-Month",
      color: "border-analytics-primary",
      trendColor: "text-green-600"
    },
    {
      title: "Virtual Care Utilization",
      value: "68%",
      trend: "Target: 75%. Needs boosting.",
      color: "border-yellow-500",
      trendColor: "text-yellow-600"
    },
    {
      title: "Digital Claims Processed",
      value: "2,104",
      trend: "Last 7 days (99.8% success)",
      color: "border-teal-500",
      trendColor: "text-teal-600"
    },
    {
      title: "Employer Satisfaction (NPS)",
      value: "+55",
      trend: "Goal: +60. Strong Promoters.",
      color: "border-indigo-500",
      trendColor: "text-indigo-600"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, index) => (
        <div key={index} className={`bg-white panel p-6 border-l-4 ${metric.color}`}>
          <p className="text-sm font-medium text-gray-500">{metric.title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">{metric.value}</p>
          <p className={`text-xs ${metric.trendColor} mt-2`}>{metric.trend}</p>
        </div>
      ))}
    </section>
  );
};

// Dashboard Insight Section Component
const DashboardInsightSection = () => {
  return (
    <section className="bg-white panel p-6 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <ChartIcon />
        <span>Cost Savings by Wellness Engagement (Q3)</span>
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Visualizing the direct financial impact of actively enrolled members in the Marketplace Wellness programs.
      </p>

      {/* Chart Placeholder (Replace with actual chart library like D3/Recharts) */}
      <div className="chart-placeholder rounded-lg">
        Placeholder for Interactive Cost Savings / Engagement Chart
      </div>
      
      <div className="mt-4 flex justify-between items-center pt-3 border-t">
        <p className="text-lg font-semibold text-gray-700">
          Estimated Total Savings: <span className="text-green-600">$452,100</span>
        </p>
        <button className="text-analytics-primary hover:text-blue-700 font-semibold text-sm">
          Drill Down to Department View &rarr;
        </button>
      </div>
    </section>
  );
};

// Data Pipeline Section Component
const DataPipelineSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Data Digitization (OCR) & Data Lake Health Status */}
      <div className="lg:col-span-2 bg-white panel p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <PipelineIcon />
          <span>Data Pipeline Health (Data Lake & OCR)</span>
        </h3>
        
        <PipelineStatusList />
        
        <button className="mt-4 text-sm font-semibold text-gray-500 hover:text-gray-700">
          Manage OCR Queue &rarr;
        </button>
      </div>

      {/* Personalization Engine Configuration */}
      <PersonalizationEngine />
    </section>
  );
};

// Pipeline Status List Component
const PipelineStatusList = () => {
  const statusItems = [
    {
      status: "Operational (100% SLA)",
      message: "Centralized Data Lake Status:",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      status: "35 Documents Pending",
      message: "OCR Digitization Queue:",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 112 0v5a1 1 0 11-2 0v-5zm-1-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <ul className="space-y-4">
      {statusItems.map((item, index) => (
        <li key={index} className={`flex justify-between items-center p-3 ${item.bgColor} rounded-lg`}>
          <div className="flex items-center space-x-3">
            <span className={item.textColor}>
              {item.icon}
            </span>
            <span className="font-medium text-gray-900">{item.message}</span>
          </div>
          <span className="text-sm font-semibold text-green-600">{item.status}</span>
        </li>
      ))}
    </ul>
  );
};

// Personalization Engine Component
const PersonalizationEngine = () => {
  const ruleSets = [
    { name: "High-Risk Diabetes Alert", triggers: "4,120 Triggers" },
    { name: "New Parent Enrollment", triggers: "1,050 Triggers" }
  ];

  return (
    <div className="bg-white panel p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <SettingsIcon />
        <span>Personalization Engine</span>
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Configure rules for targeted content and program recommendations based on member data.
      </p>

      <div className="space-y-3">
        <p className="font-medium text-gray-900">Active Rule Sets:</p>
        {ruleSets.map((rule, index) => (
          <div key={index} className="flex items-center justify-between text-sm bg-purple-50 p-2 rounded-md">
            <span>{rule.name}</span>
            <span className="text-purple-700 font-semibold">{rule.triggers}</span>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-purple-600 text-white p-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-150">
        Manage Personalization Rules
      </button>
    </div>
  );
};

// SVG Icon Components
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-analytics-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const PipelineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10l2-2h8a2 2 0 002-2V9a2 2 0 00-2-2H6l-2-2zm0 0h12m-4 4h4" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default DataAnalyticsDashboard;