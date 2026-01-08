import React, { useState } from "react";

export default function MarketingCampaigns() {
  const [search, setSearch] = useState("");

  const campaigns = [
    {
      id: 1,
      name: "Diwali Mega Sale",
      channel: "Email + Ads",
      budget: "₹5,00,000",
      reach: "1.2M",
      conversions: "24K",
      status: "Running",
    },
    {
      id: 2,
      name: "New User Cashback",
      channel: "Push Notification",
      budget: "₹2,00,000",
      reach: "600K",
      conversions: "12K",
      status: "Paused",
    },
    {
      id: 3,
      name: "Summer Clearance",
      channel: "Social Media",
      budget: "₹3,50,000",
      reach: "900K",
      conversions: "18K",
      status: "Completed",
    },
  ];

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Marketing Campaigns</h1>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Campaigns..."
          className="px-4 py-2 border rounded w-full sm:w-1/2 focus:ring-2 focus:ring-orange-400"
        />
        <button className="px-5 py-2 text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 shadow">
          + Create Campaign
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{c.name}</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  c.status === "Running"
                    ? "bg-green-100 text-green-700"
                    : c.status === "Paused"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {c.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">{c.channel}</p>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Budget</p>
                <p className="font-medium">{c.budget}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Reach</p>
                <p className="font-medium">{c.reach}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Conversions</p>
                <p className="font-medium">{c.conversions}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400">
                View
              </button>
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400">
                Edit
              </button>
              <button className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-red-500 to-red-400">
                Stop
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Campaign",
                "Channel",
                "Budget",
                "Reach",
                "Conversions",
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
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{c.id}</td>
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4">{c.channel}</td>
                <td className="px-6 py-4">{c.budget}</td>
                <td className="px-6 py-4">{c.reach}</td>
                <td className="px-6 py-4">{c.conversions}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      c.status === "Running"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Paused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {c.status}
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
                    Stop
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
