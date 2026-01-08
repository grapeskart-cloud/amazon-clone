import {
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  PieChart,
  Shield,
  Store,
  CreditCard,
  Truck,
  MessageSquare,
  Database,
  AlertTriangle,
  Bell,
  Server,
  Scale,
  ChevronDown,
  ChevronRight,
  UserCheck,
  FolderTree,
  Tag,
  TrendingUp,
  Layers,
  FileCheck,
  Wallet,
  RefreshCw,
  UserCircle,
  ShieldCheck,
  BarChart,
  Megaphone,
  Cloud,
  FolderCog,
  BellRing,
  Cpu,
  Gavel,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    identity: true,
    vendors: true,
    catalog: true,
    orders: true,
    payments: true,
    customers: true,
    logistics: true,
    marketing: true,
    analytics: true,
    risk: true,
    platform: true,
    notifications: true,
    devops: true,
    legal: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navSections = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      items: [],
    },
    {
      id: "identity",
      label: "Identity & Access",
      icon: ShieldCheck,
      items: [
        { id: "roles", label: "Roles & Permissions", icon: UserCheck },
        { id: "admin-users", label: "Admin Users", icon: Users },
        { id: "team", label: "Team Management", icon: Users },
      ],
    },
    {
      id: "vendors",
      label: "Vendors / Sellers",
      icon: Store,
      items: [
        { id: "seller-list", label: "Seller List", icon: Users },
        { id: "kyc", label: "KYC & Verification", icon: FileCheck },
        {
          id: "seller-performance",
          label: "Seller Performance",
          icon: TrendingUp,
        },
      ],
    },
    {
      id: "catalog",
      label: "Catalog & Control",
      icon: FolderTree,
      items: [
        { id: "products", label: "Products", icon: Package },
        { id: "categories", label: "Categories", icon: FolderTree },
        { id: "pricing", label: "Pricing Rules", icon: Tag },
        { id: "commission", label: "Commission Engine", icon: TrendingUp },
      ],
    },
    {
      id: "orders",
      label: "Orders & Fulfillment",
      icon: ShoppingCart,
      items: [
        { id: "orders", label: "Orders", icon: ShoppingCart },
        { id: "shipments", label: "Shipments", icon: Truck },
        { id: "delivery", label: "Delivery Status", icon: Truck },
      ],
    },
    {
      id: "payments",
      label: "Payments & Finance",
      icon: CreditCard,
      items: [
        { id: "transactions", label: "Transactions", icon: CreditCard },
        { id: "settlements", label: "Settlements", icon: Wallet },
        { id: "refunds", label: "Refunds", icon: RefreshCw },
        { id: "invoices", label: "Invoices", icon: FileText },
      ],
    },
    {
      id: "customers",
      label: "Customers & Trust",
      icon: UserCircle,
      items: [
        { id: "customers", label: "Customers", icon: Users },
        { id: "returns", label: "Returns", icon: RefreshCw },
        { id: "disputes", label: "Disputes", icon: AlertTriangle },
        { id: "reviews", label: "Reviews & Abuse", icon: MessageSquare },
      ],
    },
    {
      id: "logistics",
      label: "Logistics & Supply Chain",
      icon: Truck,
      items: [
        { id: "warehouses", label: "Warehouses", icon: Layers },
        { id: "inventory", label: "Inventory", icon: Database },
        { id: "partners", label: "Partners", icon: Users },
      ],
    },
    {
      id: "marketing",
      label: "Marketing & Growth",
      icon: Megaphone,
      items: [
        { id: "ads", label: "Ads", icon: Megaphone },
        { id: "coupons", label: "Coupons", icon: Tag },
        { id: "campaigns", label: "Campaigns", icon: TrendingUp },
      ],
    },
    {
      id: "analytics",
      label: "Analytics & BI",
      icon: PieChart,
      items: [
        { id: "sales-analytics", label: "Sales Analytics", icon: BarChart },
        { id: "forecasting", label: "Forecasting", icon: TrendingUp },
        { id: "reports", label: "Reports", icon: FileText },
      ],
    },
    {
      id: "risk",
      label: "Risk & Compliance",
      icon: Shield,
      items: [
        { id: "fraud", label: "Fraud Detection", icon: AlertTriangle },
        { id: "compliance", label: "Compliance Rules", icon: ShieldCheck },
      ],
    },
    {
      id: "platform",
      label: "Platform Config",
      icon: Settings,
      items: [
        { id: "settings", label: "App Settings", icon: Settings },
        { id: "payment-gateways", label: "Payment Gateways", icon: CreditCard },
        { id: "tax-rules", label: "Tax Rules", icon: FileText },
      ],
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      items: [
        { id: "email", label: "Email", icon: Bell },
        { id: "sms", label: "SMS", icon: BellRing },
        { id: "push", label: "Push", icon: Bell },
      ],
    },
    {
      id: "devops",
      label: "DevOps & Infra",
      icon: Server,
      items: [
        { id: "logs", label: "Logs", icon: FileText },
        { id: "monitoring", label: "Monitoring", icon: Cpu },
        { id: "uptime", label: "Uptime", icon: Cloud },
      ],
    },
    {
      id: "legal",
      label: "Legal & Audit",
      icon: Scale,
      items: [
        { id: "audit", label: "Audit Logs", icon: FileText },
        { id: "governance", label: "Data Governance", icon: Gavel },
      ],
    },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        overflow-y-auto
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navSections.map((section) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections[section.id];

            return (
              <div key={section.id} className="mb-1">
                {section.items.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <SectionIcon size={18} />
                        <span className="font-medium text-sm">
                          {section.label}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="ml-8 border-l border-gray-200">
                        {section.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleItemClick(item.id)}
                              className={`
                                w-full flex items-center gap-2 px-4 py-2.5 text-sm
                                transition-all hover:bg-gray-50
                                ${
                                  activeTab === item.id
                                    ? "text-green-700 font-medium bg-green-50 border-l-2 border-green-500"
                                    : "text-gray-600"
                                }
                              `}
                            >
                              <ItemIcon size={16} />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleItemClick(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mx-2 mb-1 transition-all ${
                      activeTab === section.id
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <SectionIcon size={18} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">System Status</span>
              <Shield size={16} className="text-green-600" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Normal</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
