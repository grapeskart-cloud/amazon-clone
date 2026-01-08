import React from "react";

const RecentOrders = ({ recentOrders }) => {
  return (
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
            {recentOrders.map((order) => (
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
  );
};

export default RecentOrders;
