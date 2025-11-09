import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Other imports can stay for later use
import AdminnConfigHub from './components/AdminnConfigHub/AdminnConfigHub.jsx';
import DataAnalyticsDashboard from './components/DatanAnalyticsReporting/DatanAnalyticsReporting.jsx';
import HealthCMS from './components/HealthCMS/HealthCMS.jsx';
import DigitalHealthWallet from './components/DigitalHeathWallet/DigitalHeathWallet.jsx';
import HealthWellnessMarketplace from './components/HealthnWellnessmarketPlace/HealthnWellnessmarketPlace.jsx';
import VirtualCareDashboard from './components/virtualCare/virtualCare.jsx';
import HealthHub from './components/EngagementnpersonalizationhealthHub/EngagementnpersonalizationhealthHub.jsx';
import MemberPortal from './geminiComponent/MemberPortal.jsx';
import AdminPortal from './geminiComponent/AdminPortal.jsx';
import ClientPortal from './geminiComponent/ClientPortal.jsx';
import ClinicianPortal from './geminiComponent/ClinicianPortal.jsx';
import ApplicationDashboard from './geminiComponent/ApplicationDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* 🔹 Uncomment any one below if you want to test individually (but not with <App/>) */}
    {/* <HealthHub /> */}
    {/* <VirtualCareDashboard /> */}
    {/* <HealthWellnessMarketplace /> */}
    {/* <DigitalHealthWallet /> */}
    {/* <HealthCMS /> */}
    {/* <DataAnalyticsDashboard /> */}
    {/* <AdminnConfigHub /> */}
    {/* <MemberPortal /> */}
    {/* <AdminPortal /> */}
    {/* <ClientPortal /> */}
    {/* <ClinicianPortal /> */}
  </StrictMode>
);
