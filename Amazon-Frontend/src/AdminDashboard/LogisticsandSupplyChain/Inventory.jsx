import React from "react";

function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Inventory Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total SKUs</h3>
          <p className="text-3xl font-bold text-blue-600">2,456</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
          <p className="text-3xl font-bold text-red-600">24</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Out of Stock</h3>
          <p className="text-3xl font-bold text-yellow-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Value</h3>
          <p className="text-3xl font-bold text-green-600">$1.2M</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Low Stock Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reorder Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">iPhone 15 Pro</td>
                <td className="px-4 py-3">SKU-IP15P</td>
                <td className="px-4 py-3">8</td>
                <td className="px-4 py-3">20</td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    Reorder
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
