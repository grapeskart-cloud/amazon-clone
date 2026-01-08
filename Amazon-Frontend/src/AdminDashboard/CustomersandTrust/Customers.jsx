import React, { useState } from "react";

export default function CustomerManagement() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Aman Chaudhary",
      email: "aman@gmail.com",
      phone: "9310219283",
      status: "Active",
      orders: 12,
      totalSpent: "₹45,000",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      phone: "9876543210",
      status: "Inactive",
      orders: 3,
      totalSpent: "₹8,200",
    },
    {
      id: 3,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9123456789",
      status: "Active",
      orders: 8,
      totalSpent: "₹21,500",
    },
  ]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const addCustomer = () => {
    setCustomers([
      ...customers,
      {
        id: customers.length + 1,
        name: "New Customer",
        email: "new@gmail.com",
        phone: "9000000000",
        status: "Active",
        orders: 0,
        totalSpent: "₹0",
      },
    ]);
  };

  const toggleStatus = (id) => {
    setCustomers(
      customers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  const editCustomer = (id) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, name: c.name + " ✏️" } : c))
    );
  };

  const viewCustomer = (c) => {
    alert(
      `Name: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nOrders: ${c.orders}\nSpent: ${c.totalSpent}`
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addCustomer}
          className="px-5 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow"
        >
          + Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredCustomers.map((c) => (
          <div key={c.id} className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600">{c.email}</p>
            <p className="text-sm text-gray-600">{c.phone}</p>

            <div className="flex justify-between mt-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  c.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.status}
              </span>
              <span className="text-sm">{c.totalSpent}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => viewCustomer(c)}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
              >
                View
              </button>
              <button
                onClick={() => editCustomer(c.id)}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500"
              >
                Edit
              </button>
              <button
                onClick={() => toggleStatus(c.id)}
                className={`px-3 py-1 text-xs text-white rounded ${
                  c.status === "Active"
                    ? "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500"
                    : "bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
                }`}
              >
                {c.status === "Active" ? "Block" : "Unblock"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Name",
                "Email",
                "Orders",
                "Spent",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4">{c.id}</td>
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.orders}</td>
                <td className="px-6 py-4">{c.totalSpent}</td>
                <td className="px-6 py-4">{c.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => viewCustomer(c)}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-blue-400"
                  >
                    View
                  </button>
                  <button
                    onClick={() => editCustomer(c.id)}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-purple-500 to-purple-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className={`px-3 py-1 text-xs text-white rounded ${
                      c.status === "Active"
                        ? "bg-gradient-to-r from-red-500 to-red-400"
                        : "bg-gradient-to-r from-green-500 to-green-400"
                    }`}
                  >
                    {c.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
