import React from "react";

function RolesPermissions() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Roles & Permissions
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">System Roles</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Create New Role
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Super Admin</h3>
            <p className="text-gray-600 text-sm mb-3">
              Full access to all system features
            </p>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              3 Users
            </span>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Manager</h3>
            <p className="text-gray-600 text-sm mb-3">
              Manage orders, products, and customers
            </p>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              8 Users
            </span>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Customer support and ticket management
            </p>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              12 Users
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesPermissions;
