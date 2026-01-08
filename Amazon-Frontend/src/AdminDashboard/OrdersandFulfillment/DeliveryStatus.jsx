import React, { useState } from "react";

export default function DeliveryStatus() {
  const deliveryData = [
    {
      id: 1,
      orderId: "ORD1001",
      customer: "John Doe",
      status: "Delivered",
      shippedDate: "2026-01-01",
      expectedDelivery: "2026-01-05",
    },
    {
      id: 2,
      orderId: "ORD1002",
      customer: "Jane Smith",
      status: "In Transit",
      shippedDate: "2026-01-02",
      expectedDelivery: "2026-01-06",
    },
    {
      id: 3,
      orderId: "ORD1003",
      customer: "Bob Johnson",
      status: "Pending",
      shippedDate: "2026-01-03",
      expectedDelivery: "2026-01-07",
    },
    {
      id: 4,
      orderId: "ORD1004",
      customer: "Alice Brown",
      status: "Cancelled",
      shippedDate: "2026-01-04",
      expectedDelivery: "2026-01-08",
    },
  ];

  const [search, setSearch] = useState("");
  const [deliveries] = useState(deliveryData);

  const filtered = deliveries.filter(
    (d) =>
      d.orderId.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Delivery Status</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          + Add Delivery
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((d) => (
          <div
            key={d.id}
            className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 border-l-4 ${getStatusColor(
              d.status
            )}`}
          >
            <h2 className="text-lg font-semibold mb-2">{d.orderId}</h2>
            <p className="text-gray-700 text-sm">Customer: {d.customer}</p>
            <p className="text-gray-700 text-sm">Shipped: {d.shippedDate}</p>
            <p className="text-gray-700 text-sm">
              Expected: {d.expectedDelivery}
            </p>
            <span
              className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-semibold ${getStatusColor(
                d.status
              )}`}
            >
              {d.status}
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
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipped Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Delivery
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
            {filtered.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{d.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{d.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{d.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{d.shippedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {d.expectedDelivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      d.status
                    )}`}
                  >
                    {d.status}
                  </span>
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
