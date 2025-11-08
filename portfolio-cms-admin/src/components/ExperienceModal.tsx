import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Experience } from '../types/index.js';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Experience>) => Promise<boolean>;
  experience?: Experience;
  isLoading?: boolean;
}

export default function ExperienceModal({
  isOpen,
  onClose,
  onSave,
  experience,
  isLoading = false,
}: ExperienceModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || '',
        position: experience.position || '',
        startDate: experience.startDate || '',
        endDate: experience.endDate || '',
        description: experience.description || '',
        current: experience.current || false,
      });
    } else {
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      });
    }
  }, [experience, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const experienceData: Partial<Experience> = {
      company: formData.company,
      position: formData.position,
      startDate: formData.startDate,
      endDate: formData.current ? undefined : formData.endDate || undefined,
      description: formData.description,
      current: formData.current,
    };

    const success = await onSave(experienceData);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {experience ? 'Edit Experience' : 'Add New Experience'}
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
              Company Name *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Acme Corporation"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position/Role *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Senior Software Engineer"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date {formData.current && '(Current Position)'}
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100"
                disabled={formData.current || isLoading}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) =>
                setFormData({ ...formData, current: e.target.checked, endDate: '' })
              }
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              disabled={isLoading}
            />
            <label htmlFor="current" className="text-sm text-gray-700">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Describe your role and achievements..."
              rows={4}
              required
              disabled={isLoading}
            />
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
              {isLoading ? 'Saving...' : experience ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
