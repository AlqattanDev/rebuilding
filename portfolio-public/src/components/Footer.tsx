import { Portfolio } from '../types/index.js';

interface FooterProps {
  portfolio: Portfolio;
  colors: any;
}

export default function Footer({ portfolio, colors }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: colors.text,
        color: colors.background,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8 pb-8 border-b" style={{ borderColor: colors.background + '30' }}>
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">{portfolio.name}</h3>
            <p style={{ color: colors.background, opacity: 0.7 }}>
              {portfolio.bio}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Hero', 'About', 'Projects', 'Skills', 'Experience'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      style={{ color: colors.background, opacity: 0.7 }}
                      className="hover:opacity-100 transition-opacity"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              {portfolio.socials.github && (
                <a
                  href={portfolio.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.background, opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity"
                >
                  GitHub
                </a>
              )}
              {portfolio.socials.linkedin && (
                <a
                  href={portfolio.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.background, opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.socials.twitter && (
                <a
                  href={portfolio.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.background, opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p style={{ color: colors.background, opacity: 0.6 }}>
            © {currentYear} {portfolio.name}. All rights reserved.
          </p>
          <p style={{ color: colors.background, opacity: 0.5, marginTop: '8px', fontSize: '12px' }}>
            Built with Portfolio CMS
          </p>
        </div>
      </div>
    </footer>
  );
}
