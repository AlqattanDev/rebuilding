import { Menu, Eye, Upload, Bell } from 'lucide-react';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6 gap-4">
        {/* Left - Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard Overview</h1>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Preview Button */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
            <Eye size={18} />
            <span className="text-sm font-medium">Preview</span>
          </button>

          {/* Publish Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Upload size={18} />
            <span className="text-sm">Publish</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-600 transition-colors">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
