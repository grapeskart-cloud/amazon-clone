import React, { useState } from "react";

export default function Uptime() {
  const [search, setSearch] = useState("");

  const uptimeData = [
    {
      id: 1,
      service: "API Gateway",
      uptime: "99.99%",
      lastDowntime: "2026-01-02 03:15 AM",
      status: "Running",
    },
    {
      id: 2,
      service: "Database Server",
      uptime: "95.00%",
      lastDowntime: "2026-01-04 01:45 AM",
      status: "Down",
    },
    {
      id: 3,
      service: "Payment Gateway",
      uptime: "98.50%",
      lastDowntime: "2026-01-03 11:20 PM",
      status: "Running",
    },
    {
      id: 4,
      service: "Notification Service",
      uptime: "99.80%",
      lastDowntime: "2026-01-01 08:00 AM",
      status: "Running",
    },
  ];

  const [services] = useState(uptimeData);

  const filtered = services.filter(
    (s) =>
      s.service.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Running: "bg-green-100 text-green-700",
    Down: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Uptime Monitoring</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-2">{s.service}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Uptime: <span className="font-medium">{s.uptime}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Last Downtime: {s.lastDowntime}
            </p>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                statusColors[s.status]
              }`}
            >
              {s.status}
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
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Uptime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Downtime
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
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{s.id}</td>
                <td className="px-6 py-4">{s.service}</td>
                <td className="px-6 py-4">{s.uptime}</td>
                <td className="px-6 py-4">{s.lastDowntime}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[s.status]
                    }`}
                  >
                    {s.status}
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
