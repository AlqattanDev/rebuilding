import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioApi } from '../api/client';
import { usePortfolioStore } from '../store/portfolioStore';
import { ASCIIArtHeader } from '../components/ASCIIArtHeader';
import TerminalSectionHeader from '../components/TerminalSectionHeader';
import SkillsDotsProgress from '../components/SkillsDotsProgress';
import TerminalContact from '../components/TerminalContact';
import { useTypingEffect } from '../hooks/useTypingEffect';

export default function TerminalPortfolioPage() {
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
          document.title = `${response.data.name} - Terminal Portfolio`;
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
      <div className="terminal-loading min-h-screen flex items-center justify-center bg-terminal-bg">
        <div className="text-center font-mono">
          <div className="text-terminal-green text-[14pt] mb-4 animate-pulse">
            LOADING...
          </div>
          <div className="text-terminal-muted text-[9pt]">
            [ INITIALIZING SYSTEM ]
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="terminal-error min-h-screen flex items-center justify-center bg-terminal-bg">
        <div className="text-center font-mono">
          <div className="text-terminal-green text-[18pt] font-bold mb-4">
            ERROR 404
          </div>
          <div className="text-terminal-muted text-[9pt] mb-8">
            {error || '[ PORTFOLIO NOT FOUND ]'}
          </div>
          <a
            href="/"
            className="text-terminal-green hover:text-white transition-colors text-[9pt]"
          >
            → RETURN HOME
          </a>
        </div>
      </div>
    );
  }

  // Extract first name or full name for ASCII art
  const displayName = portfolio?.title?.split(' ')[0] || 'USER';

  // Typing effect for bio
  const { displayedText: typedBio, isComplete } = useTypingEffect({
    text: portfolio?.bio?.toUpperCase() || 'PORTFOLIO',
    speed: 30,
    delay: 500,
    enabled: true,
  });

  return (
    <div className="terminal-portfolio relative min-h-screen bg-terminal-bg text-terminal-green font-mono py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Scanline effect overlay */}
      <div className="scanline-overlay absolute inset-0 pointer-events-none opacity-10">
        <div className="scanline absolute w-full h-[2px] bg-gradient-to-b from-transparent via-terminal-green to-transparent animate-scanline"></div>
      </div>

      <div className="terminal-container max-w-[900px] mx-auto relative z-10">

        {/* ASCII Art Header */}
        <div className="animate-terminal-fade-in">
          <ASCIIArtHeader text={displayName} size="large" />
        </div>

        {/* Title/Role with typing effect */}
        <div className="title-line text-[12pt] sm:text-[14pt] md:text-[16pt] lg:text-[18pt] font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] my-4 sm:my-5 md:my-6 text-terminal-green animate-terminal-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          {typedBio}
          {!isComplete && <span className="cursor animate-cursor-blink ml-1">█</span>}
        </div>

        {/* Divider */}
        <div className="divider h-[2px] bg-terminal-border my-6 sm:my-7 md:my-8"></div>

        {/* Skills Section */}
        {portfolio?.skills && portfolio.skills.length > 0 && (
          <section className="terminal-section mb-8 sm:mb-10 md:mb-12 animate-terminal-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <TerminalSectionHeader title="Skills" />
            <div className="section-content">
              <SkillsDotsProgress skills={portfolio.skills} />
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio?.experiences && portfolio.experiences.length > 0 && (
          <section className="terminal-section mb-8 sm:mb-10 md:mb-12 animate-terminal-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <TerminalSectionHeader title="Experience" />
            <div className="section-content">
              {portfolio.experiences
                .sort((a, b) => a.order - b.order)
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="experience-item mb-6 sm:mb-7 md:mb-8 pl-3 sm:pl-4 border-l-2 border-terminal-border"
                  >
                    <div className="subsection-header font-mono font-bold text-[9pt] sm:text-[10pt] text-terminal-green mb-2">
                      <span className="bracket text-terminal-muted mr-2">&gt;</span>
                      {exp.company?.toUpperCase() || 'COMPANY'}
                    </div>
                    <div className="experience-role text-[8pt] sm:text-[9pt] text-terminal-muted mb-1">
                      {exp.position}
                    </div>
                    <div className="experience-period text-[8pt] text-terminal-dim mb-3">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                    <p className="experience-description text-[9pt] text-terminal-green leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio?.projects && portfolio.projects.length > 0 && (
          <section className="terminal-section mb-8 sm:mb-10 md:mb-12 animate-terminal-slide-up" style={{ animationDelay: '1.0s', animationFillMode: 'both' }}>
            <TerminalSectionHeader title="Projects" />
            <div className="section-content">
              {portfolio.projects
                .filter((p) => p.status !== 'draft')
                .sort((a, b) => a.order - b.order)
                .map((project) => (
                  <div
                    key={project.id}
                    className="project-item mb-5 sm:mb-6 pl-3 sm:pl-4 border-l-2 border-terminal-border"
                  >
                    <div className="project-name font-mono font-bold text-[9pt] sm:text-[10pt] text-terminal-green mb-2">
                      {project.title?.toUpperCase() || 'PROJECT'}
                    </div>
                    <p className="project-description text-[8pt] sm:text-[9pt] text-terminal-green leading-relaxed mb-2">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="project-tech text-[7pt] sm:text-[8pt] text-terminal-dim font-mono break-words">
                        [{project.tags.join('] [')}]
                      </div>
                    )}
                    {(project.link || project.githubLink) && (
                      <div className="project-links mt-2 flex flex-wrap gap-3 sm:gap-4 text-[8pt]">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-muted hover:text-terminal-green transition-colors"
                          >
                            → LIVE DEMO
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-muted hover:text-terminal-green transition-colors"
                          >
                            → GITHUB
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="terminal-section mb-8 sm:mb-10 md:mb-12 animate-terminal-slide-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <TerminalSectionHeader title="Contact" />
          <div className="section-content">
            <TerminalContact
              email={portfolio.email || 'contact@example.com'}
              phone={portfolio.phone}
              location={portfolio.location}
              socials={portfolio.socials || {}}
            />
          </div>
        </section>

        {/* Footer Metadata */}
        <footer className="terminal-footer mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-7 md:pt-8 border-t-2 border-terminal-border animate-terminal-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
          <div className="metadata text-[7pt] sm:text-[8pt] text-terminal-dim flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4">
              <span>VERSION 1.0</span>
              <span className="hidden sm:inline">|</span>
              <span>BUILD 2025.11</span>
              <span className="hidden sm:inline">|</span>
              <span>STATUS: ACTIVE</span>
            </div>
            <div>
              <span>VIEWS: {portfolio.views || 0}</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
