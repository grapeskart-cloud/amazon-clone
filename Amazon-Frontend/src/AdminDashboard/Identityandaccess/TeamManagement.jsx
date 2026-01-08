import React from "react";

function TeamManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Team Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">Total Teams</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">6</p>
          </div>
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">Active Members</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">42</p>
          </div>
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">Departments</h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">8</p>
          </div>
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">Online Now</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">15</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-4">Team Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">8 members</p>
            <p className="text-gray-500 text-sm">Lead: Sarah Johnson</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Sales Team</h3>
            <p className="text-gray-600">6 members</p>
            <p className="text-gray-500 text-sm">Lead: Michael Chen</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Technical Team</h3>
            <p className="text-gray-600">10 members</p>
            <p className="text-gray-500 text-sm">Lead: David Wilson</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;
