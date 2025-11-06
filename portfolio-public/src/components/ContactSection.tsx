import { Mail, Phone, MapPin } from 'lucide-react';
import { Portfolio } from '../types/index.js';

interface ContactSectionProps {
  portfolio: Portfolio;
  colors: any;
}

export default function ContactSection({ portfolio, colors }: ContactSectionProps) {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: colors.primary,
        color: colors.background,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: colors.background,
          }}
        >
          Let's Work Together
        </h2>

        <p className="text-lg mb-12 opacity-90">
          I'm always interested in hearing about new projects and opportunities.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <a
            href={`mailto:${portfolio.email}`}
            className="p-6 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.background + '20' }}
          >
            <Mail size={32} className="mx-auto mb-4" />
            <p className="font-semibold mb-2">{portfolio.email}</p>
            <p className="text-sm opacity-75">Email me anytime</p>
          </a>

          {/* Phone */}
          {portfolio.phone && (
            <a
              href={`tel:${portfolio.phone}`}
              className="p-6 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: colors.background + '20' }}
            >
              <Phone size={32} className="mx-auto mb-4" />
              <p className="font-semibold mb-2">{portfolio.phone}</p>
              <p className="text-sm opacity-75">Call or text</p>
            </a>
          )}

          {/* Location */}
          {portfolio.location && (
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.background + '20' }}
            >
              <MapPin size={32} className="mx-auto mb-4" />
              <p className="font-semibold mb-2">{portfolio.location}</p>
              <p className="text-sm opacity-75">Based in</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={`mailto:${portfolio.email}`}
          className="inline-block px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: colors.background,
            color: colors.primary,
          }}
        >
          Send Me an Email
        </a>
      </div>
    </section>
  );
}
