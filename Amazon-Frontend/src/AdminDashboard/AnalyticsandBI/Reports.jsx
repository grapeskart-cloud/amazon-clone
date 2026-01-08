import React from "react";

function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Reports Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Report</h2>
          <p className="text-gray-600 mb-4">
            Detailed sales analysis by category, region, and time period.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Report
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Report</h2>
          <p className="text-gray-600 mb-4">
            Customer demographics, behavior, and retention metrics.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Report
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Inventory Report</h2>
          <p className="text-gray-600 mb-4">
            Stock levels, turnover rates, and forecasting.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;
