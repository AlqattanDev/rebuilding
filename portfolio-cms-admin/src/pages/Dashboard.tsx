import { Eye, Zap, Mail, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Dashboard() {
  const { currentPortfolio } = useAppStore();

  if (!currentPortfolio) return null;

  const stats = [
    {
      label: 'Total Views',
      value: currentPortfolio.views.toLocaleString(),
      change: '+12.5%',
      icon: Eye,
      bgColor: 'bg-blue-500',
    },
    {
      label: 'Projects',
      value: currentPortfolio.content.projects.length,
      icon: Zap,
      bgColor: 'bg-purple-500',
    },
    {
      label: 'Messages',
      value: '47',
      change: '+5 New',
      icon: Mail,
      bgColor: 'bg-pink-500',
    },
    {
      label: 'Uptime',
      value: '98%',
      icon: CheckCircle,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
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
                <div
                  className={`${stat.bgColor} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
                >
                  <Icon size={24} />
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Add Project', icon: '➕', color: 'border-blue-200' },
                { title: 'Edit About', icon: '✏️', color: 'border-purple-200' },
                { title: 'Change Theme', icon: '🎨', color: 'border-pink-200' },
                { title: 'Upload Media', icon: '📁', color: 'border-green-200' },
              ].map((action, i) => (
                <button
                  key={i}
                  className={`border-2 ${action.color} rounded-lg p-6 text-center hover:bg-gray-50 transition-colors group`}
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{action.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">View all</button>
            </div>
            <div className="space-y-4">
              {currentPortfolio.content.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full ${
                      project.status === 'published'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Portfolio Status</h2>

          {/* Completion */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm font-bold text-primary">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Active Sections */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Sections</h3>
            <div className="space-y-2">
              {currentPortfolio.sections
                .filter((s) => s.visible)
                .map((section) => (
                  <div key={section.id} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm text-gray-700">{section.title}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Publish Status */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-900 mb-1">✓ Published</p>
            <p className="text-xs text-green-700">Your portfolio is live and visible to the public</p>
          </div>
        </div>
      </div>
    </div>
  );
}
