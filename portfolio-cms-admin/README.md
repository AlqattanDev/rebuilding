# Portfolio CMS Admin Dashboard

A modern, scalable admin dashboard for managing customizable portfolios with full control over content, appearance, and presentation.

## Features

✨ **Key Features**:
- **Dashboard Overview** - Stats, analytics, and quick actions
- **Content Management** - Manage projects, about, experience, skills, and contact info
- **Appearance Customization** - Theme presets, color picker, typography settings, live preview
- **Sections Management** - Drag-and-drop reordering, toggle visibility, customize layout and animations
- **Analytics** - Traffic tracking, device breakdown, popular pages, traffic sources
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Real-time Preview** - See changes instantly as you customize

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Project Structure

```
portfolio-cms-admin/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── TopBar.tsx          # Top navigation bar
│   │   └── NotificationCenter.tsx # Toast notifications
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main overview
│   │   ├── ContentManagement.tsx # Content editor
│   │   ├── AppearanceCustomization.tsx # Theme editor
│   │   ├── SectionsManagement.tsx # Section configurator
│   │   └── Analytics.tsx       # Analytics dashboard
│   ├── store/
│   │   └── appStore.ts         # Zustand store
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind styles
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.ts               # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Install dependencies**:
```bash
cd portfolio-cms-admin
npm install
```

2. **Start development server**:
```bash
npm run dev
```

The app will open at `http://localhost:9002`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Usage

### Navigation
- Use the left sidebar to navigate between pages
- Click section titles to collapse/expand the sidebar on mobile
- Preview button in top-right to toggle between desktop/mobile preview

### Dashboard
- Overview of portfolio statistics
- Recent projects
- Quick actions for common tasks
- Portfolio health status

### Content Management
- **Projects Tab**: Add, edit, or delete portfolio projects
- **About Tab**: Edit personal information and bio
- **Experience Tab**: Manage work history and timeline
- **Skills Tab**: Add and rate technical skills
- **Contact Tab**: Manage contact information

### Appearance
- **Theme Presets**: Choose pre-built color schemes (Modern, Professional, Creative, Minimal)
- **Brand Colors**: Customize primary, secondary, accent, background, and text colors
- **Typography**: Select body and heading fonts
- **Effects**: Adjust border radius, enable dark mode
- **Live Preview**: See changes in real-time (desktop and mobile)

### Sections Management
- **Reorder**: Drag sections to change display order
- **Visibility**: Toggle sections on/off with eye icon
- **Layout**: Choose layout style (grid, list, carousel, timeline)
- **Animation**: Select entrance animations (fade-in, slide-up, zoom-in)
- **Spacing**: Adjust padding top/bottom
- **Background**: Set custom background colors per section

### Analytics
- **Statistics**: View key metrics (views, sessions, visitors, growth)
- **Traffic Chart**: Visual representation of traffic over time
- **Top Pages**: See which pages get the most traffic
- **Traffic Sources**: Understand where visitors come from
- **Device Breakdown**: See desktop vs mobile vs tablet split
- **Recent Activity**: Timeline of recent events

## Component Architecture

### Type System
The app uses comprehensive TypeScript types for:
- Portfolio configuration and content
- Theme and appearance settings
- Section configuration
- Dashboard state management

### State Management
Zustand store (`appStore.ts`) manages:
- Current portfolio
- Active page
- Loading state
- Error state
- Notifications

### UI Components
- **Sidebar**: Navigation with collapsible menu
- **TopBar**: Header with actions and notifications
- **NotificationCenter**: Toast notifications with auto-dismiss

## Customization

### Add a New Page
1. Create a new file in `src/pages/YourPage.tsx`
2. Add the page to the `renderContent()` function in `App.tsx`
3. Add a new menu item to `Sidebar.tsx`

### Modify Theme Colors
Edit `tailwind.config.js` to change the color palette globally:
```js
colors: {
  primary: '#6B7BEE',
  secondary: '#7C64BA',
  // ...
}
```

### Add Notifications
```typescript
const { addNotification } = useAppStore();

addNotification({
  type: 'success',
  message: 'Portfolio published successfully!',
  duration: 3000,
});
```

## API Integration

Currently, the app uses mock data. To integrate with a real API:

1. Create an `src/api/` folder with API client
2. Replace mock data calls in `App.tsx` with API calls
3. Update the store to handle async operations
4. Add error handling for API failures

## Performance Optimization

- Lazy loading for pages (can be added with React.lazy)
- Tailwind CSS purging unused styles
- Minified production build with Vite
- Optimized images and assets

## Accessibility

- Semantic HTML structure
- ARIA labels for icon buttons
- Keyboard navigation support
- Color contrast compliance

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Future Enhancements

- 🔧 Backend API integration
- 📦 Export to static HTML/CSS
- 🌐 Multi-language support
- 🎨 Advanced design customization
- 📊 Enhanced analytics
- 🔐 User authentication
- 💾 Auto-save functionality
- 🔄 Version history

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please check the documentation or create an issue on GitHub.
