import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./componets/protectedRoute";

// Only import what actually exists
import DashboardLayout from "./pages/DashboardLayout"; // Check if this is in 'pages' or 'components'
import LoginPage from "./pages/loginPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes - All point to DashboardLayout for now */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            {/* Since your Layout has the content hardcoded inside it, 
              we don't need nested <Route> tags here yet.
            */}
          </Route>

          {/* Redirect any other dashboard paths to the main layout */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/products" element={<Navigate to="/" replace />} />
          <Route path="/users" element={<Navigate to="/" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}