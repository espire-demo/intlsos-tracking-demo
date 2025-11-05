import React from 'react';
import './HealthCMS.css';
import logo from "../../assets/logo.png";

const HealthCMS = () => {
  return (
    <div className="bg-cms-light min-h-screen font-sans">
      {/* Overall Layout: Sidebar and Main Content */}
      <div className="flex h-screen">
        {/* Left Sidebar: Navigation */}
        <Sidebar />
        
        {/* Main Content Area */}
        <MainContent />
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const navigationItems = {
    main: [
      {
        name: "Dashboard",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        ),
        active: true
      }
    ],
    programContent: [
      {
        name: "Marketplace Catalog",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.414 5.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zM10 17a1 1 0 110-2 1 1 0 010 2zM6.343 14.657l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414z" />
          </svg>
        )
      },
      {
        name: "Care Plan Templates",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H6a2 2 0 01-2-2V4zm6 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        )
      }
    ],
    financeRules: [
      {
        name: "Reimbursement Rules",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 002-2H4zm12 8a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2h12zm-3 2H9v2h4v-2z" />
          </svg>
        )
      },
      {
        name: "Wallet Configuration",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
      }
    ]
  };

  return (
    <aside className="w-64 bg-cms-dark text-white p-4 flex flex-col sticky top-0 h-full">
      <div className="text-2xl font-bold mb-8 border-b border-gray-700 pb-4" style={{margin: "0 auto"}}>
        <img src={logo} alt="Company Logo" width={110} style={{marginBottom: 10}} /> Health CMS
      </div>

      <nav className="space-y-2 flex-grow">
        {/* Main Navigation */}
        {navigationItems.main.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 p-3 rounded-xl ${
              item.active ? 'bg-cms-primary text-cms-dark font-semibold' : 'hover:bg-gray-700 transition duration-150'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
        
        {/* Program & Content Section */}
        <h3 className="text-xs uppercase font-medium text-gray-400 pt-4 pb-1">Program & Content</h3>
        {navigationItems.programContent.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700 transition duration-150"
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
        
        {/* Finance & Rules Section */}
        <h3 className="text-xs uppercase font-medium text-gray-400 pt-4 pb-1">Finance & Rules</h3>
        {navigationItems.financeRules.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700 transition duration-150"
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition duration-150 text-sm"
        >
          <AdminProfileIcon />
          <span>Admin Profile</span>
        </a>
      </div>
    </aside>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <div className="flex-grow p-8 overflow-y-auto">
      {/* Header/Breadcrumb */}
      <Header />
      
      {/* Quick Metrics/CMS Summary */}
      <MetricsSection />
      
      {/* Dynamic Product Catalog Management (Marketplace) */}
      <MarketplaceCatalog />
      
      {/* Claims Reimbursement Rule Management */}
      <ReimbursementRules />
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="mb-8">
      <p className="text-sm text-gray-500">Dashboard / Overview</p>
      <h2 className="text-4xl font-extrabold text-gray-900">Content & Configuration Overview</h2>
    </header>
  );
};

// Metrics Section Component
const MetricsSection = () => {
  const metrics = [
    {
      title: "Active Marketplace Programs",
      value: "45",
      trend: "↑ 5 new programs this month",
      borderColor: "border-cms-primary",
      trendColor: "text-green-600"
    },
    {
      title: "Pending Content Approvals",
      value: "7",
      trend: "Requires review for publication",
      borderColor: "border-red-500",
      trendColor: "text-red-600"
    },
    {
      title: "Active Reimbursement Rules",
      value: "128",
      trend: "Last updated 2 hours ago",
      borderColor: "border-blue-500",
      trendColor: "text-blue-600"
    },
    {
      title: "Care Plan Templates",
      value: "18",
      trend: "Used by 80% of providers",
      borderColor: "border-green-500",
      trendColor: "text-gray-500"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${metric.borderColor}`}
        >
          <p className="text-sm font-medium text-gray-500">{metric.title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
          <p className={`text-xs ${metric.trendColor} mt-2`}>{metric.trend}</p>
        </div>
      ))}
    </section>
  );
};

// Marketplace Catalog Component
const MarketplaceCatalog = () => {
  const programs = [
    {
      title: "Mindful Resilience Course",
      category: "Wellness (Mental Health)",
      status: "Published",
      statusColor: "bg-green-100 text-green-800",
      lastEdit: "Oct 4, 2024",
      actions: ["Edit", "Archive"]
    },
    {
      title: "Pediatrician Video Consults",
      category: "OPD / Clinical Care",
      status: "Draft",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastEdit: "Oct 8, 2024",
      actions: ["Edit", "Publish"]
    },
    {
      title: "At-Home Blood Test Panel",
      category: "Ancillary Services",
      status: "Published",
      statusColor: "bg-green-100 text-green-800",
      lastEdit: "Sep 20, 2024",
      actions: ["Edit", "Archive"]
    }
  ];

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg mb-10">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-2xl font-bold text-gray-800">Marketplace Catalog Management</h3>
        <button className="bg-cms-primary text-cms-dark px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition duration-150 shadow-md flex items-center space-x-2">
          <AddIcon />
          <span>Add New Program</span>
        </button>
      </div>
      
      {/* Content Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Edit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {program.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {program.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${program.statusColor}`}>
                    {program.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {program.lastEdit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {program.actions.map((action, actionIndex) => (
                    <a
                      key={actionIndex}
                      href="#"
                      className={`${
                        action === 'Edit' ? 'text-blue-600 hover:text-blue-900' :
                        action === 'Archive' ? 'text-red-600 hover:text-red-900' :
                        'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {action}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// Reimbursement Rules Component
const ReimbursementRules = () => {
  const rules = [
    {
      id: "R-001",
      title: "Annual Wellness Checkup",
      description: "Max Reimbursement: **$250.00**. Eligibility: Once per plan year."
    },
    {
      id: "R-015",
      title: "Vision/Dental Co-pay",
      description: "Co-pay covered up to **$50.00** per visit. Max 4 visits per family member."
    }
  ];

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-2xl font-bold text-gray-800">Reimbursement Rule Engine</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-150 shadow-md flex items-center space-x-2">
          <CreateRuleIcon />
          <span>Create New Rule</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-900">Rule ID: {rule.id} | {rule.title}</p>
              <p className="text-sm text-gray-600">{rule.description}</p>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Configure &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

// SVG Icon Components
const AdminProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-.15-.77-.32-1.14-.52 0 0-1.42.6-2.58 1.12l-.65.29c-.19.09-.38.16-.58.21-.08.02-.17.03-.25.04l-2.06.33c-.32.05-.63.03-.94-.03L.8 4.29A1 1 0 001.2 5.86l.66.11c.17.02.34.03.51.01l2.43-.37c.3-.04.59.04.87.28.18.15.36.31.54.49l.65.65c.44.44.9.85 1.37 1.25.47.4.95.77 1.44 1.13.1.07.2.14.3.2.04.03.07.06.11.08.4.3.82.57 1.26.82.22.13.43.23.65.34.22.10.44.18.67.24.23.07.47.10.71.10.25 0 .48-.03.7-.09l2.43-.37c.17-.02.34-.03.51-.01l.66-.11a1 1 0 00.4-.64V13.5a1.5 1.5 0 00-1.5-1.5H10a.5.5 0 000 1h4.5a.5.5 0 01.5.5V16a1.5 1.5 0 01-1.5 1.5H5.5a1.5 1.5 0 01-1.5-1.5v-2.5a.5.5 0 00-.5-.5H2a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h2a.5.5 0 00.5-.5V8.29a.5.5 0 01.5-.5h.21c.21 0 .41-.08.56-.23l.65-.65c.18-.18.36-.34.54-.49.28-.24.57-.32.87-.28l2.43.37c.17.02.34.03.51.01l.66-.11a1 1 0 00.4-.64V5.86a1 1 0 00-.4-.64l-2.06-.33c-.08-.01-.17-.02-.25-.04z" clipRule="evenodd" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const CreateRuleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V6z" />
  </svg>
);

export default HealthCMS;