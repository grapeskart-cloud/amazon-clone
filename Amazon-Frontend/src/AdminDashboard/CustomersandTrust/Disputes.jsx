import React, { useState } from "react";

export default function DisputeManagement() {
  const [search, setSearch] = useState("");

  const [disputes, setDisputes] = useState([
    {
      id: 1,
      disputeId: "DSP-2011",
      orderId: "ORD-1023",
      customer: "Aman Chaudhary",
      issue: "Payment deducted but order not placed",
      status: "Open",
      priority: "High",
      date: "2026-01-06",
      amount: "₹72,000",
    },
    {
      id: 2,
      disputeId: "DSP-2034",
      orderId: "ORD-1041",
      customer: "Rohit Sharma",
      issue: "Refund not received",
      status: "In Progress",
      priority: "Medium",
      date: "2026-01-04",
      amount: "₹4,500",
    },
    {
      id: 3,
      disputeId: "DSP-2056",
      orderId: "ORD-1067",
      customer: "Neha Verma",
      issue: "Wrong product delivered",
      status: "Resolved",
      priority: "Low",
      date: "2026-01-02",
      amount: "₹3,200",
    },
  ]);

  const filteredDisputes = disputes.filter(
    (d) =>
      d.disputeId.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dispute Management</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Dispute ID, Order ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredDisputes.map((d) => (
          <div key={d.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{d.disputeId}</span>
              <span className="text-sm text-gray-500">{d.date}</span>
            </div>

            <p className="text-sm text-gray-700">Order: {d.orderId}</p>
            <p className="text-sm text-gray-700">{d.customer}</p>
            <p className="text-sm text-gray-600 mt-1">{d.issue}</p>

            <div className="flex justify-between items-center mt-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  d.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : d.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {d.status}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  d.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : d.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {d.priority}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStatus(d.id, "In Progress")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(d.id, "Resolved")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Dispute ID",
                "Order ID",
                "Customer",
                "Issue",
                "Amount",
                "Status",
                "Priority",
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
            {filteredDisputes.map((d) => (
              <tr key={d.id}>
                <td className="px-6 py-4">{d.id}</td>
                <td className="px-6 py-4">{d.disputeId}</td>
                <td className="px-6 py-4">{d.orderId}</td>
                <td className="px-6 py-4">{d.customer}</td>
                <td className="px-6 py-4 max-w-xs truncate">{d.issue}</td>
                <td className="px-6 py-4">{d.amount}</td>
                <td className="px-6 py-4">{d.status}</td>
                <td className="px-6 py-4">{d.priority}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(d.id, "In Progress")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400"
                  >
                    Progress
                  </button>
                  <button
                    onClick={() => updateStatus(d.id, "Resolved")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400"
                  >
                    Resolve
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
