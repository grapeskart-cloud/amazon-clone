import React, { useState } from "react";

export default function Commission() {
  const commissionData = [
    {
      id: 1,
      name: "Electronics Commission",
      percentage: 10,
      applicableCategory: "Electronics",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    },
    {
      id: 2,
      name: "Fashion Commission",
      percentage: 15,
      applicableCategory: "Fashion",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    },
    {
      id: 3,
      name: "Books Commission",
      percentage: 5,
      applicableCategory: "Books",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    },
  ];

  const [search, setSearch] = useState("");
  const [commissions] = useState(commissionData);

  const filtered = commissions.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCardColor = (category) => {
    switch (category) {
      case "Electronics":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "Fashion":
        return "bg-purple-50 border-l-4 border-purple-500";
      case "Books":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Commission Rules</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Commission Rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-purple-600 transition duration-300">
          + Add Commission
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ${getCardColor(
              c.applicableCategory
            )}`}
          >
            <h2 className="text-lg font-semibold mb-2">{c.name}</h2>
            <p className="text-gray-700 text-sm mb-1">
              Commission: {c.percentage}%
            </p>
            <p className="text-gray-700 text-sm mb-1">
              Category: {c.applicableCategory}
            </p>
            <p className="text-gray-600 text-sm">
              Valid: {c.startDate} - {c.endDate}
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-semibold ${
                    c.percentage >= 10 ? "text-purple-600" : "text-green-600"
                  }`}
                >
                  {c.percentage}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {c.applicableCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {c.startDate} - {c.endDate}
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
        <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded hover:from-purple-700 hover:to-purple-600 transition duration-300">
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
