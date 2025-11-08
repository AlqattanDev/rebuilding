# Portfolio CMS Extension Plan
## Supporting Advanced Portfolio Designs (Manus-Research Style)

**Created:** 2025-11-07
**Target:** Extend existing Portfolio CMS to support sophisticated portfolio designs with advanced features

---

## 🎯 Executive Summary

The manus-research portfolio showcases an advanced CV/portfolio design with:
- Terminal/developer aesthetics with dual-view modes
- Multiple design iterations (9+ variations)
- Interactive features (click-to-copy, keyboard shortcuts, animations)
- Advanced typography and geometric design elements
- Technical metadata and authentication features

**Goal:** Make the CMS flexible enough to create portfolios like this while remaining generic for other styles.

---

## 📊 Current CMS Capabilities

### Existing Database Schema
- **Portfolio**: name, slug, template, title, bio, contact info, sections (JSONB), published
- **Theme**: colors, typography, darkMode, spacing, borderRadius, customCSS
- **Project/Skill/Experience**: Standard content entities
- **Sections**: Configurable with visibility, order, layout, animations

### Current Limitations
❌ No support for ASCII art / custom branding elements
❌ No view mode switching (digital vs print)
❌ No design iteration/variant system
❌ Limited typography control (only 2 fonts)
❌ No custom metadata fields
❌ No geometric/decorative element configuration
❌ No advanced interaction settings
❌ No skills categorization
❌ No custom section layouts beyond basic grid/list/carousel

---

## 🏗️ Implementation Plan

### Phase 1: Extended Theme System (Week 1-2)

#### 1.1 Database Schema Changes

**Theme Entity Extensions:**
```typescript
@Column({ type: 'jsonb', nullable: true })
advancedTypography: {
  fonts: Array<{
    name: string;
    family: string;
    weights: number[];
    usage: 'heading' | 'body' | 'code' | 'accent';
  }>;
  sizes: {
    micro: string;
    small: string;
    base: string;
    large: string;
    xl: string;
    xxl: string;
  };
};

@Column({ type: 'jsonb', nullable: true })
viewModes: {
  enabled: boolean;
  modes: Array<{
    id: string;
    name: string;  // 'digital', 'print', 'dark', 'light'
    colors: object;
    typography: object;
    cssOverrides?: string;
  }>;
};

@Column({ type: 'jsonb', nullable: true })
decorativeElements: {
  asciiArt: {
    enabled: boolean;
    text: string;
    style: 'block' | 'outlined' | 'shadow';
    size: string;
  };
  geometricShapes: {
    enabled: boolean;
    shapes: Array<{
      type: 'border' | 'accent' | 'divider' | 'frame';
      style: string;
      position: string;
    }>;
  };
  backgroundPatterns: {
    enabled: boolean;
    pattern: 'grid' | 'dots' | 'lines' | 'none';
    opacity: number;
  };
  watermarks: {
    enabled: boolean;
    text: string;
    position: string;
    opacity: number;
  };
};

@Column({ type: 'jsonb', nullable: true })
interactionSettings: {
  clickToCopy: boolean;
  keyboardShortcuts: boolean;
  animations: {
    enabled: boolean;
    scrollTriggers: boolean;
    hoverEffects: boolean;
    transitionSpeed: number;
  };
};

@Column({ type: 'varchar', nullable: true })
themeCategory: 'corporate' | 'creative' | 'technical' | 'minimal' | 'custom';
```

**New Entity: DesignVariant**
```typescript
@Entity('design_variants')
export class DesignVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  portfolioId: string;

  @Column({ type: 'varchar' })
  name: string;  // 'Enhanced Typography', 'Geometric Borders', etc.

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  order: number;

  @Column({ type: 'uuid', nullable: true })
  themeId: string;  // Can override portfolio theme

  @Column({ type: 'jsonb' })
  layoutOverrides: object;  // Section-specific overrides

  @Column({ type: 'jsonb', nullable: true })
  customStyles: object;  // CSS overrides for this variant

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ManyToOne(() => Portfolio, { onDelete: 'CASCADE' })
  portfolio: Portfolio;

  @ManyToOne(() => Theme, { nullable: true })
  theme: Theme;
}
```

