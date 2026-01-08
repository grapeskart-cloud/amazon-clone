import React, { useState } from "react";

export default function Refunds() {
  const refundsData = [
    {
      id: 1,
      refundId: "REF1001",
      orderId: "ORD2001",
      customer: "Aman Verma",
      amount: 2500,
      reason: "Damaged Product",
      status: "Completed",
      date: "2026-01-08",
    },
    {
      id: 2,
      refundId: "REF1002",
      orderId: "ORD2002",
      customer: "Rohit Sharma",
      amount: 1200,
      reason: "Wrong Item",
      status: "Pending",
      date: "2026-01-09",
    },
    {
      id: 3,
      refundId: "REF1003",
      orderId: "ORD2003",
      customer: "Neha Singh",
      amount: 899,
      reason: "Order Cancelled",
      status: "Rejected",
      date: "2026-01-10",
    },
  ];

  const [search, setSearch] = useState("");
  const [refunds] = useState(refundsData);

  const filtered = refunds.filter(
    (r) =>
      r.refundId.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Rejected") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Refunds</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Refunds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow hover:from-indigo-700 hover:to-indigo-600 transition">
          Create Refund
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition border-l-4 border-indigo-500"
          >
            <h2 className="text-lg font-semibold">{r.refundId}</h2>
            <p className="text-sm text-gray-600">Order: {r.orderId}</p>
            <p className="text-sm text-gray-600">Customer: {r.customer}</p>
            <p className="text-sm text-gray-600">Reason: {r.reason}</p>
            <p className="text-sm font-semibold">Amount: ₹{r.amount}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                r.status
              )}`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Refund ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4">{r.refundId}</td>
                <td className="px-6 py-4">{r.orderId}</td>
                <td className="px-6 py-4">{r.customer}</td>
                <td className="px-6 py-4 font-semibold">₹{r.amount}</td>
                <td className="px-6 py-4">{r.reason}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Prev
        </button>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">
          1
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          3
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
}
