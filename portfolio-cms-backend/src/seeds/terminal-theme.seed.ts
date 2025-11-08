import 'reflect-metadata';
import AppDataSource from '../config/database.js';
import { Theme } from '../entities/Theme.js';

const terminalThemeData = {
  name: 'Terminal Developer',
  slug: 'terminal-dev',
  description: 'Monochrome terminal-style theme with developer aesthetics',
  colors: {
    primary: '#00ff41',
    secondary: '#888888',
    accent: '#00ff41',
    background: '#0a0a0a',
    text: '#00ff41',
    textMuted: '#666666',
    border: '#333333',
    success: '#00ff41',
    danger: '#ff4136',
    warning: '#ffdc00',
  },
  typography: {
    fontFamily: 'JetBrains Mono, Courier New, monospace',
    headingFont: 'Space Mono, monospace',
    bodySize: 9,
    headingSize: 14,
    lineHeight: 1.4,
  },
  darkMode: true,
  spacing: 16,
  borderRadius: 0,
  customCSS: `
/* Terminal theme custom styles */
body.terminal-theme {
  background: #0a0a0a;
  color: #00ff41;
}

.terminal-mode {
  font-family: 'JetBrains Mono', monospace;
}

.terminal-section-header {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.terminal-bracket {
  color: #888888;
}

/* ASCII art styling */
.ascii-art {
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

/* Scanline effect (optional) */
.scanline-effect::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9999;
}
  `,
  isDefault: false,
};

async function seedTerminalTheme() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('📦 Database connection established');

    // Get Theme repository
    const themeRepository = AppDataSource.getRepository(Theme);

    // Check if terminal theme already exists
    const existingTheme = await themeRepository.findOne({
      where: { slug: 'terminal-dev' },
    });

    if (existingTheme) {
      console.log('⚠️  Terminal theme already exists, updating...');
      Object.assign(existingTheme, terminalThemeData);
      await themeRepository.save(existingTheme);
      console.log('✅ Terminal theme updated successfully!');
    } else {
      // Create new theme
      const terminalTheme = themeRepository.create(terminalThemeData);
      await themeRepository.save(terminalTheme);
      console.log('✅ Terminal theme created successfully!');
    }

    // Show the theme details
    const savedTheme = await themeRepository.findOne({
      where: { slug: 'terminal-dev' },
    });

    console.log('\n📋 Terminal Theme Details:');
    console.log(`   ID: ${savedTheme?.id}`);
    console.log(`   Name: ${savedTheme?.name}`);
    console.log(`   Slug: ${savedTheme?.slug}`);
    console.log(`   Colors: ${Object.keys(savedTheme?.colors || {}).length} defined`);
    console.log(`   Typography: ${savedTheme?.typography.fontFamily}`);
    console.log('\n🎨 Theme is ready to use in portfolios!');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error seeding terminal theme:', error);
    process.exit(1);
  }
}

// Run the seed if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTerminalTheme();
}

export default seedTerminalTheme;
