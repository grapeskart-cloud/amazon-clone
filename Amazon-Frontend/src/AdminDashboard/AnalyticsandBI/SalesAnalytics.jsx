import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesAnalytics() {
  const data = [
    { day: "Mon", sales: 40 },
    { day: "Tue", sales: 60 },
    { day: "Wed", sales: 80 },
    { day: "Thu", sales: 100 },
    { day: "Fri", sales: 85 },
    { day: "Sat", sales: 90 },
    { day: "Sun", sales: 95 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Today's Sales</h3>
          <p className="text-3xl font-bold text-green-600">$12,450</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
          <p className="text-3xl font-bold text-blue-600">$248,900</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Avg. Order Value</h3>
          <p className="text-3xl font-bold text-purple-600">$89.50</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-yellow-600">3.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Weekly Sales Performance</h2>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#16a34a" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SalesAnalytics;
