import React, { useState } from 'react';
import logo from "../../assets/logo.png";

const HealthWellnessMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [activeCategory, setActiveCategory] = useState('wellness');

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header & Hero Section */}
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Marketplace Title and Search/Filter */}
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Main Content: Filters and Dynamic Catalog */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar: Categorized Services Filter */}
          <CategorySidebar 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          {/* Right Content: Dynamic Product Catalog */}
          <ProductCatalog />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary-teal">
            <img src={logo} alt="Company Logo" width={110} style={{display: 'inline-block', marginRight: 15}} /> Health Solutions Hub
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-accent-indigo transition duration-150">My Benefits</a>
          <a href="#" className="hover:text-accent-indigo transition duration-150">Favorites</a>
          <a href="#" className="text-white bg-accent-indigo px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md">Profile</a>
        </nav>
      </div>
    </header>
  );
};

// Search Section Component
const SearchSection = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Program Marketplace</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">Find curated, high-quality programs and services across various categories to support your complete health journey.</p>
      
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search programs, providers, or conditions (e.g., 'sleep coaching', 'physiotherapy')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-xl focus:ring-primary-teal focus:border-primary-teal transition duration-150 shadow-sm"
        />
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-primary-teal focus:border-primary-teal"
        >
          <option value="recommended">Sort by: Recommended</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="price">Price (Low to High)</option>
        </select>
        
        <button className="bg-primary-teal text-white p-3 rounded-xl font-semibold hover:bg-teal-700 transition duration-150 shadow-md flex items-center justify-center space-x-2">
          <SearchIcon />
          <span>Search</span>
        </button>
      </div>
    </section>
  );
};

// Category Sidebar Component
const CategorySidebar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    {
      id: 'ancillary',
      name: 'Ancillary Services',
      iconColor: 'text-accent-indigo',
      items: [
        'Lab Testing & Diagnostics',
        'Imaging Services',
        'Home Healthcare'
      ]
    },
    {
      id: 'opd',
      name: 'OPD / Clinical Care',
      iconColor: 'text-gray-500',
      items: [
        'Telemedicine Consultations',
        'Specialist Referrals',
        'Chronic Disease Management'
      ],
      activeItem: 'Telemedicine Consultations'
    },
    {
      id: 'wellness',
      name: 'Wellness & Prevention',
      iconColor: 'text-primary-teal',
      items: [
        'Mental Health & Therapy',
        'Fitness & Nutrition Coaching',
        'Sleep & Stress Management'
      ]
    }
  ];

  return (
    <aside className="lg:w-1/4 p-6 bg-white rounded-xl shadow-lg h-full lg:sticky lg:top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Categorized Services</h3>

      <ul className="space-y-4">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onToggle={() => setActiveCategory(activeCategory === category.id ? '' : category.id)}
          />
        ))}
      </ul>

      <button className="mt-8 w-full bg-gray-100 text-gray-700 p-3 rounded-xl font-medium hover:bg-gray-200 transition duration-150 border-2 border-dashed border-gray-300">
        + Suggest a New Service
      </button>
    </aside>
  );
};

// Individual Category Item Component
const CategoryItem = ({ category, isActive, onToggle }) => {
  return (
    <li className="group">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-accent-indigo transition duration-150"
        style={{ color: isActive ? (category.id === 'wellness' ? '#14b8a6' : '#4f46e5') : '' }}
      >
        <span>{category.name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''} ${category.iconColor}`}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <ul className={`mt-2 space-y-2 text-sm text-gray-600 ml-4 border-l pl-3 ${isActive ? '' : 'hidden'}`}>
        {category.items.map((item, index) => (
          <li key={index}>
            <a 
              href="#" 
              className={`hover:text-primary-teal ${
                category.activeItem === item ? 'font-semibold text-primary-teal' : ''
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

// Product Catalog Component
const ProductCatalog = () => {
  const programs = [
    {
      id: 1,
      title: "Mindful Resilience Course",
      category: "Mental Health",
      categoryColor: "bg-accent-indigo",
      borderColor: "border-accent-indigo",
      description: "A 6-week online course focused on reducing stress and improving emotional regulation through CBT and mindfulness techniques.",
      price: "$49 / month",
      rating: "★★★★★ (4.9)",
      buttonText: "Enroll Now",
      buttonColor: "bg-primary-teal hover:bg-teal-700"
    },
    {
      id: 2,
      title: "Personalized 12-Week Training",
      category: "Fitness",
      categoryColor: "bg-primary-teal",
      borderColor: "border-primary-teal",
      description: "Access to a dedicated personal trainer via video calls, customized workout plans, and daily activity tracking.",
      price: "Covered by Plan",
      rating: "★★★★☆ (4.5)",
      buttonText: "View Details",
      buttonColor: "bg-accent-indigo hover:bg-indigo-700"
    },
    {
      id: 3,
      title: "Dietitian-Led Meal Planning",
      category: "Nutrition",
      categoryColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
      description: "Get a one-on-one consultation with a registered dietitian and weekly tailored meal plans for specific health goals.",
      price: "$79 / session",
      rating: "★★★★★ (5.0)",
      buttonText: "Book Session",
      buttonColor: "bg-primary-teal hover:bg-teal-700"
    },
    {
      id: 4,
      title: "At-Home Blood Test Panel",
      category: "Diagnostics (Ancillary)",
      categoryColor: "bg-pink-500",
      borderColor: "border-pink-500",
      description: "Convenient, physician-reviewed blood test for comprehensive metabolic, vitamin D, and cholesterol markers.",
      price: "$25 Co-pay",
      rating: "★★★★☆ (4.6)",
      buttonText: "Order Kit",
      buttonColor: "bg-accent-indigo hover:bg-indigo-700"
    },
    {
      id: 5,
      title: "Pediatrician Video Consults",
      category: "Telehealth (OPD)",
      categoryColor: "bg-blue-500",
      borderColor: "border-blue-500",
      description: "24/7 access to board-certified pediatricians for quick advice on non-emergency symptoms and prescriptions.",
      price: "No Cost",
      rating: "★★★★★ (4.8)",
      buttonText: "Start Chat",
      buttonColor: "bg-primary-teal hover:bg-teal-700"
    },
    {
      id: 6,
      title: "Digital Sleep Coach App",
      category: "Sleep Management",
      categoryColor: "bg-purple-500",
      borderColor: "border-purple-500",
      description: "Uses wearable data (mock) to provide personalized sleep hygiene recommendations and audio programs.",
      price: "1-Month Free",
      rating: "★★★★☆ (4.4)",
      buttonText: "Activate Trial",
      buttonColor: "bg-primary-teal hover:bg-teal-700"
    }
  ];

  return (
    <section className="lg:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Featured Wellness Programs (12 Results)</h3>
        <span className="text-sm text-gray-500">Showing personalized recommendations</span>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
};

// Individual Program Card Component
const ProgramCard = ({ program }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-4 ${program.borderColor} hover:shadow-xl transition duration-300`}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider text-white ${program.categoryColor} px-3 py-1 rounded-full`}>
            {program.category}
          </span>
          <span className="text-yellow-500 text-sm">{program.rating}</span>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{program.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary-teal">{program.price}</p>
          <button className={`text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 shadow ${program.buttonColor}`}>
            {program.buttonText}
          </button>
        </div>
      </div>
    </div>
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
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

export default HealthWellnessMarketplace;