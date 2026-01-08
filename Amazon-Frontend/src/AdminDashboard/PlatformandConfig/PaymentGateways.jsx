import React, { useState } from "react";

export default function PaymentGateway() {
  const [gateways, setGateways] = useState([
    {
      id: 1,
      name: "Razorpay",
      status: "Active",
      mode: "Live",
      currency: "INR",
      successRate: "98.6%",
      lastUpdated: "2026-01-03",
    },
    {
      id: 2,
      name: "Stripe",
      status: "Inactive",
      mode: "Test",
      currency: "USD",
      successRate: "95.1%",
      lastUpdated: "2025-12-28",
    },
    {
      id: 3,
      name: "PayPal",
      status: "Active",
      mode: "Live",
      currency: "USD",
      successRate: "97.3%",
      lastUpdated: "2026-01-01",
    },
  ]);

  const toggleStatus = (id) => {
    setGateways((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "Active" ? "Inactive" : "Active" }
          : g
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payment Gateway</h1>

      <div className="flex justify-between mb-6 gap-4 flex-col sm:flex-row">
        <input
          placeholder="Search Gateway..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-5 py-2 rounded text-white bg-gradient-to-r from-indigo-600 to-indigo-500 shadow">
          + Add Gateway
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {gateways.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{g.name}</h2>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  g.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {g.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">Mode: {g.mode}</p>
            <p className="text-sm text-gray-600">Currency: {g.currency}</p>
            <p className="text-sm text-gray-600">
              Success Rate: {g.successRate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated: {g.lastUpdated}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => toggleStatus(g.id)}
                className={`px-3 py-1 rounded text-white text-sm ${
                  g.status === "Active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {g.status === "Active" ? "Disable" : "Enable"}
              </button>

              <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Mode
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Currency
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Success Rate
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {gateways.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{g.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      g.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {g.status}
                  </span>
                </td>
                <td className="px-6 py-4">{g.mode}</td>
                <td className="px-6 py-4">{g.currency}</td>
                <td className="px-6 py-4">{g.successRate}</td>
                <td className="px-6 py-4 space-x-3">
                  <button className="text-indigo-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Remove
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
