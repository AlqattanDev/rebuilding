import { Portfolio } from '../types/index.js';

interface SkillsSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function SkillsSection({ portfolio, colors }: SkillsSectionProps) {
  // Group skills by category
  const skillsByCategory = portfolio.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof portfolio.skills>
  );

  if (portfolio.skills.length === 0) return null;

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
          Technical Skills
        </h2>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: colors.primary }}
              >
                {category}
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className="font-medium"
                        style={{ color: colors.text }}
                      >
                        {skill.name}
                      </h4>
                      {skill.proficiency && (
                        <span
                          className="text-sm font-semibold"
                          style={{ color: colors.primary }}
                        >
                          {skill.proficiency}%
                        </span>
                      )}
                    </div>

                    {skill.proficiency && (
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: colors.border }}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: colors.primary,
                          }}
                        ></div>
                      </div>
                    )}

                    <p
                      className="text-sm mt-2"
                      style={{ color: colors.textMuted }}
                    >
                      {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
