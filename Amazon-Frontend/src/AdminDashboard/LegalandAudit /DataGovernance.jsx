import React, { useState } from "react";

export default function DataGovernance() {
  const [search, setSearch] = useState("");

  const dataRules = [
    {
      id: 1,
      name: "User Data Privacy",
      type: "Privacy",
      module: "Customer Management",
      createdBy: "Admin",
      createdAt: "2026-01-01",
      status: "Active",
    },
    {
      id: 2,
      name: "Financial Data Compliance",
      type: "Compliance",
      module: "Finance",
      createdBy: "Finance Team",
      createdAt: "2026-01-03",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Product Catalog Rules",
      type: "Quality",
      module: "Catalog",
      createdBy: "Catalog Team",
      createdAt: "2026-01-05",
      status: "Active",
    },
    {
      id: 4,
      name: "Log Retention Policy",
      type: "Retention",
      module: "Logs",
      createdBy: "IT Team",
      createdAt: "2026-01-06",
      status: "Active",
    },
  ];

  const [rules] = useState(dataRules);

  const filteredRules = rules.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.module.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Data Governance</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Data Rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          + Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-2">{rule.name}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Type: <span className="font-medium">{rule.type}</span>
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Module: <span className="font-medium">{rule.module}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Created By: {rule.createdBy} | {rule.createdAt}
            </p>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                statusColors[rule.status]
              }`}
            >
              {rule.status}
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{rule.id}</td>
                <td className="px-6 py-4">{rule.name}</td>
                <td className="px-6 py-4">{rule.type}</td>
                <td className="px-6 py-4">{rule.module}</td>
                <td className="px-6 py-4">
                  {rule.createdBy} | {rule.createdAt}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[rule.status]
                    }`}
                  >
                    {rule.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Prev
        </button>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          1
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
}
