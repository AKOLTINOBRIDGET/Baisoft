import React from 'react';
import { useAuth, AuthProvider } from './useAuth';

// Demo Component to show how it works
export default function AuthDemo() {
  return (
    <AuthProvider>
      <DemoContent />
    </AuthProvider>
  );
}

function DemoContent() {
  const { user, login, logout, hasPermission, isAuthenticated } = useAuth();

  const handleLogin = (role) => {
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      role: role,
      businessId: role !== 'super_admin' ? 'business-1' : null
    };
    login(mockToken, mockUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6" style={{ color: '#424242' }}>
            Authentication Context Demo
          </h1>

          {!isAuthenticated ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Login as:</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLogin('super_admin')}
                  className="px-4 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#00C853', color: 'white' }}
                >
                  Super Admin
                </button>
                <button
                  onClick={() => handleLogin('business_admin')}
                  className="px-4 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#00C853', color: 'white' }}
                >
                  Business Admin
                </button>
                <button
                  onClick={() => handleLogin('editor')}
                  className="px-4 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#00C853', color: 'white' }}
                >
                  Editor
                </button>
                <button
                  onClick={() => handleLogin('approver')}
                  className="px-4 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#00C853', color: 'white' }}
                >
                  Approver
                </button>
                <button
                  onClick={() => handleLogin('viewer')}
                  className="px-4 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#00C853', color: 'white' }}
                >
                  Viewer
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#E0F7FA' }}>
                <h3 className="font-semibold mb-2">Current User:</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                {user.businessId && <p><strong>Business ID:</strong> {user.businessId}</p>}
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#E8EAF6' }}>
                <h3 className="font-semibold mb-3">Permissions Check:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <PermissionBadge 
                    label="Manage Businesses" 
                    hasPermission={hasPermission('manage_businesses')} 
                  />
                  <PermissionBadge 
                    label="Create Products" 
                    hasPermission={hasPermission('create_products')} 
                  />
                  <PermissionBadge 
                    label="Approve Products" 
                    hasPermission={hasPermission('approve_products')} 
                  />
                  <PermissionBadge 
                    label="Create Users" 
                    hasPermission={hasPermission('create_users')} 
                  />
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PermissionBadge({ label, hasPermission }) {
  return (
    <div className={`px-3 py-1 rounded ${hasPermission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {hasPermission ? '✓' : '✗'} {label}
    </div>
  );
}