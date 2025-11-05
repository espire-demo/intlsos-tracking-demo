import React, { useState, useEffect, useRef } from 'react';
import './EngagementnpersonalizationhealthHub.css';
import logo from "../../assets/logo.png";

const HealthHub = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: "Hello! I'm your personalized AI Health Assistant. I can help you with scheduling, understanding your PHR, or answering general health questions. How can I assist you today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesEndRef = useRef(null);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponses = [
          "I understand your concern about that. Based on your health data, I recommend discussing this with your healthcare provider during your next appointment.",
          "That's a great question! I can help you understand your recent lab results or schedule a follow-up appointment.",
          "I notice you've been consistent with your health goals. Keep up the great work!",
          "For medication-related questions, it's always best to consult directly with your pharmacist or prescribing doctor."
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-nowrap justify-between mb-8">
          <div>
            <img src={logo} alt="Company Logo" width={110} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Personalized Health Hub Demo</h1>
            <p className="text-gray-600">Engagement & Personalization Features for Modern Healthcare</p>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap justify-start md:justify-center space-x-2 md:space-x-4 border-b border-gray-200 mb-6">
            {[
              { id: 'onboarding', label: '1. Onboarding' },
              { id: 'phr', label: '2. Personal Health Record' },
              { id: 'booking', label: '3. Appointment Booking' },
              { id: 'gamification', label: '4. Gamification' },
              { id: 'wearables', label: '5. Wearables Integration' },
              { id: 'ai-chat', label: '6. AI Support Chat' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`tab-button p-3 px-4 text-sm md:text-base text-gray-500 hover:text-primary whitespace-nowrap ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div id="demo-content">
          {/* 1. Onboarding */}
          {activeTab === 'onboarding' && <OnboardingTab />}

          {/* 2. Personal Health Record (PHR) */}
          {activeTab === 'phr' && <PHRTab />}

          {/* 3. Appointment Booking */}
          {activeTab === 'booking' && <AppointmentBookingTab />}

          {/* 4. Gamification */}
          {activeTab === 'gamification' && <GamificationTab />}

          {/* 5. Wearables Integration */}
          {activeTab === 'wearables' && <WearablesTab />}

          {/* 6. AI Support Chat */}
          {activeTab === 'ai-chat' && (
            <AIChatTab
              chatMessages={chatMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
              isLoading={isLoading}
              messagesEndRef={chatMessagesEndRef}
            />
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 bg-white rounded-xl shadow-2xl flex items-center space-x-3">
            <div className="spinner border-4 border-gray-200 border-t-4 rounded-full w-8 h-8"></div>
            <span className="text-lg font-medium text-gray-700">AI is thinking...</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm">
          &copy; 2025, Espire Infolabs Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

// Tab Components
const OnboardingTab = () => (
  <div className="tab-pane card bg-white p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-primary mb-6">1. Personalized Onboarding</h2>
    <div className="p-8 border border-indigo-200 rounded-xl bg-indigo-50">
      <div className="text-center">
        <div className="text-4xl mb-4">👋</div>
        <h3 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, Jane Doe!</h3>
        <p className="text-gray-600 mb-6">Let's set up your profile to customize your health journey.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Profile Setup Progress</span>
          <span>66% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-secondary h-2.5 rounded-full" style={{ width: '66%' }}></div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4 max-w-md mx-auto">
        {[
          { completed: true, label: 'Complete Basic Info' },
          { completed: true, label: 'Set Health Goals' },
          { completed: false, current: true, label: 'Connect Wearable Device (Current Step)' },
          { completed: false, disabled: true, label: 'Review Personalized Plan' }
        ].map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 bg-white rounded-lg shadow ${
              step.current ? 'shadow-md border-2 border-primary' : ''
            } ${step.disabled ? 'opacity-50' : ''}`}
          >
            <input
              type="checkbox"
              checked={step.completed}
              disabled={step.disabled}
              className={`form-checkbox h-5 w-5 rounded ${
                step.current ? 'text-primary' : 'text-secondary'
              }`}
              onChange={() => {}}
            />
            <span className={`text-lg ${step.current ? 'font-medium text-primary' : 'text-gray-800'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PHRTab = () => (
  <div className="tab-pane card bg-white p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-primary mb-6">2. Personal Health Record (PHR) Dashboard</h2>
    
    {/* Summary Cards */}
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500 shadow-md">
        <p className="text-sm font-medium text-blue-600">Blood Pressure (Avg)</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">120/80</p>
        <p className="text-xs text-gray-500">Normal Range. Last updated yesterday.</p>
      </div>
      <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-500 shadow-md">
        <p className="text-sm font-medium text-red-600">Glucose (Fasting)</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">105 <span className="text-xl">mg/dL</span></p>
        <p className="text-xs text-gray-500">Slightly elevated. Review diet plan.</p>
      </div>
      <div className="bg-green-50 p-5 rounded-xl border-l-4 border-secondary shadow-md">
        <p className="text-sm font-medium text-secondary">Immunization Status</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">Up to Date</p>
        <p className="text-xs text-gray-500">Flu shot scheduled for next month.</p>
      </div>
    </div>

    {/* Records Table */}
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Lab Results</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-4 whitespace-nowrap">2024-09-01</td>
              <td className="px-4 py-4 whitespace-nowrap">Cholesterol Panel</td>
              <td className="px-4 py-4 whitespace-nowrap font-medium text-secondary">Optimal</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button className="text-primary hover:underline text-sm">View PDF</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap">2024-07-15</td>
              <td className="px-4 py-4 whitespace-nowrap">Vitamin D</td>
              <td className="px-4 py-4 whitespace-nowrap font-medium text-red-500">Low</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button className="text-primary hover:underline text-sm">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AppointmentBookingTab = () => (
  <div className="tab-pane card bg-white p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-primary mb-6">3. Smart Appointment Booking</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left: Booking Form */}
      <div className="space-y-4">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="font-semibold text-primary">Personalized Suggestion:</p>
          <p className="text-sm text-gray-700">
            Based on your recent 'Low Vitamin D' result, we recommend seeing a{' '}
            <span className="font-bold">General Practitioner</span> for a follow-up consultation.
          </p>
        </div>

        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Select Specialty
          </label>
          <select id="specialty" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option>General Practitioner</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Provider
          </label>
          <select id="provider" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option>Dr. Alex Johnson (5 Stars)</option>
            <option>Dr. Maria Gomez (4.8 Stars)</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input type="date" id="date" defaultValue="2024-10-15" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
        </div>

        <button className="w-full bg-secondary text-white p-3 rounded-lg font-semibold hover:bg-emerald-600 transition duration-150 ease-in-out">
          Find Available Slots
        </button>
      </div>

      {/* Right: Upcoming Appointment */}
      <div className="p-6 bg-gray-100 rounded-xl border border-gray-300">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointment</h3>
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <p className="text-lg font-bold text-primary">Dr. Alex Johnson</p>
          <p className="text-sm text-gray-600">General Practitioner</p>
          <div className="mt-3 space-y-1">
            <p className="flex items-center text-sm text-gray-800">
              <span className="font-bold mr-2">📅</span> Oct 20, 2024
            </p>
            <p className="flex items-center text-sm text-gray-800">
              <span className="font-bold mr-2">🕒</span> 10:30 AM (30 min)
            </p>
            <p className="flex items-center text-sm text-gray-800">
              <span className="font-bold mr-2">📍</span> Zoom Call / Clinic A
            </p>
          </div>
          <button className="mt-4 w-full border border-red-500 text-red-500 p-2 rounded-lg text-sm hover:bg-red-50">
            Cancel/Reschedule
          </button>
        </div>
      </div>
    </div>
  </div>
);

const GamificationTab = () => (
  <div className="tab-pane card bg-white p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-primary mb-6">4. Gamification & Rewards</h2>
    
    {/* Metrics */}
    <div className="grid grid-cols-3 gap-6 text-center mb-8">
      <div className="p-6 bg-primary text-white rounded-xl shadow-lg">
        <p className="text-sm font-medium opacity-80">Total Health Points</p>
        <p className="text-4xl font-extrabold mt-1">8,450</p>
      </div>
      <div className="p-6 bg-secondary text-white rounded-xl shadow-lg">
        <p className="text-sm font-medium opacity-80">Current Streak</p>
        <p className="text-4xl font-extrabold mt-1">14 Days</p>
      </div>
      <div className="p-6 bg-yellow-400 text-gray-900 rounded-xl shadow-lg">
        <p className="text-sm font-medium opacity-80">Next Reward</p>
        <p className="text-4xl font-extrabold mt-1">Level 3</p>
      </div>
    </div>

    {/* Badges */}
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Earned Badges</h3>
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {[
        { icon: '🏆', title: 'Daily Step Champ', status: 'Achieved 5 times', earned: true },
        { icon: '😴', title: 'Perfect Sleeper', status: 'Complete next week', earned: false },
        { icon: '🧘', title: 'Mindfulness Master', status: 'First time completion', earned: true }
      ].map((badge, index) => (
        <div
          key={index}
          className={`w-32 text-center p-3 bg-white rounded-lg shadow-md border ${
            badge.earned ? 'border-secondary' : 'border-gray-300'
          }`}
        >
          <div className={`text-4xl ${!badge.earned ? 'opacity-50' : ''}`}>{badge.icon}</div>
          <p className="text-sm font-semibold mt-1">{badge.title}</p>
          <p className={`text-xs ${badge.earned ? 'text-gray-500' : 'text-red-500'}`}>
            {badge.status}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const WearablesTab = () => (
  <div className="tab-pane card bg-white p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-primary mb-6">5. Wearables Integration Status</h2>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Device Status */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Connected Devices</h3>
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-2xl text-secondary">⌚</span>
              <div>
                <p className="font-medium">Fitness Tracker 2.0</p>
                <p className="text-xs text-gray-500">Last Sync: 5 minutes ago</p>
              </div>
            </div>
            <span className="bg-secondary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
              Connected
            </span>
          </li>
          <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm opacity-60">
            <div className="flex items-center space-x-3">
              <span className="text-2xl text-red-500">⚖️</span>
              <div>
                <p className="font-medium">Smart Scale</p>
                <p className="text-xs text-gray-500">Last Sync: 3 days ago</p>
              </div>
            </div>
            <span className="bg-red-500/20 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
              Inactive
            </span>
          </li>
        </ul>
        <button className="mt-6 w-full bg-primary/10 text-primary p-3 rounded-lg font-semibold hover:bg-primary/20">
          Add New Device
        </button>
      </div>

      {/* Personalized Insights */}
      <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
        <h3 className="text-xl font-semibold text-primary mb-4">Data-Driven Insight</h3>
        <p className="text-gray-700 mb-4">
          Your average <strong>Resting Heart Rate (RHR)</strong> has dropped from 65 BPM to 60 BPM over the last week, 
          correlating with your increased cycling activity.
        </p>
        <div className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-inner">
          <span className="text-2xl text-secondary">📈</span>
          <div>
            <p className="font-medium">Health Score Improvement:</p>
            <p className="text-xs text-gray-500">RHR is now in the <strong>Excellent</strong> range for your age.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AIChatTab = ({ chatMessages, chatInput, setChatInput, onSendMessage, onKeyPress, isLoading, messagesEndRef }) => (
  <div className="tab-pane card bg-white p-6 rounded-xl max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-primary mb-6">6. AI Support Chat</h2>
    
    <div className="flex flex-col h-[500px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
      {/* Chat Messages Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role} max-w-[80%] p-3 rounded-xl shadow-md ${
              message.role === 'user' 
                ? 'rounded-tr-none ml-auto bg-gray-300' 
                : 'rounded-tl-none mr-auto bg-indigo-50'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 flex space-x-3 items-center">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-primary focus:border-primary"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          disabled={isLoading || !chatInput.trim()}
          className="bg-primary text-white p-3 rounded-full h-10 w-10 flex items-center justify-center hover:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  </div>
);

// Icon Components
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.548 60.548 0 0 0 18.44-5.362.75.75 0 0 0 0-1.298 60.549 60.549 0 0 0-18.44-5.362Z" />
  </svg>
);

export default HealthHub;