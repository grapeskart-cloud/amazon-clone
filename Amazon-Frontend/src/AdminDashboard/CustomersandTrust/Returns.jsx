import React, { useState } from "react";

export default function ReturnManagement() {
  const [search, setSearch] = useState("");

  const [returns, setReturns] = useState([
    {
      id: 1,
      orderId: "ORD-1023",
      customer: "Aman Chaudhary",
      product: "iPhone 14",
      reason: "Damaged Item",
      status: "Pending",
      amount: "₹72,000",
      date: "2026-01-05",
    },
    {
      id: 2,
      orderId: "ORD-1041",
      customer: "Rohit Sharma",
      product: "Running Shoes",
      reason: "Size Issue",
      status: "Approved",
      amount: "₹4,500",
      date: "2026-01-03",
    },
    {
      id: 3,
      orderId: "ORD-1067",
      customer: "Neha Verma",
      product: "Mixer Grinder",
      reason: "Not Required",
      status: "Rejected",
      amount: "₹3,200",
      date: "2026-01-02",
    },
  ]);

  const filteredReturns = returns.filter(
    (r) =>
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setReturns(returns.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Return Management</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredReturns.map((r) => (
          <div key={r.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{r.orderId}</span>
              <span className="text-sm text-gray-500">{r.date}</span>
            </div>

            <p className="text-sm text-gray-700">{r.customer}</p>
            <p className="text-sm text-gray-600">{r.product}</p>
            <p className="text-sm text-gray-600">Reason: {r.reason}</p>

            <div className="flex justify-between items-center mt-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  r.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : r.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {r.status}
              </span>
              <span className="text-sm font-medium">{r.amount}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStatus(r.id, "Approved")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(r.id, "Rejected")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500"
              >
                Reject
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
                "Order ID",
                "Customer",
                "Product",
                "Amount",
                "Status",
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
            {filteredReturns.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4">{r.orderId}</td>
                <td className="px-6 py-4">{r.customer}</td>
                <td className="px-6 py-4">{r.product}</td>
                <td className="px-6 py-4">{r.amount}</td>
                <td className="px-6 py-4">{r.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(r.id, "Approved")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(r.id, "Rejected")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400"
                  >
                    Reject
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
