import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';

export default function DashboardHome() {
  const { user } = useAuth();

  const renderContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display text-brand-text mb-2">Super Admin Overview 👑</h3>
              <p className="text-brand-muted">Manage the entire system, oversee businesses, and monitor global performance.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total Businesses" value="12" icon="🏢" trend="2 pending approval" trendUp />
              <StatCard title="System Users" value="156" icon="👥" trend="12 new this week" trendUp />
              <StatCard title="Total Products" value="1,247" icon="📦" trend="+8% from last month" trendUp />
              <StatCard title="Total Revenue" value="$45,230" icon="💰" trend="+15% from last month" trendUp />
            </div>
          </>
        );

      case 'business_admin':
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display text-brand-text mb-2">Business Dashboard 🏢</h3>
              <p className="text-brand-muted">Welcome back! Here's what's happening with {user.businessName}.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="My Products" value="128" icon="📦" trend="4 pending approval" />
              <StatCard title="Total Orders" value="45" icon="🛍️" trend="12 new today" trendUp />
              <StatCard title="Monthly Revenue" value="$12,450" icon="💰" trend="+22% from last month" trendUp />
            </div>
          </>
        );

      case 'buyer':
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display text-brand-text mb-2">Welcome Back, {user.name.split(' ')[0]} 👋</h3>
              <p className="text-brand-muted">Track your recent orders and manage your account.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total Orders" value="5" icon="🛍️" trend="View history" />
              <StatCard title="Saved Items" value="12" icon="❤️" trend="2 on sale" />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display text-brand-text mb-2">Welcome to your Overview 👋</h3>
              <p className="text-brand-muted">View approved products and monitor key metrics.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Approved Products" value="89" icon="📦" trend="Updated daily" />
              <StatCard title="Recent Activity" value="23" icon="📈" trend="Last 24 hours" />
            </div>
          </>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      {renderContent()}
    </div>
  );
}

const StatCard = ({ title, value, icon, trend, trendUp }) => (
  <Card hoverable padding="md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-xs text-brand-muted uppercase tracking-wider">{title}</h3>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-bold font-display text-brand-text">{value}</p>
    </div>
    <p className={`text-xs mt-2 font-semibold ${trendUp ? 'text-brand-green' : 'text-brand-muted'}`}>
      {trend}
    </p>
  </Card>
);
