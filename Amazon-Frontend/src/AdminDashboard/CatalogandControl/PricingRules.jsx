import React, { useState } from "react";

export default function PricingRules() {
  const pricingRulesData = [
    {
      id: 1,
      name: "Festive Sale",
      discountType: "Percentage",
      value: 20,
      applicableCategory: "Electronics",
      startDate: "2026-01-10",
      endDate: "2026-01-20",
    },
    {
      id: 2,
      name: "New Year Discount",
      discountType: "Flat",
      value: 500,
      applicableCategory: "Fashion",
      startDate: "2026-01-01",
      endDate: "2026-01-05",
    },
    {
      id: 3,
      name: "Books Special",
      discountType: "Percentage",
      value: 15,
      applicableCategory: "Books",
      startDate: "2026-01-05",
      endDate: "2026-01-15",
    },
  ];

  const [search, setSearch] = useState("");
  const [pricingRules] = useState(pricingRulesData);

  const filteredRules = pricingRules.filter((rule) =>
    rule.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCardColor = (type) => {
    switch (type) {
      case "Percentage":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "Flat":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Pricing Rules</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Pricing Rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300">
          + Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ${getCardColor(
              rule.discountType
            )}`}
          >
            <h2 className="text-lg font-semibold mb-2">{rule.name}</h2>
            <p className="text-gray-700 text-sm mb-1">
              Discount: {rule.discountType} {rule.value}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              Category: {rule.applicableCategory}
            </p>
            <p className="text-gray-600 text-sm">
              Valid: {rule.startDate} - {rule.endDate}
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
                Discount Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
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
            {filteredRules.map((rule) => (
              <tr
                key={rule.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{rule.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rule.name}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-semibold ${
                    rule.discountType === "Percentage"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {rule.discountType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{rule.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rule.applicableCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rule.startDate} - {rule.endDate}
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
        <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded hover:from-blue-700 hover:to-blue-600 transition duration-300">
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
