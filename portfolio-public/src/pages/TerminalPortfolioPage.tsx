import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioApi } from '../api/client';
import { usePortfolioStore } from '../store/portfolioStore';
import { ASCIIArtHeader } from '../components/ASCIIArtHeader';
import TerminalSectionHeader from '../components/TerminalSectionHeader';
import SkillsDotsProgress from '../components/SkillsDotsProgress';
import TerminalContact from '../components/TerminalContact';

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
  const displayName = portfolio.title.split(' ')[0] || 'USER';

  return (
    <div className="terminal-portfolio min-h-screen bg-terminal-bg text-terminal-green font-mono py-16 px-8">
      <div className="terminal-container max-w-[900px] mx-auto">

        {/* ASCII Art Header */}
        <ASCIIArtHeader text={displayName} size="large" />

        {/* Title/Role */}
        <div className="title-line text-[18pt] font-bold tracking-[0.3em] my-6 text-terminal-green">
          {portfolio.bio.toUpperCase()}
        </div>

        {/* Divider */}
        <div className="divider h-[2px] bg-terminal-border my-8"></div>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="terminal-section mb-12">
            <TerminalSectionHeader title="Skills" />
            <div className="section-content">
              <SkillsDotsProgress skills={portfolio.skills} />
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experiences && portfolio.experiences.length > 0 && (
          <section className="terminal-section mb-12">
            <TerminalSectionHeader title="Experience" />
            <div className="section-content">
              {portfolio.experiences
                .sort((a, b) => a.order - b.order)
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="experience-item mb-8 pl-4 border-l-2 border-terminal-border"
                  >
                    <div className="subsection-header font-mono font-bold text-[10pt] text-terminal-green mb-2">
                      <span className="bracket text-terminal-muted mr-2">&gt;</span>
                      {exp.company.toUpperCase()}
                    </div>
                    <div className="experience-role text-[9pt] text-terminal-muted mb-1">
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
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="terminal-section mb-12">
            <TerminalSectionHeader title="Projects" />
            <div className="section-content">
              {portfolio.projects
                .filter((p) => p.status !== 'draft')
                .sort((a, b) => a.order - b.order)
                .map((project) => (
                  <div
                    key={project.id}
                    className="project-item mb-6 pl-4 border-l-2 border-terminal-border"
                  >
                    <div className="project-name font-mono font-bold text-[10pt] text-terminal-green mb-2">
                      {project.title.toUpperCase()}
                    </div>
                    <p className="project-description text-[9pt] text-terminal-green leading-relaxed mb-2">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="project-tech text-[8pt] text-terminal-dim font-mono">
                        [{project.tags.join('] [')}]
                      </div>
                    )}
                    {(project.link || project.githubLink) && (
                      <div className="project-links mt-2 flex gap-4 text-[8pt]">
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
        <section className="terminal-section mb-12">
          <TerminalSectionHeader title="Contact" />
          <div className="section-content">
            <TerminalContact
              email={portfolio.email}
              phone={portfolio.phone}
              location={portfolio.location}
              socials={portfolio.socials}
            />
          </div>
        </section>

        {/* Footer Metadata */}
        <footer className="terminal-footer mt-16 pt-8 border-t-2 border-terminal-border">
          <div className="metadata text-[8pt] text-terminal-dim flex justify-between items-center">
            <div>
              <span>VERSION 1.0</span>
              <span className="mx-4">|</span>
              <span>BUILD 2025.11</span>
              <span className="mx-4">|</span>
              <span>STATUS: ACTIVE</span>
            </div>
            <div>
              <span>VIEWS: {portfolio.views}</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
