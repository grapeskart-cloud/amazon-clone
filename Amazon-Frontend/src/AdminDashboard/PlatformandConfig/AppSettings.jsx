import React, { useState } from "react";

export default function AppSettings() {
  const [settings, setSettings] = useState({
    appName: "Ecoms Admin",
    supportEmail: "support@ecoms.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoRefund: true,
    sellerApproval: "Manual",
  });

  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">App Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">General</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">App Name</label>
              <input
                value={settings.appName}
                className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Support Email</label>
              <input
                value={settings.supportEmail}
                className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Currency</label>
                <select className="mt-1 w-full px-4 py-2 border rounded">
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Timezone</label>
                <select className="mt-1 w-full px-4 py-2 border rounded">
                  <option>Asia/Kolkata</option>
                  <option>UTC</option>
                  <option>Asia/Dubai</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>

          <div className="space-y-4">
            {[
              ["Email Notifications", "emailNotifications"],
              ["SMS Notifications", "smsNotifications"],
            ].map(([label, key]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-700">{label}</span>
                <button
                  onClick={() => toggle(key)}
                  className={`w-12 h-6 rounded-full transition ${
                    settings[key] ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transform transition ${
                      settings[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Orders & Sellers</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Auto Refund</span>
              <button
                onClick={() => toggle("autoRefund")}
                className={`w-12 h-6 rounded-full ${
                  settings.autoRefund ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full transform ${
                    settings.autoRefund ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-600">Seller Approval</label>
              <select className="mt-1 w-full px-4 py-2 border rounded">
                <option>Manual</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">System Controls</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Maintenance Mode</span>
              <button
                onClick={() => toggle("maintenanceMode")}
                className={`w-12 h-6 rounded-full ${
                  settings.maintenanceMode ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full transform ${
                    settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button className="w-full py-2 text-white rounded bg-gradient-to-r from-indigo-600 to-indigo-500 shadow">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
