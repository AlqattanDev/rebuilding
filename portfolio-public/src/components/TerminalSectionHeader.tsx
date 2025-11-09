import React from 'react';

interface TerminalSectionHeaderProps {
  title: string;
  icon?: string;
  className?: string;
}

export const TerminalSectionHeader: React.FC<TerminalSectionHeaderProps> = ({
  title,
  icon = '>',
  className = ''
}) => {
  return (
    <div className={`terminal-section-header font-mono font-bold text-[10pt] sm:text-[11pt] tracking-wider mb-3 sm:mb-4 text-terminal-green ${className}`}>
      <span className="bracket text-terminal-muted mr-2">{icon}</span>
      {title.toUpperCase()}
    </div>
  );
};

export default TerminalSectionHeader;
