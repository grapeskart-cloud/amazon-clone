import React, { useState } from "react";
import {
  Shield,
  Lock,
  Database,
  Globe,
  Clock,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  Key,
  Network,
  HardDrive,
} from "lucide-react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("security");
  const [settings, setSettings] = useState({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipBlocking: true,
    twoFactorAuth: false,
    passwordExpiry: 90,

    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    backupRetention: 30,

    maintenanceMode: false,
    errorReporting: true,
    analyticsTracking: true,

    blockedIPs: ["192.168.1.100", "10.0.0.5"],
  });

  const [newIP, setNewIP] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAddIP = () => {
    if (newIP && !settings.blockedIPs.includes(newIP)) {
      setSettings({
        ...settings,
        blockedIPs: [...settings.blockedIPs, newIP],
      });
      setNewIP("");
      alert("IP address blocked successfully!");
    }
  };

  const handleRemoveIP = (ip) => {
    setSettings({
      ...settings,
      blockedIPs: settings.blockedIPs.filter((blockedIP) => blockedIP !== ip),
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleBackupNow = () => {
    alert("Backup initiated! This may take a few minutes...");
  };

  const handleRestore = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".sql,.backup";
    fileInput.onchange = (e) => {
      alert("Restore process started with selected file");
    };
    fileInput.click();
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
          <p className="text-gray-600">
            IP blocking, session timeout, backup/restore, security settings
          </p>
        </div>
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Save size={20} /> Save Settings
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        {["security", "backup", "ipblocking", "maintenance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.replace("ipblocking", "IP Blocking")}
          </button>
        ))}
      </div>

      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-green-600" />
              <h3 className="font-semibold text-lg">Security Settings</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                  <span className="font-semibold">
                    {settings.sessionTimeout} min
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Login Attempts
                </label>
                <select
                  value={settings.maxLoginAttempts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxLoginAttempts: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {[3, 5, 10, 15].map((num) => (
                    <option key={num} value={num}>
                      {num} attempts
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.ipBlocking}
                    onChange={(e) =>
                      setSettings({ ...settings, ipBlocking: e.target.checked })
                    }
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="font-medium">
                    Enable IP Blocking after failed attempts
                  </span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="font-medium">
                    Enable Two-Factor Authentication for admin
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Expiry (days)
                </label>
                <select
                  value={settings.passwordExpiry}
                  onChange={(e) =>
                    setSettings({ ...settings, passwordExpiry: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">Never expire</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={24} className="text-green-600" />
              <h3 className="font-semibold text-lg">Change Admin Password</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "backup" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database size={24} className="text-green-600" />
              <h3 className="font-semibold text-lg">Backup Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Automatic Backups</h4>
                  <p className="text-sm text-gray-600">
                    Automatically backup your database
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) =>
                      setSettings({ ...settings, autoBackup: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {settings.autoBackup && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          backupFrequency: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={settings.backupTime}
                      onChange={(e) =>
                        setSettings({ ...settings, backupTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retention (days)
                    </label>
                    <input
                      type="number"
                      value={settings.backupRetention}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          backupRetention: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="365"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleBackupNow}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <RefreshCw size={18} /> Backup Now
                </button>
                <button
                  onClick={handleRestore}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Database size={18} /> Restore Backup
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-6">Recent Backups</h3>
            <div className="space-y-4">
              {[
                {
                  date: "2024-01-15 02:00",
                  size: "245 MB",
                  status: "Completed",
                },
                {
                  date: "2024-01-14 02:00",
                  size: "240 MB",
                  status: "Completed",
                },
                {
                  date: "2024-01-13 02:00",
                  size: "238 MB",
                  status: "Completed",
                },
                { date: "2024-01-12 02:00", size: "235 MB", status: "Failed" },
              ].map((backup, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <HardDrive size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">{backup.date}</p>
                      <p className="text-sm text-gray-600">
                        Size: {backup.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        backup.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {backup.status}
                    </span>
                    <button className="text-green-600 hover:text-green-700">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "ipblocking" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Network size={24} className="text-green-600" />
              <h3 className="font-semibold text-lg">IP Blocking</h3>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add IP Address to Block
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newIP}
                  onChange={(e) => setNewIP(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter IP address (e.g., 192.168.1.100)"
                />
                <button
                  onClick={handleAddIP}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Block IP
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enter IP addresses you want to block from accessing the system
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-4">
                Blocked IP Addresses ({settings.blockedIPs.length})
              </h4>
              <div className="space-y-3">
                {settings.blockedIPs.map((ip, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-gray-400" />
                      <span className="font-mono">{ip}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveIP(ip)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-6">
              Recent Security Events
            </h3>
            <div className="space-y-4">
              {[
                {
                  ip: "192.168.1.100",
                  event: "Multiple failed login attempts",
                  time: "10:30 AM",
                  action: "Blocked",
                },
                {
                  ip: "10.0.0.5",
                  event: "Suspicious activity detected",
                  time: "Yesterday",
                  action: "Blocked",
                },
                {
                  ip: "172.16.0.10",
                  event: "Successful admin login",
                  time: "2 days ago",
                  action: "Logged",
                },
                {
                  ip: "192.168.1.50",
                  event: "Password changed",
                  time: "3 days ago",
                  action: "Notified",
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{log.ip}</p>
                    <p className="text-sm text-gray-600">{log.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{log.time}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        log.action === "Blocked"
                          ? "bg-red-100 text-red-800"
                          : log.action === "Logged"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "maintenance" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle size={24} className="text-yellow-600" />
              <h3 className="font-semibold text-lg">Maintenance Mode</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <h4 className="font-medium">Enable Maintenance Mode</h4>
                  <p className="text-sm text-gray-600">
                    When enabled, only administrators can access the system
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                </label>
              </div>

              {settings.maintenanceMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="4"
                    defaultValue="The system is currently under maintenance. We'll be back shortly. Thank you for your patience."
                  ></textarea>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Reporting
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.errorReporting}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          errorReporting: e.target.checked,
                        })
                      }
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span>Enable error reporting to developers</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analytics Tracking
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.analyticsTracking}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          analyticsTracking: e.target.checked,
                        })
                      }
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span>Enable system usage analytics</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={20} className="text-red-600" />
                  <h4 className="font-medium text-red-800">Danger Zone</h4>
                </div>
                <p className="text-sm text-red-700 mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Clear All Logs
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Reset All Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
