# Portfolio Public Frontend

Modern, performant React application that displays published portfolios. This is the public-facing website that showcases portfolio content to visitors.

## Features

✨ **Key Features**:
- Dynamic portfolio rendering based on slug
- Beautiful responsive design
- Supports all portfolio sections (Hero, About, Projects, Skills, Experience, Contact)
- Dynamic theming based on portfolio settings
- Smooth animations and transitions
- SEO-friendly
- Fast page load times
- Mobile-optimized

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Animations**: Framer Motion + CSS animations

## Project Structure

```
portfolio-public/
├── src/
│   ├── api/
│   │   └── client.ts           # API client for backend
│   ├── components/
│   │   ├── HeroSection.tsx     # Hero landing section
│   │   ├── AboutSection.tsx    # About/intro section
│   │   ├── ProjectsSection.tsx # Project showcase
│   │   ├── SkillsSection.tsx   # Skills grid
│   │   ├── ExperienceSection.tsx # Timeline section
│   │   ├── ContactSection.tsx  # Contact info
│   │   └── Footer.tsx          # Footer with links
│   ├── pages/
│   │   └── PortfolioPage.tsx   # Main portfolio page
│   ├── store/
│   │   └── portfolioStore.ts   # Zustand state store
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Router setup
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── tailwind.config.js         # Tailwind config
├── postcss.config.js          # PostCSS config
├── .env.example               # Environment template
└── README.md                  # Documentation
```

## Prerequisites

- Node.js 16+
- npm or yarn
- Portfolio CMS Backend running on http://localhost:9000

## Installation

### 1. Install Dependencies

```bash
cd portfolio-public
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

**Update `.env`**:

```env
VITE_API_URL=http://localhost:9000/api
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:9001`

**Note**: The port can be configured in `vite.config.ts` if needed.

### 4. Build for Production

```bash
npm run build
```

Optimized build output in `dist/` directory.

## Usage

### Viewing Portfolios

Portfolios are accessed via their slug:

```
http://localhost:4000/my-portfolio
http://localhost:4000/john-doe
http://localhost:4000/tech-developer
```

### URL Structure

- **Root**: `http://localhost:4000/` - Home/info page
- **Portfolio**: `http://localhost:4000/:slug` - View specific portfolio
- **Not Found**: `http://localhost:4000/*` - 404 page

### Dynamic Sections

Sections are rendered based on portfolio configuration:

1. **Hero Section** - Welcome banner with CTAs
2. **About Section** - Personal intro, contact info, stats
3. **Projects Section** - Project cards with links
4. **Skills Section** - Skills grouped by category with proficiency bars
5. **Experience Section** - Timeline of work history
6. **Contact Section** - Contact information and CTA
7. **Footer** - Social links and quick navigation

## Component Architecture

### HeroSection
- Displays name, title, and bio
- Social media links
- CTA buttons (View Work, Contact)
- Animated scroll indicator

### AboutSection
- Personal introduction
- Contact information
- Statistics (projects, skills, experience count)
- Location and contact methods

### ProjectsSection
- Grid layout of published projects
- Project images (fallback to placeholder)
- Tags and technologies
- Links to live demo and GitHub

### SkillsSection
- Skills grouped by category (Frontend, Backend, Design, etc.)
- Proficiency bars (0-100%)
- Skill level badges
- Responsive grid layout

### ExperienceSection
- Timeline layout
- Company, position, and dates
- Job description
- Current position indicator
- Alternating left/right layout on desktop

### ContactSection
- Large CTA section
- Email, phone, location cards
- "Send me an Email" button
- Prominent call-to-action

### Footer
- Quick links to sections
- Social media links
- Copyright information
- Portfolio credit

## API Integration

### Portfolio Endpoint

The app fetches portfolio data from the backend:

```
GET /api/portfolios/public/:slug
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "slug": "john-doe",
    "title": "Full Stack Developer",
    "bio": "...",
    "email": "john@example.com",
    "projects": [...],
    "skills": [...],
    "experiences": [...],
    "sections": [...],
    "theme": {
      "colors": {...},
      "typography": {...}
    }
  }
}
```

## Styling & Theming

### Dynamic Theming

Colors are applied dynamically from portfolio theme:

```typescript
const colors = portfolio.theme.colors;

<div style={{ backgroundColor: colors.primary }}>
```

### CSS Variables

Custom CSS properties for theme colors:

```css
:root {
  --color-primary: #6B7BEE;
  --color-secondary: #7C64BA;
  --color-accent: #EC4899;
  --color-background: #FFFFFF;
  --color-text: #1F2937;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
}
```

### Tailwind CSS

Built with Tailwind for responsive design:

```bash
# Development
npm run dev

# Production build
npm run build
```

## Animations

### Built-in Animations

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up effect
- `animate-zoom-in` - Zoom in effect
- `animate-float` - Float animation
- `animate-bounce` - Bounce animation

### Custom Animations

Define animations in `tailwind.config.js`:

```javascript
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
}
```

## Performance Optimizations

✅ **Implemented**:
- Code splitting with React Router
- Image lazy loading ready
- CSS compression with Tailwind
- JavaScript minification with Terser
- No external CSS frameworks (just Tailwind)
- Optimized bundle size

⚠️ **Recommended**:
- Image optimization (WebP, AVIF)
- Service Worker for offline support
- Caching headers
- CDN deployment
- Analytics tracking

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Traditional Hosting

1. Build: `npm run build`
2. Deploy `dist/` folder to web server
3. Set up rewrite rules for SPA routing

**Nginx**:
```nginx
server {
    listen 80;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

```env
# Required
VITE_API_URL=http://localhost:3000/api

# Optional
VITE_ANALYTICS_ID=          # Google Analytics ID
VITE_CDN_URL=               # CDN URL for images
```

## SEO Considerations

Currently implemented:
- Dynamic page titles
- Semantic HTML
- Meta tags in index.html
- Structured data ready

**Recommended additions**:
- Meta descriptions
- Open Graph tags
- JSON-LD structured data
- Sitemap generation
- robots.txt

## Testing

Run tests:

```bash
npm test
```

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import PortfolioPage from '../pages/PortfolioPage';

test('renders portfolio page', () => {
  render(<PortfolioPage />);
  expect(screen.getByText(/Loading portfolio/i)).toBeInTheDocument();
});
```

## Troubleshooting

### Portfolio Not Found

- Check the slug is correct
- Ensure portfolio is published in admin dashboard
- Verify backend is running and API URL is correct

### Styling Not Applied

- Clear browser cache
- Rebuild Tailwind CSS: `npm run build`
- Check color values in theme

### API Errors

- Verify `VITE_API_URL` environment variable
- Check backend is running
- Check CORS configuration in backend

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit a pull request

## Performance Metrics

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 150KB gzipped

## Future Enhancements

- [ ] Blog section support
- [ ] Newsletter signup
- [ ] Comment system
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Performance monitoring

## License

MIT License

## Support

For issues or questions, please check the documentation or create an issue on GitHub.

---

**Happy building! 🚀**
