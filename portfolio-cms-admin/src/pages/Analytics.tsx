import { TrendingUp, Users, Clock, Globe } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Analytics() {
  const { currentPortfolio } = useAppStore();

  if (!currentPortfolio) return null;

  const stats = [
    {
      label: 'Total Views',
      value: currentPortfolio.views.toLocaleString(),
      change: '+12.5%',
      icon: Globe,
      trend: 'up',
    },
    {
      label: 'Average Session',
      value: '3m 24s',
      change: '+2m',
      icon: Clock,
      trend: 'up',
    },
    {
      label: 'Unique Visitors',
      value: '1,847',
      change: '+18.2%',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Growth Rate',
      value: '24%',
      change: '+4%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Monitor your portfolio's performance and engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Over Time */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Traffic Over Time</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 60, 40, 75, 65, 90, 80, 85, 70, 95, 88, 92].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t-lg transition-colors hover:bg-primary/80"
                style={{ height: `${(height / 100) * 100}%` }}
                title={`Week ${i + 1}: ${height}%`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Last 12 weeks</p>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Pages</h2>
          <div className="space-y-4">
            {[
              { page: 'Home', views: '842', percentage: 42 },
              { page: 'Projects', views: '564', percentage: 28 },
              { page: 'About', views: '438', percentage: 22 },
              { page: 'Contact', views: '156', percentage: 8 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.page}</span>
                  <span className="text-sm text-gray-600">{item.views} views</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', value: '45%', color: 'bg-blue-500' },
              { source: 'Google', value: '28%', color: 'bg-purple-500' },
              { source: 'LinkedIn', value: '15%', color: 'bg-pink-500' },
              { source: 'Other', value: '12%', color: 'bg-gray-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-700 flex-1">{item.source}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h2>
          <div className="space-y-4">
            {[
              { device: 'Desktop', value: '62%', users: 1234 },
              { device: 'Mobile', value: '28%', users: 548 },
              { device: 'Tablet', value: '10%', users: 195 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.device}</span>
                  <span className="text-sm text-gray-600">{item.users.toLocaleString()} users</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width:
                        item.device === 'Desktop'
                          ? '62%'
                          : item.device === 'Mobile'
                          ? '28%'
                          : '10%',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Project "E-commerce Platform" viewed 156 times', time: '2 hours ago' },
            { action: 'New message from design recruiter', time: '5 hours ago' },
            { action: 'Portfolio reached 2,500 total views', time: '1 day ago' },
            { action: 'Skills section updated', time: '2 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
              <p className="text-sm text-gray-700">{item.action}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
