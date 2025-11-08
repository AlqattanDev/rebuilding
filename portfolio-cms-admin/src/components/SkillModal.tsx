import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Skill } from '../types/index.js';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Skill>) => Promise<boolean>;
  skill?: Skill;
  isLoading?: boolean;
}

export default function SkillModal({
  isOpen,
  onClose,
  onSave,
  skill,
  isLoading = false,
}: SkillModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    proficiency: 50,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || 'intermediate',
        proficiency: skill.proficiency || 50,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        level: 'intermediate',
        proficiency: 50,
      });
    }
  }, [skill, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillData: Partial<Skill> = {
      name: formData.name,
      category: formData.category,
      level: formData.level,
      proficiency: formData.proficiency,
    };

    const success = await onSave(skillData);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {skill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="React, Python, etc."
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Frontend, Backend, Tools, etc."
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  level: e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert',
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              disabled={isLoading}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency: {formData.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.proficiency}
              onChange={(e) =>
                setFormData({ ...formData, proficiency: parseInt(e.target.value) })
              }
              className="w-full"
              disabled={isLoading}
            />
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${formData.proficiency}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
