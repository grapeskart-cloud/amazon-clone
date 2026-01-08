import React, { useState } from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Filter,
  ShoppingBag,
  RefreshCw,
  Calendar,
  Download,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dashboardData = {
  kpis: [
    {
      id: 1,
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "$48,256",
      change: "+8.2%",
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Active Orders",
      value: "156",
      change: "+3.1%",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Inventory Items",
      value: "1,245",
      change: "-2.4%",
      icon: Package,
      color: "bg-orange-100 text-orange-600",
    },
  ],
  recentOrders: [
    {
      id: "#ORD-7841",
      customer: "Amit Sharma",
      date: "2024-01-15",
      amount: "$245.99",
      status: "Delivered",
    },
    {
      id: "#ORD-7840",
      customer: "Priya Patel",
      date: "2024-01-15",
      amount: "$129.50",
      status: "Processing",
    },
    {
      id: "#ORD-7839",
      customer: "Raj Verma",
      date: "2024-01-14",
      amount: "$89.99",
      status: "Shipped",
    },
    {
      id: "#ORD-7838",
      customer: "Neha Gupta",
      date: "2024-01-14",
      amount: "$345.00",
      status: "Pending",
    },
    {
      id: "#ORD-7837",
      customer: "Sandeep Kumar",
      date: "2024-01-13",
      amount: "$67.50",
      status: "Delivered",
    },
  ],
  topProducts: [
    { name: "Wireless Headphones", sales: 342, stock: 45 },
    { name: "Smart Watch", sales: 289, stock: 12 },
    { name: "Laptop Stand", sales: 187, stock: 89 },
    { name: "Phone Case", sales: 421, stock: 156 },
  ],
  userActivity: [
    { user: "Admin", action: "Added new product", time: "10:30 AM" },
    { user: "Manager", action: "Updated order status", time: "09:45 AM" },
    { user: "Editor", action: "Published blog post", time: "Yesterday" },
    { user: "Customer", action: "Placed new order", time: "Yesterday" },
  ],
  notifications: [
    {
      id: 1,
      text: "New order received #ORD-7841",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      text: "Low stock alert: Smart Watch",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, text: "System backup completed", time: "2 hours ago", read: true },
  ],
};

const revenueData = [
  { day: "Day 1", revenue: 650 },
  { day: "Day 2", revenue: 800 },
  { day: "Day 3", revenue: 600 },
  { day: "Day 4", revenue: 750 },
  { day: "Day 5", revenue: 900 },
  { day: "Day 6", revenue: 850 },
  { day: "Day 7", revenue: 700 },
];

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState("today");
  const [userData] = useState(dashboardData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">Summary of your business performance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download size={18} /> Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userData.kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">{kpi.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{kpi.value}</h3>
                  <div
                    className={`inline-flex items-center gap-1 mt-2 ${
                      kpi.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendingUp size={16} />
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${kpi.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-6">Revenue Trend</h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Recent Orders</h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600">Order ID</th>
                  <th className="text-left py-3 text-gray-600">Customer</th>
                  <th className="text-left py-3 text-gray-600">Amount</th>
                  <th className="text-left py-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3 font-semibold">{order.amount}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Activity Logs</h3>
            <RefreshCw size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-4">
            {userData.userActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-gray-100 rounded-full">
                  <Users size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-gray-600 text-sm">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <Bell size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {userData.notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                !notification.read
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{notification.text}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-center text-green-600 hover:text-green-700 font-medium py-2">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
