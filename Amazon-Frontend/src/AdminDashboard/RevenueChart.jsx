import React from "react";
import { Filter, Calendar } from "lucide-react";

const RevenueChart = ({ dateFilter, setDateFilter }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Revenue Trend</h3>
        <Filter size={20} className="text-gray-400 cursor-pointer" />
      </div>
      <div className="h-64 flex items-end justify-between gap-2">
        {[65, 80, 60, 75, 90, 85, 70].map((height, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg"
              style={{ height: `${height}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">Day {index + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Current Month</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm">Last Month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
