import React, { useState } from "react";
import {
  BarChart3,
  PieChart,
  Download,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Eye,
} from "lucide-react";

export default function ReportsAnalytics() {
  const [activeReport, setActiveReport] = useState("sales");
  const [dateRange, setDateRange] = useState("month");
  const [exportFormat, setExportFormat] = useState("csv");

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [12000, 19000, 15000, 25000, 22000, 30000],
  };

  const userGrowthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [150, 230, 180, 320],
  };

  const categoryData = [
    { name: "Electronics", value: 35, color: "#10B981" },
    { name: "Accessories", value: 25, color: "#3B82F6" },
    { name: "Wearables", value: 20, color: "#8B5CF6" },
    { name: "Others", value: 20, color: "#F59E0B" },
  ];

  const reports = [
    {
      id: "sales",
      title: "Sales Report",
      desc: "Daily, weekly, monthly sales data",
      icon: DollarSign,
    },
    {
      id: "users",
      title: "User Growth",
      desc: "New user registration trends",
      icon: Users,
    },
    {
      id: "products",
      title: "Product Performance",
      desc: "Top selling products",
      icon: TrendingUp,
    },
    {
      id: "revenue",
      title: "Revenue Analytics",
      desc: "Revenue by category and channel",
      icon: BarChart3,
    },
  ];

  const handleExport = () => {
    alert(`Exporting ${activeReport} report as ${exportFormat.toUpperCase()}`);
  };

  const renderChart = () => {
    const data = activeReport === "sales" ? salesData : userGrowthData;

    const maxValue = Math.max(...data.values);
    const chartHeight = 200;

    return (
      <div className="h-64 flex items-end justify-between gap-2 pt-8">
        {data.values.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg"
              style={{ height: `${(value / maxValue) * chartHeight}px` }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">
              {data.labels[index]}
            </span>
            <span className="text-xs font-medium mt-1">
              ${value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Reports & Analytics
          </h2>
          <p className="text-gray-600">
            User growth, sales reports, data export (CSV, PDF)
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`p-6 rounded-xl border text-left transition-all ${
                activeReport === report.id
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-full ${
                    activeReport === report.id
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-lg">{report.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{report.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-lg capitalize">
                {activeReport === "sales"
                  ? "Sales Report"
                  : "User Growth Report"}
              </h3>
              <p className="text-gray-600 text-sm">Data for {dateRange}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
              <Filter size={20} className="text-gray-400 cursor-pointer" />
            </div>
          </div>
          {renderChart()}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Previous Period</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Revenue by Category</h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${category.value}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold w-12 text-right">
                    {category.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-6">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Sales Summary", format: "PDF", size: "2.4 MB" },
            { title: "User Analytics", format: "CSV", size: "1.8 MB" },
            { title: "Product Performance", format: "Excel", size: "3.1 MB" },
            { title: "Financial Report", format: "PDF", size: "4.2 MB" },
          ].map((report, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <FileText size={20} className="text-gray-400" />
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {report.format}
                </span>
              </div>
              <h4 className="font-medium mb-2">{report.title}</h4>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{report.size}</span>
                <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-6">Export Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="space-y-3">
              {["csv", "pdf", "excel", "json"].map((format) => (
                <label key={format} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format}
                    checked={exportFormat === format}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="capitalize">{format.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="space-y-3">
              {["today", "week", "month", "quarter", "year", "custom"].map(
                (range) => (
                  <label key={range} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="dateRange"
                      value={range}
                      checked={dateRange === range}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="capitalize">{range}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Include Data
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Sales Data",
              "User Data",
              "Product Data",
              "Order Data",
              "Financial Data",
            ].map((dataType) => (
              <label key={dataType} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span>{dataType}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download size={18} /> Generate & Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
