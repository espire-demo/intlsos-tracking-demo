import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminnConfigHub from './components/AdminnConfigHub/AdminnConfigHub.jsx'
import DataAnalyticsDashboard from './components/DatanAnalyticsReporting/DatanAnalyticsReporting.jsx'
import HealthCMS from './components/HealthCMS/HealthCMS.jsx'
import DigitalHealthWallet from './components/DigitalHeathWallet/DigitalHeathWallet.jsx'
import HealthWellnessMarketplace from './components/HealthnWellnessmarketPlace/HealthnWellnessmarketPlace.jsx'
import VirtualCareDashboard from './components/virtualCare/virtualCare.jsx'
import HealthHub from './components/EngagementnpersonalizationhealthHub/EngagementnpersonalizationhealthHub.jsx'
import MemberPortal from './geminiComponent/MemberPortal.jsx'
import AdminPortal from './geminiComponent/AdminPortal.jsx'
import ClientPortal from './geminiComponent/ClientPortal.jsx'
import ClinicalPortal from './geminiComponent/ClinicalPortal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <HealthHub></HealthHub>
    <VirtualCareDashboard></VirtualCareDashboard>
    <HealthWellnessMarketplace></HealthWellnessMarketplace>
    <DigitalHealthWallet></DigitalHealthWallet>
    <HealthCMS></HealthCMS>
    <DataAnalyticsDashboard></DataAnalyticsDashboard>
    <AdminnConfigHub></AdminnConfigHub> */}
    <MemberPortal></MemberPortal>
    {/* <AdminPortal></AdminPortal> */}
    {/* <ClientPortal></ClientPortal> */}
    {/* <ClinicalPortal></ClinicalPortal> */}
  </StrictMode>,
)
