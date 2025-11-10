import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HealthDashboard from './geminiComponent/dashboard';
import ClinicianPortal from './geminiComponent/ClinicianPortal';
import AdminPortal from './geminiComponent/AdminPortal';
import ClientPortal from './geminiComponent/ClientPortal';
import MemberPortal from './geminiComponent/MemberPortal';

function App() {

  return (
    <Router basename="/intlsos-tracking-demo">
      <Routes>
        <Route path="/" element={<HealthDashboard />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/client" element={<ClientPortal />} />
        <Route path="/member" element={<MemberPortal />} />
        <Route path="/clinician" element={<ClinicianPortal />} />
      </Routes>
    </Router>
  )
}

export default App
