import { useState } from 'react';
import { Plus, Edit2, Trash2, Badge } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useProjects, useSkills, useExperience } from '../hooks/useContent';
import ProjectModal from '../components/ProjectModal';
import SkillModal from '../components/SkillModal';
import ExperienceModal from '../components/ExperienceModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Project, Skill, Experience } from '../types/index';

export default function ContentManagement() {
  const { currentPortfolio } = useAppStore();
  const [activeTab, setActiveTab] = useState('projects');

  // Hooks for CRUD operations
  const { addProject, updateProject, deleteProject, isLoading: projectsLoading } = useProjects();
  const { addSkill, updateSkill, deleteSkill, isLoading: skillsLoading } = useSkills();
  const { addExperience, updateExperience, deleteExperience, isLoading: experienceLoading } = useExperience();

  // Modal states
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; project?: Project }>({
    isOpen: false,
  });
  const [skillModal, setSkillModal] = useState<{ isOpen: boolean; skill?: Skill }>({
    isOpen: false,
  });
  const [experienceModal, setExperienceModal] = useState<{
    isOpen: boolean;
    experience?: Experience;
  }>({
    isOpen: false,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: 'project' | 'skill' | 'experience';
    id?: string;
    name?: string;
  }>({
    isOpen: false,
    type: 'project',
  });

  if (!currentPortfolio) return null;

  const tabs = [
    { id: 'projects', label: 'Projects', count: currentPortfolio.projects?.length || 0 },
    { id: 'about', label: 'About', count: 1 },
    { id: 'experience', label: 'Experience', count: currentPortfolio.experiences?.length || 0 },
    { id: 'skills', label: 'Skills', count: currentPortfolio.skills?.length || 0 },
    { id: 'contact', label: 'Contact', count: 1 },
  ];

  // Handlers
  const handleAddNew = () => {
    switch (activeTab) {
      case 'projects':
        setProjectModal({ isOpen: true });
        break;
      case 'skills':
        setSkillModal({ isOpen: true });
        break;
      case 'experience':
        setExperienceModal({ isOpen: true });
        break;
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectModal({ isOpen: true, project });
  };

  const handleEditSkill = (skill: Skill) => {
    setSkillModal({ isOpen: true, skill });
  };

  const handleEditExperience = (experience: Experience) => {
    setExperienceModal({ isOpen: true, experience });
  };

  const handleDeleteClick = (type: 'project' | 'skill' | 'experience', id: string, name: string) => {
    setDeleteDialog({ isOpen: true, type, id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;

    let success = false;
    switch (deleteDialog.type) {
      case 'project':
        success = await deleteProject(deleteDialog.id);
        break;
      case 'skill':
        success = await deleteSkill(deleteDialog.id);
        break;
      case 'experience':
        success = await deleteExperience(deleteDialog.id);
        break;
    }

    if (success) {
      setDeleteDialog({ isOpen: false, type: 'project' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-4">
            {currentPortfolio.projects && currentPortfolio.projects.length > 0 ? (
              currentPortfolio.projects.map((project) => (
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
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {project.tags &&
                            project.tags.map((tag, idx) => (
                              <span
                                key={idx}
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
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick('project', project.id, project.title)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No projects yet. Click "Add New" to create your first project.
              </div>
            )}
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
                  value={currentPortfolio.name || ''}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={currentPortfolio.title || ''}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={currentPortfolio.bio || ''}
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
            {currentPortfolio.experiences && currentPortfolio.experiences.length > 0 ? (
              currentPortfolio.experiences.map((exp) => (
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
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick('experience', exp.id, exp.position)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No experience yet. Click "Add New" to add your first work experience.
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPortfolio.skills && currentPortfolio.skills.length > 0 ? (
              currentPortfolio.skills.map((skill) => (
                <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{skill.category}</p>
                  {skill.proficiency !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick('skill', skill.id, skill.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No skills yet. Click "Add New" to add your first skill.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canAddNew = ['projects', 'skills', 'experience'].includes(activeTab);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio content and information</p>
        </div>
        {canAddNew && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus size={20} />
            Add New
          </button>
        )}
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
            <span
              className={`ml-2 text-xs font-semibold ${
                activeTab === tab.id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modals */}
      <ProjectModal
        isOpen={projectModal.isOpen}
        onClose={() => setProjectModal({ isOpen: false })}
        onSave={projectModal.project ? (data) => updateProject(projectModal.project!.id, data) : addProject}
        project={projectModal.project}
        isLoading={projectsLoading}
      />

      <SkillModal
        isOpen={skillModal.isOpen}
        onClose={() => setSkillModal({ isOpen: false })}
        onSave={skillModal.skill ? (data) => updateSkill(skillModal.skill!.id, data) : addSkill}
        skill={skillModal.skill}
        isLoading={skillsLoading}
      />

      <ExperienceModal
        isOpen={experienceModal.isOpen}
        onClose={() => setExperienceModal({ isOpen: false })}
        onSave={
          experienceModal.experience
            ? (data) => updateExperience(experienceModal.experience!.id, data)
            : addExperience
        }
        experience={experienceModal.experience}
        isLoading={experienceLoading}
      />

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, type: 'project' })}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteDialog.type}`}
        message={`Are you sure you want to delete "${deleteDialog.name}"? This action cannot be undone.`}
        isLoading={projectsLoading || skillsLoading || experienceLoading}
      />
    </div>
  );
}
