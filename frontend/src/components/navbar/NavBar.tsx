import React from "react";
import { get_history_tab, get_settings_tab, get_statistics_tab } from "../../services/navigation";
import "./Navbar.scss";

interface NavbarProps {
  activeTab: "history" | "statistics" | "settings"; // Indicates which tab is active
}

const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    <div className="navbar">
      {/* <div className="logo">S</div> */}
      {/* <h2 className="title">Domain Reputation</h2> */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => get_history_tab(true)} // Navigate to History page
        >
          Scan History
        </div>
        <div
          className={`tab ${activeTab === "statistics" ? "active" : ""}`}
          onClick={() => get_statistics_tab(true)} // Navigate to Statistics page
        >
          Statistics
        </div>
        <div
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => get_settings_tab(true)} // Navigate to Settings page
        >
          Settings
        </div>
      </div>
    </div>
  );
};

export default Navbar;