import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberPortal from './geminiComponent/MemberPortal.jsx';
import AdminPortal from './geminiComponent/AdminPortal.jsx';
import ClientPortal from './geminiComponent/ClientPortal.jsx';
import ClinicianPortal from './geminiComponent/ClinicianPortal.jsx';
import ApplicationDashboard from './geminiComponent/ApplicationDashboard.jsx';

function App() {
  return (
    <Router basename="/intlsos-tracking-demo">
      <Routes>
        <Route path="/" element={<ApplicationDashboard />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/client" element={<ClientPortal />} />
        <Route path="/clinician" element={<ClinicianPortal />} />
        <Route path="/member" element={<MemberPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
