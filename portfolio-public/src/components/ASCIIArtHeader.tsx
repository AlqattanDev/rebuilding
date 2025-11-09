import React from 'react';

interface ASCIIArtHeaderProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

// Simple ASCII art letters (can be expanded)
const ASCII_LETTERS: Record<string, string> = {
  'A': ` █████╗
██╔══██╗
███████║
██╔══██║
██║  ██║
╚═╝  ╚═╝`,
  'B': `██████╗
██╔══██╗
██████╔╝
██╔══██╗
██████╔╝
╚═════╝ `,
  'C': ` ██████╗
██╔════╝
██║
██║
╚██████╗
 ╚═════╝`,
  'D': `██████╗
██╔══██╗
██║  ██║
██║  ██║
██████╔╝
╚═════╝ `,
  'E': `███████╗
██╔════╝
█████╗
██╔══╝
███████╗
╚══════╝`,
  'F': `███████╗
██╔════╝
█████╗
██╔══╝
██║
╚═╝     `,
  'G': ` ██████╗
██╔════╝
██║  ███╗
██║   ██║
╚██████╔╝
 ╚═════╝ `,
  'H': `██╗  ██╗
██║  ██║
███████║
██╔══██║
██║  ██║
╚═╝  ╚═╝`,
  'I': `██╗
██║
██║
██║
██║
╚═╝`,
  'J': `     ██╗
     ██║
     ██║
██   ██║
╚█████╔╝
 ╚════╝ `,
  'K': `██╗  ██╗
██║ ██╔╝
█████╔╝
██╔═██╗
██║  ██╗
╚═╝  ╚═╝`,
  'L': `██╗
██║
██║
██║
███████╗
╚══════╝`,
  'M': `███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝`,
  'N': `███╗   ██╗
████╗  ██║
██╔██╗ ██║
██║╚██╗██║
██║ ╚████║
╚═╝  ╚═══╝`,
  'O': ` ██████╗
██╔═══██╗
██║   ██║
██║   ██║
╚██████╔╝
 ╚═════╝ `,
  'P': `██████╗
██╔══██╗
██████╔╝
██╔═══╝
██║
╚═╝     `,
  'Q': ` ██████╗
██╔═══██╗
██║   ██║
██║▄▄ ██║
╚██████╔╝
 ╚══▀▀═╝ `,
  'R': `██████╗
██╔══██╗
██████╔╝
██╔══██╗
██║  ██║
╚═╝  ╚═╝`,
  'S': `███████╗
██╔════╝
███████╗
╚════██║
███████║
╚══════╝`,
  'T': `████████╗
╚══██╔══╝
   ██║
   ██║
   ██║
   ╚═╝   `,
  'U': `██╗   ██╗
██║   ██║
██║   ██║
██║   ██║
╚██████╔╝
 ╚═════╝ `,
  'V': `██╗   ██╗
██║   ██║
██║   ██║
╚██╗ ██╔╝
 ╚████╔╝
  ╚═══╝  `,
  'W': `██╗    ██╗
██║    ██║
██║ █╗ ██║
██║███╗██║
╚███╔███╔╝
 ╚══╝╚══╝ `,
  'X': `██╗  ██╗
╚██╗██╔╝
 ╚███╔╝
 ██╔██╗
██╔╝ ██╗
╚═╝  ╚═╝`,
  'Y': `██╗   ██╗
╚██╗ ██╔╝
 ╚████╔╝
  ╚██╔╝
   ██║
   ╚═╝   `,
  'Z': `███████╗
╚══███╔╝
  ███╔╝
 ███╔╝
███████╗
╚══════╝`,
  '0': ` ██████╗
██╔═████╗
██║██╔██║
████╔╝██║
╚██████╔╝
 ╚═════╝ `,
  '1': `  ██╗
 ███║
 ╚██║
  ██║
  ██║
  ╚═╝`,
  '2': `██████╗
╚════██╗
 █████╔╝
██╔═══╝
███████╗
╚══════╝`,
  '3': `██████╗
╚════██╗
 █████╔╝
 ╚═══██╗
██████╔╝
╚═════╝ `,
  '4': `██╗  ██╗
██║  ██║
███████║
╚════██║
     ██║
     ╚═╝`,
  '5': `███████╗
██╔════╝
███████╗
╚════██║
███████║
╚══════╝`,
  '6': ` ██████╗
██╔════╝
███████╗
██╔═══██╗
╚██████╔╝
 ╚═════╝ `,
  '7': `███████╗
╚════██║
    ██╔╝
   ██╔╝
   ██║
   ╚═╝  `,
  '8': ` █████╗
██╔══██╗
╚█████╔╝
██╔══██╗
╚█████╔╝
 ╚════╝ `,
  '9': ` █████╗
██╔══██╗
╚██████║
 ╚═══██║
 █████╔╝
 ╚════╝ `,
  ' ': `




    `,
};

export const ASCIIArtHeader: React.FC<ASCIIArtHeaderProps> = ({
  text,
  size = 'medium'
}) => {
  const generateASCIIArt = (input: string): string[] => {
    const upperText = input.toUpperCase();
    const lines: string[] = ['', '', '', '', '', ''];

    for (const char of upperText) {
      const asciiChar = ASCII_LETTERS[char] || ASCII_LETTERS[' '];
      const charLines = asciiChar.split('\n');

      charLines.forEach((line, index) => {
        lines[index] += line + '  ';
      });
    }

    return lines;
  };

  const asciiLines = generateASCIIArt(text);

  // Responsive size classes - smaller on mobile, larger on desktop
  const sizeClasses = {
    small: 'text-[6pt] sm:text-[7pt] md:text-[8pt] leading-[1.1]',
    medium: 'text-[7pt] sm:text-[8pt] md:text-[10pt] leading-[1.2]',
    large: 'text-[8pt] sm:text-[10pt] md:text-[12pt] leading-[1.3]',
  };

  return (
    <div className="ascii-art-header mb-4 sm:mb-6 md:mb-8">
      <pre className={`ascii-name font-mono font-bold ${sizeClasses[size]} text-terminal-green overflow-x-auto`}>
        {asciiLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </pre>
    </div>
  );
};
