# Problem 1: Component Library Development

A comprehensive React component library built with modern web standards, featuring reusable, accessible, and fully typed components.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Components Included

### CustomButton
- **Variants**: default, secondary, outline, ghost, gradient, glow, success, warning, destructive
- **Sizes**: sm, default, lg, xl
- **Features**: Loading states, left/right icons, full TypeScript support
- **Accessibility**: ARIA labels, keyboard navigation, focus management

### CustomInput
- **Variants**: default, success, error, warning
- **Features**: Left/right icons, helper text, validation states
- **Accessibility**: Proper labeling, error announcements

### CustomModal
- **Features**: Focus trapping, keyboard navigation (ESC to close)
- **Accessibility**: ARIA dialog, focus management, backdrop click
- **Customization**: Title, description, custom content

### CustomCard
- **Variants**: default, gradient, interactive, outline
- **Features**: Title, description, action buttons
- **Responsive**: Mobile-first design

## 🎨 Design System

Built on a comprehensive design system with:
- HSL-based color tokens for better manipulation
- Semantic color naming (primary, secondary, success, warning, error)
- Consistent spacing and typography scales
- Dark/light mode support
- CSS custom properties for theming

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full tab-based navigation
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: 4.5:1 minimum ratio maintained

## 🧪 Testing

```bash
npm test              # Run unit tests
npm run test:coverage # Generate coverage report
```

### Coverage Targets
- Unit Tests: 95% coverage
- Integration Tests: 87% coverage
- E2E Tests included for critical user flows

## 📚 Storybook Documentation

```bash
npm run storybook
```

Interactive component documentation with:
- All variants and props documented
- Usage examples and code snippets
- Accessibility testing integration
- Live playground for testing

## 🛠️ Development

### Technologies Used
- **React 18+** with concurrent features
- **TypeScript** with strict mode
- **Tailwind CSS** with custom design system
- **Radix UI** for accessible primitives
- **CVA** (Class Variance Authority) for variant management

### File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   ├── CustomModal.tsx
│   │   └── CustomCard.tsx
│   └── ComponentLibrary.tsx
├── lib/
│   └── utils.ts
└── styles/
    └── index.css
```

## 📋 Component API

### Button Props
```typescript
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'glow' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}
```

### Input Props
```typescript
interface InputProps {
  variant?: 'default' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'default' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  helper?: string
  placeholder?: string
  type?: string
}
```

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📄 License

MIT License - Built for Ragworks AI Frontend Engineer Assessment