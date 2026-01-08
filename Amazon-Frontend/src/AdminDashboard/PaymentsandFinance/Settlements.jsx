import React, { useState } from "react";

export default function Settlements() {
  const settlementsData = [
    {
      id: 1,
      settlementId: "SET1001",
      seller: "Seller One",
      totalOrders: 25,
      grossAmount: 52000,
      commission: 5200,
      netPayable: 46800,
      status: "Completed",
      date: "2026-01-05",
    },
    {
      id: 2,
      settlementId: "SET1002",
      seller: "Seller Two",
      totalOrders: 18,
      grossAmount: 38900,
      commission: 5835,
      netPayable: 33065,
      status: "Pending",
      date: "2026-01-06",
    },
    {
      id: 3,
      settlementId: "SET1003",
      seller: "Seller Three",
      totalOrders: 12,
      grossAmount: 21400,
      commission: 1070,
      netPayable: 20330,
      status: "Failed",
      date: "2026-01-07",
    },
  ];

  const [search, setSearch] = useState("");
  const [settlements] = useState(settlementsData);

  const filtered = settlements.filter(
    (s) =>
      s.settlementId.toLowerCase().includes(search.toLowerCase()) ||
      s.seller.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Failed") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settlements</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Settlements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition">
          Generate Settlement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition border-l-4 border-blue-500"
          >
            <h2 className="text-lg font-semibold">{s.settlementId}</h2>
            <p className="text-sm text-gray-600">Seller: {s.seller}</p>
            <p className="text-sm text-gray-600">Orders: {s.totalOrders}</p>
            <p className="text-sm text-gray-600">Gross: ₹{s.grossAmount}</p>
            <p className="text-sm text-gray-600">Commission: ₹{s.commission}</p>
            <p className="text-sm font-semibold">
              Net Payable: ₹{s.netPayable}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                s.status
              )}`}
            >
              {s.status}
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
                Settlement ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Gross
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Net
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
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{s.id}</td>
                <td className="px-6 py-4">{s.settlementId}</td>
                <td className="px-6 py-4">{s.seller}</td>
                <td className="px-6 py-4">{s.totalOrders}</td>
                <td className="px-6 py-4">₹{s.grossAmount}</td>
                <td className="px-6 py-4">₹{s.commission}</td>
                <td className="px-6 py-4 font-semibold">₹{s.netPayable}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(
                      s.status
                    )}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">{s.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    View
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
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
