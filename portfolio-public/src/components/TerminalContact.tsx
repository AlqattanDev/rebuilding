import React, { useState } from 'react';

interface TerminalContactProps {
  email: string;
  phone?: string;
  location?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  className?: string;
}

export const TerminalContact: React.FC<TerminalContactProps> = ({
  email,
  phone,
  location,
  socials,
  className = ''
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const ContactItem: React.FC<{
    icon: string;
    value: string;
    copyValue?: string;
    label: string;
  }> = ({ icon, value, copyValue, label }) => (
    <div
      className="contact-item font-mono text-[8pt] sm:text-[9pt] text-terminal-green cursor-pointer hover:text-white transition-colors group flex items-center gap-2 break-all sm:break-normal"
      onClick={() => copyValue && copyToClipboard(copyValue, label)}
      title={copyValue ? "Click to copy" : ""}
    >
      <span className="text-terminal-muted">{icon}</span>
      <span className="group-hover:shadow-terminal">{value}</span>
      {copiedItem === label && (
        <span className="text-[7pt] sm:text-[8pt] text-terminal-muted ml-2">✓ copied</span>
      )}
    </div>
  );

  return (
    <div className={`terminal-contact flex flex-col gap-2 sm:gap-3 ${className}`}>
      {/* Email */}
      <ContactItem
        icon="→"
        value={email}
        copyValue={email}
        label="email"
      />

      {/* Phone */}
      {phone && (
        <ContactItem
          icon="📱"
          value={phone}
          copyValue={phone}
          label="phone"
        />
      )}

      {/* Location */}
      {location && (
        <ContactItem
          icon="📍"
          value={location}
          label="location"
        />
      )}

      {/* GitHub */}
      {socials.github && (
        <ContactItem
          icon="→"
          value={`github.com/${socials.github}`}
          copyValue={`https://github.com/${socials.github}`}
          label="github"
        />
      )}

      {/* LinkedIn */}
      {socials.linkedin && (
        <ContactItem
          icon="→"
          value={`linkedin.com/in/${socials.linkedin}`}
          copyValue={`https://linkedin.com/in/${socials.linkedin}`}
          label="linkedin"
        />
      )}

      {/* Twitter */}
      {socials.twitter && (
        <ContactItem
          icon="→"
          value={`twitter.com/${socials.twitter}`}
          copyValue={`https://twitter.com/${socials.twitter}`}
          label="twitter"
        />
      )}

      {/* Connection status message */}
      <div className="connection-status mt-4 font-mono text-[8pt] text-terminal-muted">
        [ CONNECTION ESTABLISHED ]
      </div>
    </div>
  );
};

export default TerminalContact;
