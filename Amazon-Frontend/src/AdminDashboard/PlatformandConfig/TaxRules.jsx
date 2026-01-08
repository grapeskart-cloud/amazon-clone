import React, { useState } from "react";

export default function TaxRules() {
  const [taxRules, setTaxRules] = useState([
    {
      id: 1,
      name: "GST Standard",
      type: "Percentage",
      value: 18,
      applicableCategory: "All",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      status: "Active",
    },
    {
      id: 2,
      name: "Luxury Goods Tax",
      type: "Percentage",
      value: 28,
      applicableCategory: "Luxury",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Books Tax",
      type: "Flat",
      value: 5,
      applicableCategory: "Books",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredRules = taxRules.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setTaxRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" }
          : r
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tax Rules Management</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Tax Rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-5 py-2 rounded text-white bg-gradient-to-r from-indigo-600 to-indigo-500 shadow hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
          + Add Tax Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {filteredRules.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{r.name}</h2>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  r.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {r.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Type: {r.type}{" "}
              {r.type === "Percentage" ? `%${r.value}` : `₹${r.value}`}
            </p>
            <p className="text-sm text-gray-600">
              Category: {r.applicableCategory}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Validity: {r.startDate} - {r.endDate}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => toggleStatus(r.id)}
                className={`px-3 py-1 rounded text-white text-sm ${
                  r.status === "Active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {r.status === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Value
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Validity
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredRules.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4">{r.name}</td>
                <td className="px-6 py-4">{r.type}</td>
                <td className="px-6 py-4">
                  {r.type === "Percentage" ? `%${r.value}` : `₹${r.value}`}
                </td>
                <td className="px-6 py-4">{r.applicableCategory}</td>
                <td className="px-6 py-4">
                  {r.startDate} - {r.endDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      r.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-3">
                  <button className="text-indigo-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Remove
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
