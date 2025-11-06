import { ExternalLink, Github } from 'lucide-react';
import { Portfolio } from '../types/index.js';

interface ProjectsSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function ProjectsSection({ portfolio, colors }: ProjectsSectionProps) {
  const projects = portfolio.projects.filter((p) => p.status === 'published');

  if (projects.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      id="projects"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: colors.text,
          }}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              {/* Project Image */}
              {project.image ? (
                <div className="h-40 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <div
                    className="text-4xl font-bold opacity-20"
                    style={{ color: colors.primary }}
                  >
                    {project.title.charAt(0)}
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm mb-4 flex-1"
                  style={{ color: colors.textMuted }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: colors.primary + '20',
                        color: colors.primary,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                      style={{ color: colors.primary }}
                    >
                      <ExternalLink size={16} />
                      View
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                      style={{ color: colors.primary }}
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
