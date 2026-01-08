import React, { useState } from "react";

export default function LogisticsPartners() {
  const [search, setSearch] = useState("");

  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "DHL Express",
      contact: "support@dhl.com",
      phone: "+91 9876543210",
      coverage: "Pan India",
      deliveries: 12450,
      rating: 4.6,
      status: "Active",
    },
    {
      id: 2,
      name: "FedEx",
      contact: "help@fedex.com",
      phone: "+91 9123456780",
      coverage: "Metro Cities",
      deliveries: 8450,
      rating: 4.2,
      status: "Active",
    },
    {
      id: 3,
      name: "Blue Dart",
      contact: "care@bluedart.com",
      phone: "+91 9988776655",
      coverage: "Tier 1 & 2 Cities",
      deliveries: 6300,
      rating: 3.9,
      status: "Inactive",
    },
  ]);

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.coverage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Logistics Partners</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Partners..."
          className="w-full sm:w-1/2 px-4 py-2 rounded border focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow hover:from-indigo-700 hover:to-indigo-600 transition">
          + Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  p.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">{p.contact}</p>
            <p className="text-sm text-gray-600">{p.phone}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-gray-500">Coverage</p>
                <p className="font-medium">{p.coverage}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-gray-500">Deliveries</p>
                <p className="font-medium">{p.deliveries}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-gray-500">Rating</p>
                <p className="font-medium">{p.rating} ★</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500">
                View
              </button>
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500">
                Edit
              </button>
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500">
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Partner",
                "Contact",
                "Coverage",
                "Deliveries",
                "Rating",
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
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{p.id}</td>
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">{p.contact}</td>
                <td className="px-6 py-4">{p.coverage}</td>
                <td className="px-6 py-4">{p.deliveries}</td>
                <td className="px-6 py-4">{p.rating} ★</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400">
                    Disable
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