#### 1.2 Backend API Changes

**New Endpoints:**
- `POST /api/themes/:id/advanced` - Update advanced theme settings
- `GET /api/portfolios/:id/variants` - List design variants
- `POST /api/portfolios/:id/variants` - Create design variant
- `PUT /api/portfolios/:id/variants/:variantId` - Update variant
- `DELETE /api/portfolios/:id/variants/:variantId` - Delete variant
- `GET /api/portfolios/public/:slug?variant=:variantId` - View specific variant

**Modified Endpoints:**
- `PUT /api/themes/:id` - Support new advanced fields
- `GET /api/portfolios/:id` - Include variants in response

---

### Phase 2: Enhanced Portfolio Configuration (Week 3-4)

#### 2.1 Portfolio Entity Extensions

```typescript
@Column({ type: 'jsonb', nullable: true })
branding: {
  asciiName: string;
  tagline: string;
  customLogo?: string;
  favicon?: string;
};

@Column({ type: 'jsonb', nullable: true })
metadata: {
  version: string;
  buildNumber: string;
  status: 'active' | 'archived' | 'draft';
  checksum?: string;  // SHA256 or similar
  customFields: Array<{ key: string; value: string; }>;
};

@Column({ type: 'jsonb', nullable: true })
advancedSections: {
  skillsCategories: Array<{
    id: string;
    name: string;
    skills: string[];  // skill IDs
    displayMode: 'grid' | 'list' | 'dots';
  }>;
  timelineLayout: {
    style: 'vertical' | 'horizontal' | 'zigzag';
    showCompanyLogos: boolean;
    showTechTags: boolean;
  };
  contactStyle: 'standard' | 'terminal' | 'api' | 'minimal';
};

@Column({ type: 'boolean', default: false })
enableVariants: boolean;

@Column({ type: 'uuid', nullable: true })
defaultVariantId: string;

@Column({ type: 'jsonb', nullable: true })
printSettings: {
  enabled: boolean;
  paperSize: 'A4' | 'Letter' | 'Legal';
  margins: { top: number; right: number; bottom: number; left: number; };
  showMetadata: boolean;
  customCSS?: string;
};
```

#### 2.2 Skills Entity Extension

```typescript
@Column({ type: 'varchar', nullable: true })
category: string;  // 'Cloud Systems', 'Backend Architecture', etc.

@Column({ type: 'integer', default: 0 })
categoryOrder: number;

@Column({ type: 'varchar', default: 'bar' })
displayMode: 'bar' | 'dots' | 'percentage' | 'numeric';

@Column({ type: 'jsonb', nullable: true })
dotProgress: {
  filled: number;  // e.g., 8
  total: number;   // e.g., 10
};
```

---

### Phase 3: Admin Dashboard Enhancements (Week 5-6)

#### 3.1 New UI Components

**Theme Editor Pro:**
- Advanced Typography Builder
  - Multi-font selection with Google Fonts integration
  - Font pairing suggestions
  - Size scale configurator

- View Mode Manager
  - Create multiple view modes (digital, print, dark, light)
  - Per-mode color/typography overrides
  - Live preview toggle

- Decorative Elements Panel
  - ASCII art generator with preview
  - Geometric shape configurator
  - Background pattern selector
  - Watermark editor

**Design Variants Manager:**
- List all variants with preview thumbnails
- Duplicate variant feature
- Drag-and-drop reordering
- Per-variant theme override
- Layout override editor

**Advanced Section Editor:**
- Skills Category Manager
  - Create/edit categories
  - Drag skills between categories
  - Choose display mode per category

