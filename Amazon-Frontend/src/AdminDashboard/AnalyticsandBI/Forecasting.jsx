import React from "react";

function Forecasting() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Sales Forecasting
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Next Quarter Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">October 2024</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">$280K</p>
            <p className="text-green-600 text-sm">+12% expected</p>
          </div>
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">November 2024</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">$320K</p>
            <p className="text-green-600 text-sm">+18% expected</p>
          </div>
          <div className="text-center p-4 border rounded">
            <h3 className="font-semibold">December 2024</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">$450K</p>
            <p className="text-green-600 text-sm">+25% expected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecasting;
