import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Palette, Monitor, Smartphone } from 'lucide-react';

export default function AppearanceCustomization() {
  const { currentPortfolio } = useAppStore();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!currentPortfolio) return null;

  const themePresets = [
    { name: 'Modern', id: 'modern', colors: ['#6B7BEE', '#EC4899', '#06B6D4'] },
    { name: 'Professional', id: 'professional', colors: ['#1F2937', '#6B7280', '#0066CC'] },
    { name: 'Creative', id: 'creative', colors: ['#F59E0B', '#EC4899', '#8B5CF6'] },
    { name: 'Minimal', id: 'minimal', colors: ['#000000', '#FFFFFF', '#6B7280'] },
    { name: 'Terminal', id: 'terminal', colors: ['#0a0a0a', '#00ff41', '#333333'] },
  ];

  const colors = currentPortfolio.appearance.theme.colors;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appearance</h1>
        <p className="text-gray-600 mt-1">Customize your portfolio's look and feel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-8">
          {/* Theme Presets */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Theme Presets</h2>
            <div className="grid grid-cols-2 gap-4">
              {themePresets.map((preset) => (
                <button
                  key={preset.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentPortfolio.appearance.theme.id === preset.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {preset.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Colors */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h2>
            <div className="space-y-3">
              {[
                { label: 'Primary', key: 'primary' },
                { label: 'Secondary', key: 'secondary' },
                { label: 'Accent', key: 'accent' },
                { label: 'Background', key: 'background' },
                { label: 'Text', key: 'text' },
              ].map((color) => (
                <div key={color.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-2">{color.label}</label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                      style={{ backgroundColor: colors[color.key as keyof typeof colors] }}
                    ></div>
                    <input
                      type="text"
                      value={colors[color.key as keyof typeof colors]}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary"
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Typography</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Body Font</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                  <option>{currentPortfolio.appearance.typography.fontFamily}</option>
                  <option>Georgia</option>
                  <option>Roboto</option>
                  <option>Merriweather</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Heading Font</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                  <option>{currentPortfolio.appearance.typography.headingFont}</option>
                  <option>Georgia</option>
                  <option>Playfair Display</option>
                  <option>Montserrat</option>
                </select>
              </div>
            </div>
          </div>

          {/* Spacing & Effects */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Effects</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Border Radius</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={currentPortfolio.appearance.borderRadius}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-600">{currentPortfolio.appearance.borderRadius}px</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="darkMode" defaultChecked={currentPortfolio.appearance.darkMode} />
                <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
                  Enable Dark Mode
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Preview Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-lg transition-colors ${
                    previewMode === 'desktop'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Monitor size={20} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-lg transition-colors ${
                    previewMode === 'mobile'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Smartphone size={20} />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden ${previewMode === 'mobile' ? 'aspect-[9/16] max-w-xs mx-auto' : 'aspect-video'}`}>
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                style={{ backgroundColor: colors.background }}
              >
                {/* Hero Section Preview */}
                <div className="text-center px-6">
                  <h1
                    className="text-4xl font-bold mb-4"
                    style={{ color: colors.text }}
                  >
                    {currentPortfolio.content.name}
                  </h1>
                  <p
                    className="text-lg mb-6"
                    style={{ color: colors.textMuted }}
                  >
                    {currentPortfolio.content.title}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: colors.primary }}
                    >
                      View Projects
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{
                        backgroundColor: 'transparent',
                        color: colors.primary,
                        border: `2px solid ${colors.primary}`,
                      }}
                    >
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Changes you make here are live in the preview. Click "Publish" to make them live on your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
