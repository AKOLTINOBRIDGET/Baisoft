import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./componets/protectedRoute";

import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import LoginPage from "./pages/loginPage";
import BusinessManagement from "./pages/BusinessManagement";
import ProductsPage from "./pages/ProductsPage";

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


