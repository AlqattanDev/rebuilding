import { Portfolio } from '../types/index.js';

interface AboutSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function AboutSection({ portfolio, colors }: AboutSectionProps) {
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
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: colors.text }}
            >
              {portfolio.bio}
            </p>

            <div className="space-y-4">
              {portfolio.location && (
                <div className="flex items-center gap-3">
                  <span style={{ color: colors.primary }} className="font-semibold">
                    📍 Location
                  </span>
                  <span style={{ color: colors.textMuted }}>{portfolio.location}</span>
                </div>
              )}

              {portfolio.phone && (
                <div className="flex items-center gap-3">
                  <span style={{ color: colors.primary }} className="font-semibold">
                    📞 Phone
                  </span>
                  <a
                    href={`tel:${portfolio.phone}`}
                    style={{ color: colors.primary }}
                    className="hover:underline"
                  >
                    {portfolio.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span style={{ color: colors.primary }} className="font-semibold">
                  ✉️ Email
                </span>
                <a
                  href={`mailto:${portfolio.email}`}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  {portfolio.email}
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Projects', value: portfolio.projects.length },
              { label: 'Skills', value: portfolio.skills.length },
              { label: 'Experience', value: portfolio.experiences.length },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <p
                  className="text-3xl font-bold mb-2"
                  style={{ color: colors.primary }}
                >
                  {stat.value}
                </p>
                <p style={{ color: colors.textMuted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
