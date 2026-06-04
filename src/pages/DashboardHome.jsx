import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { 
  Building2, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Crown, 
  Sparkles 
} from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  const renderContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return (
          <>
            <div className="mb-8 bg-gradient-to-r from-brand-dark to-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md">
              <div className="absolute top-[-30%] right-[-10%] w-60 h-60 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <Badge variant="brand" className="bg-brand-green/20 text-brand-green font-bold text-[10px] uppercase border border-brand-green/20 mb-3">System Administrator</Badge>
                <h3 className="text-2xl sm:text-3xl font-black font-display mb-2 flex items-center gap-2">
                  Super Admin Console <Crown className="w-6.5 h-6.5 text-amber-400 fill-amber-400 animate-pulse" />
                </h3>
                <p className="text-sm text-gray-300 max-w-xl">Global marketplace health, multi-tenant vendor approval workflows, and system audit logs are accessible below.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Businesses" value="12" icon={<Building2 className="w-5 h-5 text-brand-green" />} sparkline={[3, 5, 4, 8, 7, 9, 12]} trend="2 pending approval" trendUp />
              <StatCard title="System Users" value="156" icon={<Users className="w-5 h-5 text-blue-500" />} sparkline={[120, 130, 125, 140, 138, 145, 156]} trend="12 new this week" trendUp />
              <StatCard title="Total Products" value="1,247" icon={<Package className="w-5 h-5 text-amber-500" />} sparkline={[900, 950, 1020, 1100, 1150, 1200, 1247]} trend="+8% from last month" trendUp />
              <StatCard title="Total Revenue" value="$45,230" icon={<DollarSign className="w-5 h-5 text-emerald-500" />} sparkline={[20000, 25000, 32000, 28000, 39000, 41000, 45230]} trend="+15% from last month" trendUp />
            </div>

            {/* Quick Analytics meters */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card padding="md" className="lg:col-span-2 p-6">
                <h4 className="font-extrabold text-sm text-brand-text uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">Platform Health & Allocation</h4>
                <div className="space-y-4">
                  <ProgressBar label="Active Tenant Load" percentage={75} color="bg-brand-green" />
                  <ProgressBar label="Product Approvals Backlog" percentage={18} color="bg-amber-500" />
                  <ProgressBar label="System Resource Utilization" percentage={42} color="bg-blue-500" />
                </div>
              </Card>
              <Card padding="md" className="p-6 flex flex-col justify-between">
                <h4 className="font-extrabold text-sm text-brand-text uppercase tracking-wider mb-3 border-b border-gray-100 pb-3">Recent Actions Log</h4>
                <div className="text-xs space-y-3 font-semibold text-brand-muted">
                  <div className="flex justify-between"><span className="text-brand-text">✓ Approved "Artisan Ceramic Mug Set"</span><span>2m ago</span></div>
                  <div className="flex justify-between"><span className="text-brand-text">⚡ New vendor "GlowUp Beauty" joined</span><span>1h ago</span></div>
                  <div className="flex justify-between"><span className="text-brand-text">✓ Approved "Sony WH-1000XM5"</span><span>4h ago</span></div>
                </div>
              </Card>
            </div>
          </>
        );

      case 'business_admin':
        return (
          <>
            <div className="mb-8 bg-gradient-to-r from-brand-green/10 to-brand-teal/20 p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-brand-green/10 shadow-xs">
              <div className="relative z-10">
                <span className="bg-brand-green/20 text-brand-green font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-brand-green/20 mb-3 inline-block">Vendor Dashboard</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-brand-text mb-2 flex items-center gap-2">
                  Welcome back to {user.businessName}! <Building2 className="w-6.5 h-6.5 text-brand-green" />
                </h3>
                <p className="text-sm text-brand-muted max-w-xl">Configure inventory settings, add items to the storefront, and fulfill pending client purchases.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="My Products" value="128" icon={<Package className="w-5 h-5 text-brand-green" />} sparkline={[120, 122, 125, 124, 126, 127, 128]} trend="4 pending approval" />
              <StatCard title="Total Orders" value="45" icon={<ShoppingBag className="w-5 h-5 text-blue-500" />} sparkline={[10, 18, 25, 22, 34, 40, 45]} trend="12 new today" trendUp />
              <StatCard title="Monthly Revenue" value="$12,450" icon={<DollarSign className="w-5 h-5 text-emerald-500" />} sparkline={[5000, 6500, 8000, 7800, 9900, 11000, 12450]} trend="+22% from last month" trendUp />
            </div>

            {/* Business Progress Trackers */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card padding="md" className="lg:col-span-2 p-6">
                <h4 className="font-extrabold text-sm text-brand-text uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">Monthly Targets Completion</h4>
                <div className="space-y-4">
                  <ProgressBar label="Gross Merchandise Value Target" percentage={82} color="bg-brand-green" />
                  <ProgressBar label="Inventory Stock Turnover" percentage={65} color="bg-blue-500" />
                  <ProgressBar label="Order Fulfillment SLA" percentage={95} color="bg-emerald-500" />
                </div>
              </Card>
              <Card padding="md" className="p-6">
                <h4 className="font-extrabold text-sm text-brand-text uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">Business Rating Summary</h4>
                <div className="flex items-center gap-4 py-3">
                  <span className="text-5xl font-black text-brand-text">4.8</span>
                  <div className="text-xs font-bold text-brand-text">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <p className="text-brand-muted mt-1">Based on 124 customer reviews across 3 active channels</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        );

      case 'buyer':
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-black font-display text-brand-text mb-2 flex items-center gap-2">
                Welcome Back, {user.name.split(' ')[0]} <Sparkles className="w-6 h-6 text-brand-green animate-pulse" />
              </h3>
              <p className="text-brand-muted text-sm">Track your recent orders, review saved products, and adjust credentials.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total Orders Placed" value="5" icon={<ShoppingBag className="w-5 h-5 text-brand-green" />} sparkline={[1, 2, 2, 3, 4, 5, 5]} trend="View history" />
              <StatCard title="Saved Favorites" value="12" icon={<Heart className="w-5 h-5 text-red-500 fill-red-500" />} sparkline={[5, 8, 7, 9, 11, 10, 12]} trend="2 items currently on sale" />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-black font-display text-brand-text mb-2 flex items-center gap-2">
                Welcome back to your Overview <Sparkles className="w-6 h-6 text-brand-green" />
              </h3>
              <p className="text-brand-muted text-sm">Monitor approval lists, track active items, and examine recent updates.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Approved Products" value="89" icon={<Package className="w-5 h-5 text-brand-green" />} sparkline={[80, 82, 85, 84, 87, 88, 89]} trend="Updated daily" />
              <StatCard title="Recent Activity" value="23" icon={<TrendingUp className="w-5 h-5 text-blue-500" />} sparkline={[10, 15, 14, 18, 20, 22, 23]} trend="Actions last 24 hours" />
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

// Sparkline graph drawing helper
const Sparkline = ({ points = [], trendUp = false }) => {
  if (points.length === 0) return null;
  const width = 120;
  const height = 40;
  const padding = 2;
  
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min === 0 ? 1 : max - min;
  
  const coords = points.map((p, idx) => {
    const x = padding + (idx / (points.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (p - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = trendUp ? '#00C853' : '#757575';

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={coords}
      />
    </svg>
  );
};

const StatCard = ({ title, value, icon, trend, trendUp, sparkline = [] }) => (
  <Card hoverable padding="md" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-extrabold text-[10px] text-brand-muted uppercase tracking-widest">{title}</h3>
      <div className="p-2 bg-surface-secondary rounded-lg">
        {icon}
      </div>
    </div>
    
    <div className="flex items-end justify-between">
      <div>
        <p className="text-3xl font-black font-display text-brand-text leading-tight">{value}</p>
        <p className={`text-[10px] mt-2.5 font-bold uppercase tracking-wider ${trendUp ? 'text-brand-green' : 'text-brand-muted'}`}>
          {trend}
        </p>
      </div>
      {sparkline.length > 0 && (
        <div className="shrink-0 mb-1">
          <Sparkline points={sparkline} trendUp={trendUp} />
        </div>
      )}
    </div>
  </Card>
);

const ProgressBar = ({ label, percentage, color = 'bg-brand-green' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-bold text-brand-text">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50/50">
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

const Badge = ({ children, variant, className = '' }) => {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider';
  const variants = {
    brand: 'bg-brand-green/20 text-brand-green',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
