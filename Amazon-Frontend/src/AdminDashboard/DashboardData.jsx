export const dashboardData = {
  kpis: [
    {
      id: 1,
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: "Users",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "$48,256",
      change: "+8.2%",
      icon: "DollarSign",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Active Orders",
      value: "156",
      change: "+3.1%",
      icon: "ShoppingCart",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Inventory Items",
      value: "1,245",
      change: "-2.4%",
      icon: "Package",
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
