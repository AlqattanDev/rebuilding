import { useState } from 'react';
import { GripHorizontal, Settings, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function SectionsManagement() {
  const { currentPortfolio } = useAppStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!currentPortfolio) return null;

  const layoutOptions = ['grid', 'list', 'carousel', 'timeline'];
  const animationOptions = ['fade-in', 'slide-up', 'zoom-in', 'none'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sections</h1>
        <p className="text-gray-600 mt-1">Customize which sections appear on your portfolio and how they're displayed</p>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {currentPortfolio.sections.map((section, index) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors">
              {/* Drag Handle */}
              <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                <GripHorizontal size={20} />
              </button>

              {/* Section Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Visibility Toggle */}
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    section.visible
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  title={section.visible ? 'Hide section' : 'Show section'}
                >
                  {section.visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                {/* Expand Toggle */}
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === section.id ? null : section.id)
                  }
                  className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
                    expandedSection === section.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Section Config */}
            {expandedSection === section.id && (
              <div className="bg-gray-50 border-t border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Layout */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
                    <select
                      value={section.layout}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    >
                      {layoutOptions.map((layout) => (
                        <option key={layout} value={layout}>
                          {layout.charAt(0).toUpperCase() + layout.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Animation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Animation</label>
                    <select
                      value={section.animation || 'none'}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    >
                      {animationOptions.map((anim) => (
                        <option key={anim} value={anim}>
                          {anim.charAt(0).toUpperCase() + anim.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Padding Top */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Padding Top</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="128"
                        step="8"
                        value={section.paddingTop}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono text-gray-600 w-12">{section.paddingTop}px</span>
                    </div>
                  </div>

                  {/* Padding Bottom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Padding Bottom</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="128"
                        step="8"
                        value={section.paddingBottom}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono text-gray-600 w-12">{section.paddingBottom}px</span>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={section.backgroundColor || '#FFFFFF'}
                        className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={section.backgroundColor || '#FFFFFF'}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Show Animation Toggle */}
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={section.showAnimation}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700">Enable Animation</span>
                    </label>
                  </div>
                </div>

                {/* Section Preview */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
                  <div
                    className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center"
                    style={{
                      backgroundColor: section.backgroundColor || '#ffffff',
                      paddingTop: section.paddingTop,
                      paddingBottom: section.paddingBottom,
                    }}
                  >
                    <p className="text-gray-500">{section.title}</p>
                    <p className="text-sm text-gray-400 mt-2">{section.layout} layout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Drag sections to reorder them. Toggle visibility to show/hide sections. Customize the appearance and layout of each section.
        </p>
      </div>
    </div>
  );
}
