import React, { useState } from "react";
import {
  ShoppingCart,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Package,
  Truck,
  User,
  Calendar,
  Download,
} from "lucide-react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-7841",
      customer: "Amit Sharma",
      date: "2024-01-15",
      amount: "$245.99",
      status: "Delivered",
      items: 3,
      payment: "Paid",
    },
    {
      id: "#ORD-7840",
      customer: "Priya Patel",
      date: "2024-01-15",
      amount: "$129.50",
      status: "Processing",
      items: 2,
      payment: "Paid",
    },
    {
      id: "#ORD-7839",
      customer: "Raj Verma",
      date: "2024-01-14",
      amount: "$89.99",
      status: "Shipped",
      items: 1,
      payment: "Paid",
    },
    {
      id: "#ORD-7838",
      customer: "Neha Gupta",
      date: "2024-01-14",
      amount: "$345.00",
      status: "Pending",
      items: 5,
      payment: "Pending",
    },
    {
      id: "#ORD-7837",
      customer: "Sandeep Kumar",
      date: "2024-01-13",
      amount: "$67.50",
      status: "Delivered",
      items: 2,
      payment: "Paid",
    },
    {
      id: "#ORD-7836",
      customer: "Anjali Singh",
      date: "2024-01-13",
      amount: "$199.99",
      status: "Cancelled",
      items: 1,
      payment: "Refunded",
    },
  ]);

  const [refunds, setRefunds] = useState([
    {
      id: "#REF-1001",
      orderId: "#ORD-7836",
      customer: "Anjali Singh",
      amount: "$199.99",
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: "#REF-1000",
      orderId: "#ORD-7835",
      customer: "Rohit Mehta",
      amount: "$89.50",
      status: "Pending",
      date: "2024-01-13",
    },
  ]);

  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState({
    orderId: "",
    amount: "",
    reason: "",
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleRefund = (order) => {
    setRefundData({
      orderId: order.id,
      amount: order.amount,
      reason: "",
    });
    setShowRefundModal(true);
  };

  const processRefund = () => {
    const newRefund = {
      id: `#REF-${1002 + refunds.length}`,
      orderId: refundData.orderId,
      customer: orders.find((o) => o.id === refundData.orderId)?.customer || "",
      amount: refundData.amount,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    setRefunds([...refunds, newRefund]);
    setShowRefundModal(false);
    setRefundData({ orderId: "", amount: "", reason: "" });
    alert("Refund request submitted!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment) => {
    return payment === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-gray-600">
            View orders, change status, process refunds
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download size={18} /> Export Orders
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {["orders", "refunds"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "orders" && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search orders by ID or customer..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Payment
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={16} className="text-gray-400" />
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          <span>{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      <td className="py-3 px-4 font-semibold">
                        {order.amount}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                            order.payment
                          )}`}
                        >
                          {order.payment}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Delivered")
                            }
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Mark as Delivered"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleRefund(order)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Process Refund"
                          >
                            <RefreshCw size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "refunds" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Refund ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{refund.id}</td>
                    <td className="py-3 px-4">{refund.orderId}</td>
                    <td className="py-3 px-4">{refund.customer}</td>
                    <td className="py-3 px-4 font-semibold">{refund.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          refund.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {refund.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{refund.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                Order Details - {selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Customer Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedOrder.customer}
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {selectedOrder.date}
                    </p>
                    <p>
                      <span className="font-medium">Items:</span>{" "}
                      {selectedOrder.items}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Order Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Amount:</span>{" "}
                      {selectedOrder.amount}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Payment:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                          selectedOrder.payment
                        )}`}
                      >
                        {selectedOrder.payment}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  Update Status
                </h4>
                <div className="flex gap-3">
                  {[
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, status)
                      }
                      className={`px-4 py-2 rounded-lg ${
                        selectedOrder.status === status
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRefund(selectedOrder)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Process Refund</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  value={refundData.orderId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Refund Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={refundData.amount}
                    onChange={(e) =>
                      setRefundData({ ...refundData, amount: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Refund
                </label>
                <select
                  value={refundData.reason}
                  onChange={(e) =>
                    setRefundData({ ...refundData, reason: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Reason</option>
                  <option value="defective">Defective Product</option>
                  <option value="wrong_item">Wrong Item Shipped</option>
                  <option value="cancelled">Order Cancelled</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {refundData.reason === "other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Reason
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="Please specify the reason"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={processRefund}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
