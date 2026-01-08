import React, { useState } from "react";

export default function Shipments() {
  const shipmentsData = [
    {
      id: 1,
      orderId: "ORD1001",
      customer: "John Doe",
      status: "In Transit",
      courier: "DHL",
      shippedDate: "2026-01-01",
      expectedDelivery: "2026-01-05",
    },
    {
      id: 2,
      orderId: "ORD1002",
      customer: "Jane Smith",
      status: "Delivered",
      courier: "FedEx",
      shippedDate: "2026-01-02",
      expectedDelivery: "2026-01-06",
    },
    {
      id: 3,
      orderId: "ORD1003",
      customer: "Bob Johnson",
      status: "Pending",
      courier: "UPS",
      shippedDate: "2026-01-03",
      expectedDelivery: "2026-01-07",
    },
  ];

  const [search, setSearch] = useState("");
  const [shipments] = useState(shipmentsData);

  const filtered = shipments.filter(
    (s) =>
      s.orderId.toLowerCase().includes(search.toLowerCase()) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Shipments</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Shipments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          + Add Shipment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition duration-300 border-l-8"
            style={{
              borderColor:
                s.status === "Delivered"
                  ? "#16a34a"
                  : s.status === "In Transit"
                  ? "#3b82f6"
                  : s.status === "Pending"
                  ? "#facc15"
                  : "#d1d5db",
            }}
          >
            <h2 className="text-lg font-semibold mb-2">{s.orderId}</h2>
            <p className="text-gray-700 text-sm mb-1">Customer: {s.customer}</p>
            <p
              className={`text-sm font-semibold mb-1 ${getStatusColor(
                s.status
              )}`}
            >
              Status: {s.status}
            </p>
            <p className="text-gray-700 text-sm mb-1">Courier: {s.courier}</p>
            <p className="text-gray-600 text-sm">
              Shipped: {s.shippedDate} | Expected: {s.expectedDelivery}
            </p>
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
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipped / Expected
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{s.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{s.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{s.customer}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-semibold ${getStatusColor(
                    s.status
                  )}`}
                >
                  {s.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{s.courier}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {s.shippedDate} - {s.expectedDelivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-md shadow hover:from-green-600 hover:to-green-500 transition duration-300">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-md shadow hover:from-red-600 hover:to-red-500 transition duration-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          Prev
        </button>
        <button className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          1
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          3
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          Next
        </button>
      </div>
    </div>
  );
}