- Contact Style Selector
  - Preview different contact layouts
  - Terminal/API style configuration

- Timeline Layout Options
  - Visual layout selector
  - Tech tag management

**Metadata Editor:**
- Version/build number input
- Custom metadata fields (key-value pairs)
- Status selector
- Checksum generator (optional)

#### 3.2 User Experience Flow

1. **Create Portfolio** → Choose base template
2. **Configure Theme** → Advanced theme builder
3. **Add Content** → Projects, skills (with categories), experience
4. **Create Variants** (optional) → Design iterations
5. **Configure Interactions** → Animations, keyboard shortcuts
6. **Preview All Modes** → Digital, print, dark, light
7. **Publish** → Make live

---

### Phase 4: Public Frontend Components (Week 7-8)

#### 4.1 New Components

**ViewModeSwitcher.tsx**
```typescript
interface ViewMode {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Toggles between digital/print/dark/light modes
// Applies theme overrides dynamically
```

**DesignVariantSelector.tsx**
```typescript
// Dropdown to switch between design iterations
// Smooth transitions between variants
// Preserves scroll position
```

**ASCIIArtHeader.tsx**
```typescript
// Renders ASCII art from portfolio.branding
// Supports different styles (block, outlined, shadow)
// Responsive scaling
```

**SkillsGridCategorized.tsx**
```typescript
// Renders skills in categories
// Supports dot-based progress bars
// Grid/list layout options
```

**TerminalContact.tsx**
```typescript
// Terminal/API-style contact section
// Click-to-copy functionality
// Execute protocol animations
```

**GeometricDecorations.tsx**
```typescript
// Renders borders, frames, accents
// Position-based rendering
// CSS-based geometric shapes
```

**BackgroundPattern.tsx**
```typescript
// Technical grid, dots, lines patterns
// Configurable opacity
// Print-friendly (can be disabled in print mode)
```

**MetadataFooter.tsx**
```typescript
// Version, build, status, checksum
// Professional footer styling
// Optional in print mode
```

#### 4.2 Enhanced Layouts

**Two-Column Hybrid Layout:**
- Left: Contact, skills, metadata
- Right: Experience, education, projects
- Responsive (collapses on mobile)

**Terminal Layout:**
- Fullscreen black background
- Green/cyan terminal text
- Monospace fonts
- Scan line effects (optional)

**Print-Optimized Layout:**
- High contrast black/white
- Optimized for A4/Letter
- No animations
- QR code for portfolio URL

---

### Phase 5: Theme Presets & Templates (Week 9-10)

#### 5.1 Pre-built Themes

**1. Terminal Developer**
- Digital: Black background, green text
- Print: B&W high contrast
- ASCII art branding
- Dot-based skills
- Terminal contact style

**2. Corporate Professional**
- Clean minimal design
- Sophisticated typography
- Geometric accents
- Traditional progress bars
- Standard contact layout

**3. Creative Portfolio**
- Colorful gradients
- Large typography
- Image-heavy sections
- Carousel layouts
- Interactive hover effects

**4. Financial Tech**
- Monochrome with blue accents
- Professional grid layouts
- Technical metadata display
- Executive-level presentation

#### 5.2 Template System

```typescript
interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  defaultThemeId: string;
  defaultSections: Array<SectionConfig>;
  requiredContent: string[];  // 'projects', 'skills', etc.
  variants?: Array<{
    name: string;
    themeOverrides: object;
  }>;
}
```

---

### Phase 6: Interactive Features (Week 11-12)

#### 6.1 Keyboard Shortcuts System

**Backend:**
```typescript
@Column({ type: 'jsonb', nullable: true })
keyboardShortcuts: {
  enabled: boolean;
  shortcuts: Array<{
    key: string;
    action: 'toggleViewMode' | 'nextVariant' | 'prevVariant' | 'print' | 'copyEmail';
    description: string;
  }>;
};
```

