import { useState } from 'react';
import { Plus, Edit2, Trash2, Badge } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function ContentManagement() {
  const { currentPortfolio } = useAppStore();
  const [activeTab, setActiveTab] = useState('projects');

  if (!currentPortfolio) return null;

  const tabs = [
    { id: 'projects', label: 'Projects', count: currentPortfolio.content.projects.length },
    { id: 'about', label: 'About', count: 1 },
    { id: 'experience', label: 'Experience', count: currentPortfolio.content.experience.length },
    { id: 'skills', label: 'Skills', count: currentPortfolio.content.skills.length },
    { id: 'contact', label: 'Contact', count: 1 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-4">
            {currentPortfolio.content.projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        <Badge
                          size={16}
                          className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'about':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={currentPortfolio.content.name}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={currentPortfolio.content.title}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={currentPortfolio.content.bio}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  rows={4}
                  readOnly
                />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
              <Edit2 size={18} className="inline mr-2" />
              Edit About
            </button>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {currentPortfolio.content.experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  {exp.current && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{exp.description}</p>
                <p className="text-xs text-gray-500">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPortfolio.content.skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {skill.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{skill.category}</p>
                {skill.proficiency && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio content and information</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs font-semibold ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
