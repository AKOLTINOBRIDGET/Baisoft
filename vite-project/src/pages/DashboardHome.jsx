import { useAuth } from '../contexts/AuthContext';
import { COLORS } from "../componets/colors";
import { USER_ROLES } from '../constants/roles';

const DashboardHome = () => {
  const { user } = useAuth();

  const renderDashboardContent = () => {
    switch (user?.role) {
      case USER_ROLES.SUPER_ADMIN:
        return (
          <>
            <h3 className="text-xl font-semibold mb-3">Super Admin Overview! 👑</h3>
            <p className="text-gray-600">Manage the entire system, oversee businesses, and monitor global performance.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard title="Total Businesses" value="12" icon="🏢" trend="2 pending approval" />
              <StatCard title="System Users" value="156" icon="👥" trend="12 new this week" />
              <StatCard title="Total Products" value="1,247" icon="📦" trend="+8% from last month" />
              <StatCard title="Revenue" value="$45,230" icon="💰" trend="+15% from last month" />
              <StatCard title="Active Sessions" value="89" icon="🔄" trend="Peak at 120" />
              <StatCard title="System Health" value="98%" icon="❤️" trend="All systems operational" />
            </div>
          </>
        );

      case USER_ROLES.BUSINESS_ADMIN:
        return (
          <>
            <h3 className="text-xl font-semibold mb-3">Business Admin Dashboard! 🏢</h3>
            <p className="text-gray-600">Oversee your business operations, manage products, and monitor team performance.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard title="My Products" value="128" icon="📦" trend="+12% from last month" />
              <StatCard title="Team Members" value="15" icon="👥" trend="3 pending invites" />
              <StatCard title="Pending Approvals" value="7" icon="⏳" trend="2 urgent" />
              <StatCard title="Monthly Sales" value="$12,450" icon="💰" trend="+22% from last month" />
              <StatCard title="Customer Reviews" value="4.8" icon="⭐" trend="Based on 234 reviews" />
              <StatCard title="Active Campaigns" value="3" icon="📢" trend="1 ending soon" />
            </div>
          </>
        );

      case USER_ROLES.EDITOR:
      case USER_ROLES.APPROVER:
      case USER_ROLES.VIEWER:
      default:
        return (
          <>
            <h3 className="text-xl font-semibold mb-3">Welcome to your Overview! 👋</h3>
            <p className="text-gray-600">View approved products and monitor key metrics.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard title="Approved Products" value="89" icon="📦" trend="Updated daily" />
              <StatCard title="Categories" value="12" icon="📂" trend="All active" />
              <StatCard title="Recent Activity" value="23" icon="📈" trend="Last 24 hours" />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      {renderDashboardContent()}
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-widest">{title}</h3>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="flex items-baseline space-x-2">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <p className="text-xs mt-2 text-green-600 font-medium">{trend}</p>
  </div>
);

export default DashboardHome;
