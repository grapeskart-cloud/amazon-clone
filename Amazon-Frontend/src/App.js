import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./AdminDashboard/Layout";
import Dashboard from "./AdminDashboard/Dashboard";
import UserManagement from "./AdminDashboard/UserManagement";
import ContentManagement from "./AdminDashboard/ContentManagement";
import ProductManagement from "./AdminDashboard/ProductManagement";
import OrderManagement from "./AdminDashboard/OrderManagement";
import ReportsAnalytics from "./AdminDashboard/ReportsAnalytics";
import SystemSettings from "./AdminDashboard/SystemSettings";
import Adminlogin from "./Adminauth/Adminlogin";
import AdminRegister from "./Adminauth/AdminRegister";
import AdminSendotp from "./Adminauth/AdminSendotp";
import AdminForgotpassword from "./Adminauth/AdminForgotpassword";
import AdminResetpassword from "./Adminauth/AdminResetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adminlogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/send-otp" element={<AdminSendotp />} />
        <Route path="/forgot-password" element={<AdminForgotpassword />} />
        <Route path="/reset-password" element={<AdminResetpassword />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
