import { useState } from "react";
import "./Settings.scss";
import BlacklistManagement from "../../../components/BlackListManagement/BlackListManagement";
import Navbar from "../../../components/navbar/NavBar";

export default function Settings() {
  const [notificationEmailAddress, setNotificationEmailAddress] = useState("");
  const [sensitivityThreshold, setSensitivityThreshold] = useState(0);

  // These states control each toggle. You can hook them up to real logic later.
  const [notificationsEmail, setNotificationsEmail] = useState(true);

  const [autoScanning, setAutoScanning] = useState(false);
  const [historyStatistics, sethistoryStatistics] = useState(true);
  const [blockNavigation, setblockNavigation] = useState(true);

  return (
    <>
      <Navbar activeTab="settings" />
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
        </div>

        <div className="content">
          {/* =========================
          NOTIFICATIONS SECTION
          ========================= */}
          <div className="settings-section">
            <h3 className="section-title">Notifications</h3>

            {/* Email Notifications */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">Email Notifications</span>
                <span className="setting-subtitle">
                  Receive updates via email
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationsEmail}
                  onChange={() => setNotificationsEmail((prev) => !prev)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Email Address */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">Email Address</span>
                <span className="setting-subtitle">
                  Enter the email where you’d like to receive updates
                </span>
              </div>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={notificationEmailAddress}
                onChange={(e) => setNotificationEmailAddress(e.target.value)}
              />
            </div>
          </div>

          {/* =========================
          SCANNING SECTION
          ========================= */}
          <div className="settings-section">
            <h3 className="section-title">Scanning</h3>

            {/* Auto Scan */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">Auto Scan</span>
                <span className="setting-subtitle">
                  Enable automatic scanning of websites for threats
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoScanning}
                  onChange={() => setAutoScanning((prev) => !prev)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* History & Statistics */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">History & Statistics</span>
                <span className="setting-subtitle">
                  Enable data collecting for history and statistics
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={historyStatistics}
                  onChange={() => sethistoryStatistics((prev) => !prev)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Block Navigation */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">Block Navigation</span>
                <span className="setting-subtitle">
                  Enable blocking of navigation of potentially harmful websites
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={blockNavigation}
                  onChange={() => setblockNavigation((prev) => !prev)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Sensitivity Threshold */}
            <div className="setting-card">
              <div className="setting-text">
                <span className="setting-title">Sensitivity Threshold</span>
                <span className="setting-subtitle">
                  Enter a value between 1 and 39 to set the sensitivity of
                  navigation block
                </span>
              </div>
              <input
                type="number"
                className="input"
                placeholder="1"
                value={sensitivityThreshold}
                onChange={(e) =>
                  setSensitivityThreshold(Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* =========================
          BLACKLIST TABLE (Your Original Table)
          ========================= */}
          <div className="blacklist-section">
            <h2 className="blacklist-title">Blacklist</h2>
            <BlacklistManagement />
          </div>
        </div>
      </div>
    </>
  );
}
