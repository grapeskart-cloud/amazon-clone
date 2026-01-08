import React, { useState, lazy, Suspense } from "react";
import {
  BarChart3,
  Users,
  FileText,
  Package,
  ShoppingCart,
  PieChart,
  Settings,
  Menu,
  X,
  Globe,
  Bell,
  Search,
  User,
  LogOut,
  Store,
  CreditCard,
  Truck,
  MessageSquare,
  Database,
  AlertTriangle,
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
  Shield,
} from "lucide-react";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import SystemSettings from "./SystemSettings";

const RolesPermissions = lazy(() =>
  import("./Identityandaccess/RolesPermissions")
);
const AdminUsers = lazy(() => import("./Identityandaccess/AdminUsers"));
const Customers = lazy(() => import("./CustomersandTrust/Customers"));
const TeamManagement = lazy(() => import("./Identityandaccess/TeamManagement"));
const SellerList = lazy(() => import("./VendorandSeller/SellerList"));
const KYCVerification = lazy(() => import("./VendorandSeller/KYCVerification"));
const SellerPerformance = lazy(() =>
  import("./VendorandSeller/SellerPerformance")
);

const Categories = lazy(() => import("./CatalogandControl/Categories"));
const PricingRules = lazy(() => import("./CatalogandControl/PricingRules"));
const CommissionEngine = lazy(() =>
  import("./CatalogandControl/CommissionEngine")
);
const Shipments = lazy(() => import("./OrdersandFulfillment/Shipments"));
const DeliveryStatus = lazy(() =>
  import("./OrdersandFulfillment/DeliveryStatus")
);
const Transactions = lazy(() => import("./PaymentsandFinance/Transactions"));
const Settlements = lazy(() => import("./PaymentsandFinance/Settlements"));
const Refunds = lazy(() => import("./PaymentsandFinance/Refunds"));
const Invoices = lazy(() => import("./PaymentsandFinance/Invoices"));
const FraudDetection = lazy(() =>
  import("./RiskandCompliance /FraudDetection")
);
const AppSettings = lazy(() => import("./PlatformandConfig/AppSettings"));
const PaymentGateways = lazy(() =>
  import("./PlatformandConfig/PaymentGateways")
);
const TaxRules = lazy(() => import("./PlatformandConfig/TaxRules"));
const EmailNotifications = lazy(() =>
  import("./Notifications/EmailNotifications")
);
const SMSNotifications = lazy(() => import("./Notifications/SMSNotifications"));
const PushNotifications = lazy(() =>
  import("./Notifications/PushNotifications")
);
const Logs = lazy(() => import("./DevOpsandInfra/Logs"));
const Monitoring = lazy(() => import("./DevOpsandInfra/Monitoring"));
const Uptime = lazy(() => import("./DevOpsandInfra/Uptime"));
const Returns = lazy(() => import("./CustomersandTrust/Returns"));
const Disputes = lazy(() => import("./CustomersandTrust/Disputes"));
const ReviewsAbuse = lazy(() => import("./CustomersandTrust/ReviewsAbuse"));
const Warehouses = lazy(() => import("./LogisticsandSupplyChain/Warehouses"));
const Inventory = lazy(() => import("./LogisticsandSupplyChain/Inventory"));
const Partners = lazy(() => import("./LogisticsandSupplyChain/Partners"));
const Ads = lazy(() => import("./MarketingandGrowth/Ads"));
const Coupons = lazy(() => import("./MarketingandGrowth/Coupons"));
const Campaigns = lazy(() => import("./MarketingandGrowth/Campaigns"));
const SalesAnalytics = lazy(() => import("./AnalyticsandBI/SalesAnalytics"));
const Forecasting = lazy(() => import("./AnalyticsandBI/Forecasting"));
const Reports = lazy(() => import("./AnalyticsandBI/Reports"));
const ComplianceRules = lazy(() =>
  import("./RiskandCompliance /ComplianceRules")
);
const AuditLogs = lazy(() => import("./LegalandAudit /AuditLogs"));
const DataGovernance = lazy(() => import("./LegalandAudit /DataGovernance"));
const Chat = lazy(() => import("./Chatsupport/Chat"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    identity: false,
    vendors: false,
    catalog: false,
    orders: false,
    payments: false,
    customers: false,
    logistics: false,
    marketing: false,
    analytics: false,
    risk: false,
    platform: false,
    notifications: false,
    devops: false,
    legal: false,
  });
  const [language, setLanguage] = useState("english");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    alert("Logout successful!");
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
  };

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
        { id: "users", label: "User Management", icon: Users },
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
        { id: "content", label: "Content Management", icon: FileText },
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
        { id: "app-settings", label: "App Settings", icon: Settings },
        { id: "payment-gateways", label: "Payment Gateways", icon: CreditCard },
        { id: "tax-rules", label: "Tax Rules", icon: FileText },
        { id: "settings", label: "System Settings", icon: Settings },
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
    {
      id: "chat-support",
      label: "Chat Support",
      icon: MessageSquare,
      items: [
        {
          id: "chat-support",
          label: "Chat Support",
          icon: MessageSquare,
        },
      ],
    },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManagement />;
      case "content":
        return <ContentManagement />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "reports":
        return <ReportsAnalytics />;
      case "settings":
        return <SystemSettings />;

      case "roles":
        return <RolesPermissions />;
      case "admin-users":
        return <AdminUsers />;
      case "team":
        return <TeamManagement />;
      case "seller-list":
        return <SellerList />;
      case "kyc":
        return <KYCVerification />;
      case "seller-performance":
        return <SellerPerformance />;
      case "categories":
        return <Categories />;
      case "pricing":
        return <PricingRules />;
      case "commission":
        return <CommissionEngine />;
      case "shipments":
        return <Shipments />;
      case "delivery":
        return <DeliveryStatus />;
      case "transactions":
        return <Transactions />;
      case "settlements":
        return <Settlements />;
      case "refunds":
        return <Refunds />;
      case "invoices":
        return <Invoices />;
      case "customers":
        return <Customers />;
      case "returns":
        return <Returns />;
      case "disputes":
        return <Disputes />;
      case "reviews":
        return <ReviewsAbuse />;
      case "warehouses":
        return <Warehouses />;
      case "inventory":
        return <Inventory />;
      case "partners":
        return <Partners />;
      case "ads":
        return <Ads />;
      case "coupons":
        return <Coupons />;
      case "campaigns":
        return <Campaigns />;
      case "sales-analytics":
        return <SalesAnalytics />;
      case "forecasting":
        return <Forecasting />;
      case "fraud":
        return <FraudDetection />;
      case "compliance":
        return <ComplianceRules />;
      case "app-settings":
        return <AppSettings />;
      case "payment-gateways":
        return <PaymentGateways />;
      case "tax-rules":
        return <TaxRules />;
      case "email":
        return <EmailNotifications />;
      case "sms":
        return <SMSNotifications />;
      case "push":
        return <PushNotifications />;
      case "logs":
        return <Logs />;
      case "monitoring":
        return <Monitoring />;
      case "uptime":
        return <Uptime />;
      case "audit":
        return <AuditLogs />;
      case "governance":
        return <DataGovernance />;
      case "chat-support":
        return <Chat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-600 rounded-lg">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold text-gray-800">
                  Aman Dashboard
                </h1>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <Globe size={20} />
                <span className="font-medium">
                  {language === "english" ? "HI" : "EN"}
                </span>
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="font-semibold">Aman.User</span>
                  <span className="text-sm text-gray-500">Super Admin</span>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="text-green-600" size={20} />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            fixed lg:static
            inset-y-0 left-0 z-40
            w-64 lg:w-64
            bg-white border-r border-gray-200
            transition-transform duration-300 ease-in-out
            lg:block
            overflow-y-auto
          `}
        >
          <div className="h-full flex flex-col">
            <div className="lg:hidden flex justify-end p-4 border-b">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
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
            </nav>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main
          className={`
    flex-1 p-4 md:p-6 lg:p-8
    h-[110vh]
    overflow-y-auto
    transition-all duration-300
    ${sidebarOpen ? "ml-64" : "ml-0"}
    lg:ml-0
  `}
        >
          <Suspense fallback={<LoadingSpinner />}>{renderContent()}</Suspense>
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Server Time</p>
              <p className="font-semibold">14:30:45 IST</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="font-semibold">24</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Last Backup</p>
              <p className="font-semibold">6 hours ago</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="font-semibold">99.8%</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
