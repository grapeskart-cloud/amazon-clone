import React, { useState } from "react";

export default function Logs() {
  const [search, setSearch] = useState("");

  const logsData = [
    {
      id: 1,
      type: "Info",
      message: "User Aman logged in",
      user: "Aman Chaudhary",
      date: "2026-01-01 10:05 AM",
      status: "Success",
    },
    {
      id: 2,
      type: "Warning",
      message: "Payment gateway response delayed",
      user: "System",
      date: "2026-01-02 02:15 PM",
      status: "Pending",
    },
    {
      id: 3,
      type: "Error",
      message: "Order ID ORD1002 failed",
      user: "Rohit Sharma",
      date: "2026-01-03 11:30 AM",
      status: "Failed",
    },
    {
      id: 4,
      type: "Info",
      message: "New customer Neha Verma added",
      user: "Admin",
      date: "2026-01-04 09:20 AM",
      status: "Success",
    },
  ];

  const [logs] = useState(logsData);

  const filteredLogs = logs.filter(
    (l) =>
      l.type.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Logs</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{log.id}</td>
                <td className="px-6 py-4">{log.type}</td>
                <td className="px-6 py-4">{log.message}</td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.date}</td>
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
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
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
