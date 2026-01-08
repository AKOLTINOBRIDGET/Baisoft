import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./componets/protectedRoute";

import DashboardLayout from "./pages/DashboardLayout";
import LoginPage from "./pages/loginPage";
import BusinessManagement from "./pages/BusinessManagement";
import ProductsPage from "./pages/ProductsPage"; // You can create this next

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Layout Wrapper */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Index route: redirects "/" to "/dashboard" */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* The Dashboard Home/Stats page */}
            <Route path="dashboard" element={<DashboardHome />} />
            
            {/* Sub-pages that render inside the layout */}
            <Route path="businesses" element={<BusinessManagement />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="users" element={<div>Users Page Coming Soon</div>} />
            <Route path="settings" element={<div>Settings Page Coming Soon</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Simple internal component for the "Dashboard" home view
const DashboardHome = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
    <h3 className="text-xl font-semibold mb-3">Welcome to your Overview! 👋</h3>
    <p className="text-gray-600">Select a category from the sidebar to manage your data.</p>
  </div>
);