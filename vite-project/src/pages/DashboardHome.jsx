import { useAuth } from '../contexts/AuthContext';
import { COLORS } from "../componets/colors";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-3">Welcome to your Overview! 👋</h3>
      <p className="text-gray-600">Select a category from the sidebar to manage your data.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Total Products" value="128" icon="📦" trend="+12% from last month" />
        <StatCard title="Active Users" value="42" icon="👥" trend="5 currently online" />
        {user?.role === 'super_admin' && (
          <StatCard title="Businesses" value="12" icon="🏢" trend="2 pending approval" />
        )}
      </div>
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
