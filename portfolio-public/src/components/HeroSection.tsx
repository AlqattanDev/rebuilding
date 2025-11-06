import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Portfolio } from '../types/index.js';

interface HeroSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function HeroSection({ portfolio, colors }: HeroSectionProps) {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        paddingTop: '64px',
        paddingBottom: '64px',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting */}
        <div className="mb-6 animate-fade-in">
          <p
            className="text-sm sm:text-base font-medium uppercase tracking-wider"
            style={{ color: colors.accent }}
          >
            Welcome to my portfolio
          </p>
        </div>

        {/* Name */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in"
          style={{
            fontFamily: 'Playfair Display, serif',
            animationDelay: '0.1s',
          }}
        >
          {portfolio.title}
        </h1>

        {/* Bio */}
        <p
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in"
          style={{
            color: colors.textMuted,
            animationDelay: '0.2s',
          }}
        >
          {portfolio.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
            }}
          >
            View My Work
            <ArrowRight size={20} />
          </button>

          <a
            href={`mailto:${portfolio.email}`}
            className="px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-2"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
              backgroundColor: 'transparent',
            }}
          >
            <Mail size={20} />
            Get in Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {portfolio.socials.github && (
            <a
              href={portfolio.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:opacity-70 transition-opacity"
              style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
              title="GitHub"
            >
              <Github size={24} />
            </a>
          )}
          {portfolio.socials.linkedin && (
            <a
              href={portfolio.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:opacity-70 transition-opacity"
              style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          )}
          {portfolio.socials.twitter && (
            <a
              href={portfolio.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:opacity-70 transition-opacity"
              style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
              title="Twitter"
            >
              <Twitter size={24} />
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce flex justify-center">
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center p-2"
            style={{ borderColor: colors.textMuted }}
          >
            <div
              className="w-1 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.textMuted }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
