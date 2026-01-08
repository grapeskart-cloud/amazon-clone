import React, { useState } from "react";

export default function AuditLogs() {
  const [search, setSearch] = useState("");

  const logsData = [
    {
      id: 1,
      user: "Aman Chaudhary",
      action: "Login",
      module: "Authentication",
      timestamp: "2026-01-05 10:15 AM",
      status: "Success",
    },
    {
      id: 2,
      user: "Rohit Sharma",
      action: "Update Product",
      module: "Catalog",
      timestamp: "2026-01-04 03:45 PM",
      status: "Failed",
    },
    {
      id: 3,
      user: "Neha Verma",
      action: "Process Order",
      module: "Orders",
      timestamp: "2026-01-03 01:20 PM",
      status: "Success",
    },
    {
      id: 4,
      user: "Aman Chaudhary",
      action: "Delete Category",
      module: "Catalog",
      timestamp: "2026-01-02 08:00 AM",
      status: "Warning",
    },
  ];

  const [logs] = useState(logsData);

  const filteredLogs = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase()) ||
      l.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-2">{log.user}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Action: <span className="font-medium">{log.action}</span>
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Module: <span className="font-medium">{log.module}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Timestamp: {log.timestamp}
            </p>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                statusColors[log.status]
              }`}
            >
              {log.status}
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
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
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
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{log.id}</td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4">{log.module}</td>
                <td className="px-6 py-4">{log.timestamp}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[log.status]
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">
                    Alert
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
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
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
