import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import LoginPage from "./pages/LoginPage";
import BusinessManagement from "./pages/BusinessManagement";
import ProductsPage from "./pages/ProductsPage";
import StorefrontPage from "./pages/StorefrontPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import { CartDrawer } from "./components/features/CartDrawer";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Global UI Components */}
          <CartDrawer />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<StorefrontPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Buyer Protected Routes */}
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/success" 
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              } 
            />

            {/* Dashboard Protected Layout */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="businesses" element={<BusinessManagement />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<div className="p-8"><h2 className="text-2xl font-bold">Users Page Coming Soon</h2></div>} />
              <Route path="settings" element={<div className="p-8"><h2 className="text-2xl font-bold">Settings Page Coming Soon</h2></div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