**Frontend:**
```typescript
// useKeyboardShortcuts.ts hook
// Global event listeners
// Visual shortcut guide (press '?')
```

#### 6.2 Click-to-Copy Feature

```typescript
// Applies to contact information
// Toast notification on copy
// Visual feedback (icon change)
```

#### 6.3 Scroll Animations

```typescript
// Intersection Observer API
// Per-section animation configuration
// Respect prefers-reduced-motion
```

---

## 🔄 Backward Compatibility Strategy

### Migration Approach

**1. All new fields are nullable/optional**
- Existing portfolios continue to work unchanged
- New features are opt-in

**2. Gradual enhancement**
- Basic template → Enhanced with advanced features
- Default values for all new settings
- Admin UI shows "Pro Features" section

**3. API versioning**
- New endpoints don't affect existing ones
- Optional query params for new features
- Response includes feature flags

**4. Frontend fallbacks**
- Components check for feature availability
- Graceful degradation if features missing
- Basic layout as fallback

### Testing Matrix

- [ ] Existing portfolio still renders correctly
- [ ] New portfolio with basic features works
- [ ] New portfolio with all advanced features works
- [ ] Mixed scenarios (some advanced, some basic)
- [ ] Print mode works for all portfolios
- [ ] Public API backward compatible

---

## 📦 Implementation Phases Summary

| Phase | Duration | Focus Area | Deliverables |
|-------|----------|------------|--------------|
| 1 | 2 weeks | Extended Theme System | New DB schema, API endpoints |
| 2 | 2 weeks | Portfolio Configuration | Enhanced entities, metadata |
| 3 | 2 weeks | Admin Dashboard UI | Theme editor, variant manager |
| 4 | 2 weeks | Public Frontend | New components, layouts |
| 5 | 2 weeks | Templates & Presets | 4+ professional templates |
| 6 | 2 weeks | Interactive Features | Shortcuts, animations, copy |

**Total Estimated Time:** 12 weeks (3 months)

---

## 🎨 Design Considerations

### Flexibility vs Complexity

**Keep Flexible:**
- Allow custom CSS overrides
- Support multiple design variants
- Enable/disable features per portfolio

**Keep Simple:**
- Good defaults for everything
- Progressive disclosure in UI
- Clear documentation

### Performance

- Lazy load variant data
- Cache theme computations
- Optimize print CSS
- Minimize animation jank

### Accessibility

- Keyboard navigation for all interactions
- High contrast mode support
- Screen reader friendly
- Respect prefers-reduced-motion

---

## 🚀 Quick Start Recommendations

**MVP (Minimum Viable Product) - 4 weeks:**

1. **Week 1-2:**
   - Extended Theme System (Phase 1)
   - Database migrations
   - Basic API endpoints

2. **Week 3:**
   - Advanced typography in admin
   - View mode switcher
   - Skills categorization

3. **Week 4:**
   - ASCII art component
   - One complete manus-style template
   - Public frontend integration

**This gives you:** A working system that can create terminal-style portfolios like manus-research while keeping existing portfolios functional.

---

## 📝 Next Steps

1. **Review this plan** - Discuss priorities and timeline
2. **Setup development branch** - `feature/advanced-portfolio`
3. **Create database migration** - Start with Theme/Portfolio extensions
4. **Build Theme Editor first** - Most impactful for users
5. **One component at a time** - ASCII art → View switcher → Categories
6. **Test continuously** - Ensure backward compatibility

---

## 🎯 Success Criteria

✅ Can recreate manus-research portfolio style in CMS
✅ Existing portfolios still work perfectly
✅ Admin UI is intuitive and powerful
✅ Public portfolios perform well (< 3s load)
✅ Print mode works beautifully
✅ Mobile responsive
✅ Accessible (WCAG AA)
✅ Documentation complete

---

**Ready to start implementation?** 🚀
