import { Portfolio } from '../types/index.js';

interface ExperienceSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function ExperienceSection({ portfolio, colors }: ExperienceSectionProps) {
  const experiences = [...portfolio.experiences].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  if (experiences.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: colors.text,
          }}
        >
          Work Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{ backgroundColor: colors.primary + '30' }}
          ></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col sm:flex-row gap-8 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex sm:w-1/2 justify-center">
                  <div
                    className="w-4 h-4 rounded-full mt-6 relative z-10"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                </div>

                {/* Content */}
                <div
                  className="sm:w-1/2 p-6 rounded-lg"
                  style={{ backgroundColor: colors.primary + '10' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: colors.text }}
                    >
                      {exp.position}
                    </h3>
                    {exp.current && (
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.background,
                        }}
                      >
                        CURRENT
                      </span>
                    )}
                  </div>

                  <p
                    className="font-medium mb-2"
                    style={{ color: colors.primary }}
                  >
                    {exp.company}
                  </p>

                  <p
                    className="text-sm mb-4"
                    style={{ color: colors.textMuted }}
                  >
                    {formatDate(exp.startDate)} -{' '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </p>

                  <p style={{ color: colors.text }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
