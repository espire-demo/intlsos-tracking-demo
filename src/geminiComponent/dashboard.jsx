import React from "react";
import "./HealthDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCogs, FaChartBar, FaWallet, FaUsers, FaFileMedical, FaStore, FaLaptopMedical, FaChartLine, FaClock, FaUserPlus, FaFileUpload, FaShieldAlt, FaSyncAlt } from "react-icons/fa";

const HealthDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container" style={{ padding: "25px" }}>
      <header>
        <div className="header-content">
          <h1>Health Management Dashboard</h1>
          <p>Centralized platform for all health management services</p>
        </div>
        <div className="user-info">
          <div className="user-avatar">JD</div>
          <div>
            <div style={{ fontWeight: "bold" }}>John Doe</div>
            <div style={{ fontSize: "0.9rem", color: "#5a7b9d" }}>Administrator</div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="main-panel">
          <h2 className="panel-title">Health Management Services</h2>
          <div className="button-grid">
            {/* <a href="navigate(/admin)" className="dashboard-button">
              <div className="button-icon"><FaCogs /></div>
              <div className="button-text">
                Admin Portal
                <div className="button-description">System configuration and settings</div>
              </div>
            </a> */}

            {/* Fixed navigation using onClick + navigate */}
            <button
              onClick={() => navigate("/admin")}
              className="dashboard-button"
            >
              <div className="button-icon">
                <FaCogs />
              </div>
              <div className="button-text">
                Admin Portal
                <div className="button-description">
                  System configuration and settings
                </div>
              </div>
            </button>

            {/* <a href="navigate(/client)" className="dashboard-button">
              <div className="button-icon"><FaLaptopMedical /></div>
              <div className="button-text">
                Client Portal
                <div className="button-description">Remote healthcare services</div>
              </div>
            </a> */}

            <button
              onClick={() => navigate("/client")}
              className="dashboard-button"
            >
              <div className="button-icon">
                <FaLaptopMedical />
              </div>
              <div className="button-text">
                Client Portal
                <div className="button-description">
                  Remote healthcare services
                </div>
              </div>
            </button>

            {/* <a href="navigate(/member)" className="dashboard-button">
              <div className="button-icon"><FaUsers /></div>
              <div className="button-text">
                Member Portal
                <div className="button-description">Patient engagement tools</div>
              </div>
            </a> */}

            <button
              onClick={() => navigate("/member")}
              className="dashboard-button"
            >
              <div className="button-icon">
                <FaUsers />
              </div>
              <div className="button-text">
                Member Portal
                <div className="button-description">
                  Patient engagement tools
                </div>
              </div>
            </button>

            {/* <a href="navigate(/clinician)" className="dashboard-button">
              <div className="button-icon"><FaFileMedical /></div>
              <div className="button-text">
                Clinician Portal
                <div className="button-description">Content management system</div>
              </div>
            </a> */}

            <button
              onClick={() => navigate("/clinician")}
              className="dashboard-button"
            >
              <div className="button-icon">
                <FaFileMedical />
              </div>
              <div className="button-text">
                Clinician Portal
                <div className="button-description">
                  Content management system
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="side-panel">
          <div className="stats-card">
            <h3 className="stats-title"><FaChartLine /> System Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">1,247</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">342</div>
                <div className="stat-label">Today's Sessions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">12.4k</div>
                <div className="stat-label">Health Records</div>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <h3 className="stats-title"><FaClock /> Recent Activity</h3>
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-icon"><FaUserPlus /></div>
                <div className="activity-content">
                  <div className="activity-title">New user registration</div>
                  <div className="activity-time">10 minutes ago</div>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon"><FaFileUpload /></div>
                <div className="activity-content">
                  <div className="activity-title">Health record updated</div>
                  <div className="activity-time">45 minutes ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025, Espire Infolabs Pvt. Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HealthDashboard;
