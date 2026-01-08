import React, { useState } from "react";

export default function FraudDetection() {
  const [search, setSearch] = useState("");

  const frauds = [
    {
      id: "FD-1001",
      entity: "Order #54821",
      user: "Aman Chaudhary",
      type: "Payment Fraud",
      risk: "High",
      score: 92,
      status: "Under Review",
      date: "05 Jan 2026",
    },
    {
      id: "FD-1002",
      entity: "User Account",
      user: "Rohit Sharma",
      type: "Multiple Failed Payments",
      risk: "Medium",
      score: 67,
      status: "Flagged",
      date: "04 Jan 2026",
    },
    {
      id: "FD-1003",
      entity: "Order #54711",
      user: "Neha Verma",
      type: "Suspicious Location",
      risk: "Low",
      score: 34,
      status: "Cleared",
      date: "03 Jan 2026",
    },
  ];

  const filtered = frauds.filter(
    (f) =>
      f.user.toLowerCase().includes(search.toLowerCase()) ||
      f.entity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Fraud Detection</h1>

      {/* Search & Action */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          placeholder="Search Order / User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/2 focus:ring-2 focus:ring-red-400"
        />
        <button className="px-5 py-2 text-white rounded-lg bg-gradient-to-r from-red-600 to-red-500 shadow hover:opacity-90">
          Run Fraud Scan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">High Risk</p>
          <h2 className="text-2xl font-bold text-red-600">12</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Medium Risk</p>
          <h2 className="text-2xl font-bold text-yellow-500">28</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Low Risk</p>
          <h2 className="text-2xl font-bold text-green-600">103</h2>
        </div>
      </div>

      {/* Fraud Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Case ID",
                "Entity",
                "User",
                "Fraud Type",
                "Risk",
                "Score",
                "Status",
                "Detected On",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{f.id}</td>
                <td className="px-6 py-4">{f.entity}</td>
                <td className="px-6 py-4">{f.user}</td>
                <td className="px-6 py-4">{f.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      f.risk === "High"
                        ? "bg-red-100 text-red-700"
                        : f.risk === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {f.risk}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">{f.score}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      f.status === "Under Review"
                        ? "bg-blue-100 text-blue-700"
                        : f.status === "Flagged"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="px-6 py-4">{f.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400">
                    Investigate
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
