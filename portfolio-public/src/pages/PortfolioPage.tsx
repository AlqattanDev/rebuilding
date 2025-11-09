import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioApi } from '../api/client.js';
import { usePortfolioStore } from '../store/portfolioStore.js';
import HeroSection from '../components/HeroSection.js';
import AboutSection from '../components/AboutSection.js';
import ProjectsSection from '../components/ProjectsSection.js';
import SkillsSection from '../components/SkillsSection.js';
import ExperienceSection from '../components/ExperienceSection.js';
import ContactSection from '../components/ContactSection.js';
import Footer from '../components/Footer.js';
import TerminalPortfolioPage from './TerminalPortfolioPage.js';

export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();
  const { portfolio, isLoading, error, setPortfolio, setLoading, setError } =
    usePortfolioStore();

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await portfolioApi.getPublicPortfolio(slug);
        if (response.success && response.data) {
          setPortfolio(response.data);
          // Update page title
          document.title = `${response.data.name} - Portfolio`;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug, setPortfolio, setLoading, setError]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error ? 'Error' : 'Portfolio Not Found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'The portfolio you are looking for does not exist.'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Check if this is a terminal template portfolio
  if (portfolio.template === 'terminal') {
    return <TerminalPortfolioPage />;
  }

  // Default colors in case theme is not set
  const defaultColors = {
    primary: '#6B7BEE',
    secondary: '#4B5BCC',
    accent: '#8B9BFF',
    background: '#FFFFFF',
    text: '#1F2937',
  };

  const colors = portfolio.theme?.colors || defaultColors;

  // Render sections based on configuration
  const renderSection = (sectionName: string) => {
    const sectionConfig = portfolio.sections.find(
      (s) => s.name === sectionName && s.visible
    );
    if (!sectionConfig) return null;

    const animationClass =
      sectionConfig.animation && sectionConfig.showAnimation
        ? `animate-${sectionConfig.animation}`
        : '';

    switch (sectionName) {
      case 'Hero':
        return <HeroSection key="hero" portfolio={portfolio} colors={colors} />;
      case 'About':
        return (
          <div key="about" id="about" className={animationClass}>
            <AboutSection portfolio={portfolio} colors={colors} />
          </div>
        );
      case 'Projects':
        return (
          <div key="projects" className={animationClass}>
            <ProjectsSection portfolio={portfolio} colors={colors} />
          </div>
        );
      case 'Skills':
        return (
          <div key="skills" className={animationClass}>
            <SkillsSection portfolio={portfolio} colors={colors} />
          </div>
        );
      case 'Experience':
        return (
          <div key="experience" className={animationClass}>
            <ExperienceSection portfolio={portfolio} colors={colors} />
          </div>
        );
      case 'Contact':
        return (
          <div key="contact" className={animationClass}>
            <ContactSection portfolio={portfolio} colors={colors} />
          </div>
        );
      default:
        return null;
    }
  };

  // Get visible sections in order
  const visibleSections = portfolio.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.name);

  return (
    <div
      style={{
        '--color-primary': colors.primary,
        '--color-secondary': colors.secondary,
        '--color-accent': colors.accent,
        '--color-background': colors.background,
        '--color-text': colors.text,
      } as React.CSSProperties}
    >
      {/* Render sections */}
      {visibleSections.map((sectionName) => renderSection(sectionName))}

      {/* Footer */}
      <Footer portfolio={portfolio} colors={colors} />
    </div>
  );
}
