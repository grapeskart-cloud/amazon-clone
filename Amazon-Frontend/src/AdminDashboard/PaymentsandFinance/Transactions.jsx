import React, { useState } from "react";

export default function Transactions() {
  const transactionData = [
    {
      id: 1,
      transactionId: "TXN10001",
      orderId: "ORD1001",
      seller: "Seller One",
      amount: 2599,
      paymentMethod: "Credit Card",
      status: "Success",
      date: "2026-01-02",
    },
    {
      id: 2,
      transactionId: "TXN10002",
      orderId: "ORD1002",
      seller: "Seller Two",
      amount: 1499,
      paymentMethod: "UPI",
      status: "Pending",
      date: "2026-01-03",
    },
    {
      id: 3,
      transactionId: "TXN10003",
      orderId: "ORD1003",
      seller: "Seller Three",
      amount: 799,
      paymentMethod: "Net Banking",
      status: "Failed",
      date: "2026-01-04",
    },
    {
      id: 4,
      transactionId: "TXN10004",
      orderId: "ORD1004",
      seller: "Seller One",
      amount: 3299,
      paymentMethod: "Debit Card",
      status: "Refunded",
      date: "2026-01-05",
    },
  ];

  const [search, setSearch] = useState("");
  const [transactions] = useState(transactionData);

  const filtered = transactions.filter(
    (t) =>
      t.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      t.orderId.toLowerCase().includes(search.toLowerCase()) ||
      t.seller.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          + Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 border-l-4 border-indigo-500"
          >
            <h2 className="text-lg font-semibold">{t.transactionId}</h2>
            <p className="text-sm text-gray-600">Order: {t.orderId}</p>
            <p className="text-sm text-gray-600">Seller: {t.seller}</p>
            <p className="text-sm text-gray-600">
              Amount: <span className="font-semibold">₹{t.amount}</span>
            </p>
            <p className="text-sm text-gray-600">Method: {t.paymentMethod}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                t.status
              )}`}
            >
              {t.status}
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
                Transaction ID
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
                Payment Method
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
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">{t.id}</td>
                <td className="px-6 py-4">{t.transactionId}</td>
                <td className="px-6 py-4">{t.orderId}</td>
                <td className="px-6 py-4">{t.seller}</td>
                <td className="px-6 py-4 font-semibold">₹{t.amount}</td>
                <td className="px-6 py-4">{t.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md shadow hover:from-green-600 hover:to-green-500 transition">
                    View
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-md shadow hover:from-red-600 hover:to-red-500 transition">
                    Refund
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
        <button className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded">
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
