import { useState, useEffect } from 'react';
import { useAppStore } from './store/appStore';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import AppearanceCustomization from './pages/AppearanceCustomization';
import SectionsManagement from './pages/SectionsManagement';
import Analytics from './pages/Analytics';
import NotificationCenter from './components/NotificationCenter';
import { PortfolioConfig, ThemePreset } from './types';

export default function App() {
  const { currentPage, setCurrentPortfolio } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock portfolio data - replace with API call
  useEffect(() => {
    const mockPortfolio: PortfolioConfig = {
      id: '1',
      name: 'My Portfolio',
      slug: 'my-portfolio',
      template: 'professional',
      published: true,
      views: 2847,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: {
        name: 'John Doe',
        title: 'Full Stack Developer & UI Designer',
        bio: 'I\'m a passionate developer with 5+ years of experience building web applications.',
        email: 'john@example.com',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        socials: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
        projects: [
          {
            id: '1',
            title: 'E-commerce Platform',
            description: 'A modern e-commerce solution built with React and Node.js',
            image: '',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: '',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Design System',
            description: 'UI Component Library for scalability and consistency across products.',
            image: '',
            tags: ['Figma', 'React', 'Storybook', 'TypeScript'],
            link: '',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        skills: [
          { id: '1', name: 'React', category: 'Frontend', level: 'expert', proficiency: 95 },
          { id: '2', name: 'TypeScript', category: 'Frontend', level: 'advanced', proficiency: 90 },
          { id: '3', name: 'Node.js', category: 'Backend', level: 'advanced', proficiency: 85 },
          { id: '4', name: 'UI Design', category: 'Design', level: 'advanced', proficiency: 85 },
        ],
        experience: [
          {
            id: '1',
            company: 'Tech Corp',
            position: 'Senior Developer',
            startDate: '2021-01-01',
            description: 'Led development of multiple projects',
            current: true,
          },
          {
            id: '2',
            company: 'Design Studio',
            position: 'Full Stack Developer',
            startDate: '2019-01-01',
            endDate: '2020-12-31',
            description: 'Built web applications with React and Node.js',
            current: false,
          },
        ],
        contact: {
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          address: 'San Francisco, CA',
          website: 'https://example.com',
        },
      },
      appearance: {
        theme: {
          name: 'Modern',
          id: 'modern',
          colors: {
            primary: '#6B7BEE',
            secondary: '#7C64BA',
            accent: '#EC4899',
            background: '#FFFFFF',
            text: '#1F2937',
            textMuted: '#6B7280',
            border: '#E5E7EB',
            success: '#10B981',
            danger: '#EF4444',
            warning: '#F59E0B',
          },
          description: 'Modern purple and pink color scheme',
        },
        typography: {
          fontFamily: 'Inter',
          headingFont: 'Playfair Display',
          bodySize: 16,
          headingSize: 32,
          lineHeight: 1.6,
        },
        darkMode: false,
        spacing: 8,
        borderRadius: 8,
      },
      sections: [
        { id: '1', name: 'Hero', title: 'Hero Section', description: 'Main landing section', visible: true, order: 1, layout: 'grid', paddingTop: 64, paddingBottom: 64, showAnimation: true, animation: 'fade-in' },
        { id: '2', name: 'About', title: 'About Me', description: 'Introduction and background', visible: true, order: 2, layout: 'list', paddingTop: 48, paddingBottom: 48, showAnimation: true, animation: 'slide-up' },
        { id: '3', name: 'Projects', title: 'Portfolio Projects', description: 'Showcase your best work', visible: true, order: 3, layout: 'grid', paddingTop: 48, paddingBottom: 48, showAnimation: true, animation: 'zoom-in' },
        { id: '4', name: 'Skills', title: 'Technical Skills', description: 'Your expertise and proficiencies', visible: true, order: 4, layout: 'list', paddingTop: 48, paddingBottom: 48, showAnimation: false },
        { id: '5', name: 'Experience', title: 'Work Experience', description: 'Your career history', visible: true, order: 5, layout: 'timeline', paddingTop: 48, paddingBottom: 48, showAnimation: true, animation: 'fade-in' },
      ],
    };

    setCurrentPortfolio(mockPortfolio);
  }, [setCurrentPortfolio]);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManagement />;
      case 'appearance':
        return <AppearanceCustomization />;
      case 'sections':
        return <SectionsManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <NotificationCenter />
    </div>
  );
}
