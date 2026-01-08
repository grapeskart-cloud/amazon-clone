import React, { useState } from "react";

export default function Monitoring() {
  const [search, setSearch] = useState("");

  const monitorsData = [
    {
      id: 1,
      service: "API Gateway",
      status: "Running",
      uptime: "99.99%",
      responseTime: "120ms",
      lastChecked: "2026-01-05 10:00 AM",
    },
    {
      id: 2,
      service: "Database Server",
      status: "Down",
      uptime: "95.00%",
      responseTime: "-",
      lastChecked: "2026-01-05 09:58 AM",
    },
    {
      id: 3,
      service: "Payment Gateway",
      status: "Running",
      uptime: "98.50%",
      responseTime: "200ms",
      lastChecked: "2026-01-05 10:01 AM",
    },
    {
      id: 4,
      service: "Notification Service",
      status: "Running",
      uptime: "99.80%",
      responseTime: "90ms",
      lastChecked: "2026-01-05 09:59 AM",
    },
  ];

  const [monitors] = useState(monitorsData);

  const filtered = monitors.filter(
    (m) =>
      m.service.toLowerCase().includes(search.toLowerCase()) ||
      m.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Running: "bg-green-100 text-green-700",
    Down: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-2">{m.service}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Uptime: <span className="font-medium">{m.uptime}</span>
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Response Time:{" "}
              <span className="font-medium">{m.responseTime}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Last Checked: {m.lastChecked}
            </p>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                statusColors[m.status]
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uptime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Response Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Checked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{m.id}</td>
                <td className="px-6 py-4">{m.service}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[m.status]
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4">{m.uptime}</td>
                <td className="px-6 py-4">{m.responseTime}</td>
                <td className="px-6 py-4">{m.lastChecked}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                    Restart
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
