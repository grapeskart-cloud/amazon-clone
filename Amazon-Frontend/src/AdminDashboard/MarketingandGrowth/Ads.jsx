import React from "react";

function Ads() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Advertisements Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Today's Spend</h3>
          <p className="text-3xl font-bold text-green-600">$2,450</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">ROI</h3>
          <p className="text-3xl font-bold text-purple-600">4.2x</p>
        </div>
      </div>
    </div>
  );
}

export default Ads;
