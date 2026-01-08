import React, { useState } from "react";

export default function ComplianceRules() {
  const [search, setSearch] = useState("");

  const rules = [
    {
      id: "CR-001",
      rule: "KYC Verification Mandatory",
      category: "User Compliance",
      severity: "High",
      status: "Active",
      lastUpdated: "02 Jan 2026",
    },
    {
      id: "CR-002",
      rule: "GST Invoice Required",
      category: "Tax & Finance",
      severity: "High",
      status: "Active",
      lastUpdated: "01 Jan 2026",
    },
    {
      id: "CR-003",
      rule: "Restricted Product Policy",
      category: "Catalog Control",
      severity: "Medium",
      status: "Active",
      lastUpdated: "30 Dec 2025",
    },
    {
      id: "CR-004",
      rule: "Data Retention Policy",
      category: "Data & Privacy",
      severity: "Low",
      status: "Inactive",
      lastUpdated: "28 Dec 2025",
    },
  ];

  const filtered = rules.filter(
    (r) =>
      r.rule.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Compliance Rules</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          placeholder="Search compliance rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/2 focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-5 py-2 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 shadow hover:opacity-90">
          + Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Rules</p>
          <h2 className="text-2xl font-bold text-green-600">18</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">High Severity</p>
          <h2 className="text-2xl font-bold text-red-600">7</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Inactive Rules</p>
          <h2 className="text-2xl font-bold text-gray-600">4</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Rule ID",
                "Rule Name",
                "Category",
                "Severity",
                "Status",
                "Last Updated",
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
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{r.id}</td>
                <td className="px-6 py-4">{r.rule}</td>
                <td className="px-6 py-4">{r.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      r.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : r.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {r.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      r.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">{r.lastUpdated}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400">
                    Disable
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
