import { useEffect, useState } from "react";
import "./Settings.scss";
import Navbar from "../../../components/navbar/NavBar";
import { getSettings, setSettings } from "../../../services/UserService";
import { UserSettingsType } from "../../../types";
import Blacklist from "../../../components/BlackList/BlackList";

export default function Settings() {
  // State for all settings
  const [settings, setSettingsState] = useState<UserSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local state for debounced fields
  const [notificationEmailAddress, setNotificationEmailAddress] = useState("");
  const [sensitivityThreshold, setSensitivityThreshold] = useState(0);

  // Fetch settings on mount
  useEffect(() => {
    setLoading(true);
    getSettings()
      .then((data) => {
        setSettingsState(data);
        setNotificationEmailAddress(data.notificationEmailAddress || "");
        setSensitivityThreshold(data.sensitivityThreshold || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load settings");
        setLoading(false);
      });
  }, []);

  // Helper to update a setting
  const updateSetting = (key: keyof UserSettingsType, value: any) => {
    setSettingsState((prev) => (prev ? { ...prev, [key]: value } : prev));
    setSettings([{ key, value }]).catch((err) => {
      setError(err.message || `Failed to update setting: ${key}`);
    });
  };

  // Debounced update for notificationEmailAddress
  useEffect(() => {
    if (settings) {
      const handler = setTimeout(() => {
        if (notificationEmailAddress !== settings.notificationEmailAddress) {
          updateSetting("notificationEmailAddress", notificationEmailAddress);
        }
      }, 600);
      return () => clearTimeout(handler);
    }
  }, [notificationEmailAddress]);

  // Debounced update for sensitivityThreshold
  useEffect(() => {
    if (settings) {
      const handler = setTimeout(() => {
        if (sensitivityThreshold !== settings.sensitivityThreshold) {
          updateSetting("sensitivityThreshold", sensitivityThreshold);
        }
      }, 600);
      return () => clearTimeout(handler);
    }
  }, [sensitivityThreshold]);

  if (loading)
    return (
      <div className="settings-page">
        <Navbar activeTab="settings" />
        <div className="content">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="settings-page">
        <Navbar activeTab="settings" />
        <div className="content">Error: {error}</div>
      </div>
    );
  if (!settings) return null;

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
                  checked={settings.notificationsEmail}
                  onChange={() =>
                    updateSetting("notificationsEmail", !settings.notificationsEmail)
                  }
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
                  checked={settings.autoScanning}
                  onChange={() => updateSetting("autoScanning", !settings.autoScanning)}
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
                  checked={settings.historyStatistics}
                  onChange={() => updateSetting("historyStatistics", !settings.historyStatistics)}
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
                  checked={settings.blockNavigation}
                  onChange={() => updateSetting("blockNavigation", !settings.blockNavigation)}
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
                min={1}
                max={39}
                value={sensitivityThreshold}
                onChange={(e) => setSensitivityThreshold(Number(e.target.value))}
              />
            </div>
          </div>

          {/* =========================
          BLACKLIST TABLE (Your Original Table)
          ========================= */}
          <div className="blacklist-section">
            <h2 className="blacklist-title">Blacklist</h2>
            <Blacklist />
          </div>
        </div>
      </div>
    </>
  );
}
