# Design System Validator

A comprehensive enterprise-grade CSS validation and design token management tool built with React, TypeScript, and Material-UI. This application ensures WCAG AAA compliance and provides intelligent design system validation for modern web applications.

## 🚀 Features

### Core Functionality
- **Single File Validation**: Upload and validate individual CSS files against design tokens
- **Project-Wide Validation**: Validate entire codebases with multiple CSS files
- **Real-time Analysis**: Instant feedback on design token compliance
- **Auto-Fix Suggestions**: Automated corrections for common CSS issues
- **Design Style Library**: Pre-built design systems optimized for different project types

### Design Token Management
- **Color Palette Management**: WCAG-compliant color combinations with accessibility ratings
- **Typography Standards**: Consistent font weights, sizes, and spacing
- **Spacing System**: Standardized spacing tokens for consistent layouts
- **Border Radius System**: Unified corner radius values
- **Token Editor**: Interactive design token customization

### Compliance & Accessibility
- **WCAG AAA Compliance**: Highest accessibility standards
- **Contrast Ratio Validation**: Automatic contrast checking
- **Color Blindness Support**: Validation for various color vision deficiencies
- **Screen Reader Optimization**: Semantic HTML and ARIA compliance

### Enterprise Features
- **Multi-Project Support**: Different validation rules for apps, dashboards, landing pages, portfolios, and e-commerce
- **Export Capabilities**: Download validated and fixed CSS files
- **Batch Processing**: Validate multiple files simultaneously
- **Audit Reports**: Detailed compliance reports with confidence scores

## 🏗️ Architecture

### Clean Architecture Principles
This application follows FAANG-level clean architecture patterns:

#### Presentation Layer
- **Material-UI Components**: Strictly uses MUI for consistent, accessible UI
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Centralized theming with dark/light mode support

#### Domain Layer
- **Business Logic**: Pure functions for validation algorithms
- **Design Token System**: Centralized token management
- **Type Safety**: Full TypeScript coverage with strict typing

#### Infrastructure Layer
- **File Processing**: Robust file upload and parsing
- **Validation Engine**: High-performance CSS analysis
- **Export System**: Multiple output formats

### Component Structure
```
src/
├── components/          # UI components (MUI-based)
├── hooks/              # Custom React hooks
├── utils/              # Business logic utilities
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI) v9
- **Build Tool**: Vite
- **Styling**: MUI Theme System (Tailwind removed for strict MUI compliance)
- **Icons**: Material-UI Icons
- **State Management**: React Hooks with custom state management
- **File Processing**: Browser File API
- **Code Quality**: ESLint with TypeScript rules

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd css-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Single File Validation
1. Select "Single File" tab
2. Choose your project type (App, Dashboard, Landing Page, etc.)
3. Upload a CSS file via drag-and-drop or file picker
4. Review validation results and apply fixes

### Project Validation
1. Select "Full Project" tab
2. Upload multiple CSS files or a project directory
3. Apply design styles from the library
4. Review comprehensive project reports

### Design Token Management
1. Use the Color Guide Panel to select WCAG-compliant palettes
2. Customize tokens in the Token Editor
3. Apply styles to uploaded projects

## 🔧 Configuration

### Design Styles
The application includes pre-configured design styles optimized for different project types:

- **Minimalist**: Clean, white-space heavy design
- **Corporate Professional**: Trust-building business aesthetics
- **Modern Enterprise**: Scalable component-based design
- **And more...**

### Validation Rules
- **Color Contrast**: WCAG AA/AAA compliance
- **Typography Scale**: Consistent sizing and weights
- **Spacing System**: Standardized margins and padding
- **Border Radius**: Unified corner styling

## 📊 Validation Engine

### CSS Analysis Features
- **Selector Validation**: Checks for semantic HTML usage
- **Property Compliance**: Validates against design token standards
- **Value Optimization**: Suggests modern CSS units and values
- **Performance Checks**: Identifies inefficient CSS patterns

### Confidence Scoring
- **High Confidence (80%+)**: Automated fixes available
- **Medium Confidence (50-79%)**: Manual review recommended
- **Low Confidence (<50%)**: Requires expert review

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use MUI components exclusively for UI
- Maintain clean architecture separation
- Write comprehensive tests
- Follow semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- The React community for best practices and patterns
- WCAG guidelines for accessibility standards
- FAANG engineering principles for architecture inspiration

## 📞 Support

For support, email support@example.com or join our Slack community.

---

**Built with ❤️ for enterprise design systems**
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
