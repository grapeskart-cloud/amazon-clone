import React, { useState } from "react";

export default function Invoices() {
  const invoicesData = [
    {
      id: 1,
      invoiceId: "INV1001",
      orderId: "ORD3001",
      seller: "Tech Store",
      amount: 12500,
      tax: 2250,
      total: 14750,
      status: "Paid",
      date: "2026-01-05",
    },
    {
      id: 2,
      invoiceId: "INV1002",
      orderId: "ORD3002",
      seller: "Fashion Hub",
      amount: 4200,
      tax: 756,
      total: 4956,
      status: "Pending",
      date: "2026-01-07",
    },
    {
      id: 3,
      invoiceId: "INV1003",
      orderId: "ORD3003",
      seller: "Book World",
      amount: 1800,
      tax: 324,
      total: 2124,
      status: "Overdue",
      date: "2026-01-08",
    },
  ];

  const [search, setSearch] = useState("");
  const [invoices] = useState(invoicesData);

  const filtered = invoices.filter(
    (i) =>
      i.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      i.orderId.toLowerCase().includes(search.toLowerCase()) ||
      i.seller.toLowerCase().includes(search.toLowerCase()) ||
      i.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Overdue") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition">
          Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((i) => (
          <div
            key={i.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition border-l-4 border-blue-500"
          >
            <h2 className="text-lg font-semibold">{i.invoiceId}</h2>
            <p className="text-sm text-gray-600">Order: {i.orderId}</p>
            <p className="text-sm text-gray-600">Seller: {i.seller}</p>
            <p className="text-sm text-gray-600">Amount: ₹{i.amount}</p>
            <p className="text-sm text-gray-600">Tax: ₹{i.tax}</p>
            <p className="text-sm font-semibold">Total: ₹{i.total}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                i.status
              )}`}
            >
              {i.status}
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
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
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
            {filtered.map((i) => (
              <tr key={i.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{i.id}</td>
                <td className="px-6 py-4">{i.invoiceId}</td>
                <td className="px-6 py-4">{i.orderId}</td>
                <td className="px-6 py-4">{i.seller}</td>
                <td className="px-6 py-4">₹{i.amount}</td>
                <td className="px-6 py-4">₹{i.tax}</td>
                <td className="px-6 py-4 font-semibold">₹{i.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                      i.status
                    )}`}
                  >
                    {i.status}
                  </span>
                </td>
                <td className="px-6 py-4">{i.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                    View
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Download
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
        <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
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
