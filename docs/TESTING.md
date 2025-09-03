# Testing Documentation

## 🧪 Testing Strategy Overview

This Frontend Engineer assessment implements comprehensive testing strategies covering unit tests, integration tests, accessibility testing, and performance testing to ensure code quality and reliability.

## 📊 Testing Coverage Goals

- **Unit Tests**: 95%+ code coverage
- **Integration Tests**: 85%+ user flow coverage  
- **Accessibility Tests**: WCAG 2.1 AA compliance
- **Performance Tests**: Lighthouse scores 90+

## 🔧 Testing Tools & Technologies

### Core Testing Framework
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "vitest": "^0.34.0",
    "jsdom": "^22.0.0",
    "@vitest/ui": "^0.34.0"
  }
}
```

### Additional Testing Tools
- **Axe-core**: Accessibility testing
- **MSW**: API mocking for integration tests  
- **Playwright**: End-to-end testing
- **Lighthouse CI**: Performance testing

## 🧩 Unit Testing Strategy

### Component Testing Patterns

#### 1. Basic Component Rendering
```typescript
// CustomButton.test.tsx
import { render, screen } from '@testing-library/react';
import { CustomButton } from '../CustomButton';

describe('CustomButton', () => {
  it('renders button with text', () => {
    render(<CustomButton>Click me</CustomButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<CustomButton variant="gradient">Gradient</CustomButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-primary');
  });

  it('handles disabled state', () => {
    render(<CustomButton disabled>Disabled</CustomButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### 2. Interactive Behavior Testing
```typescript
// CustomInput.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomInput } from '../CustomInput';

describe('CustomInput', () => {
  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<CustomInput onChange={handleChange} placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    await user.type(input, 'Hello World');
    
    expect(handleChange).toHaveBeenCalledTimes(11); // One per character
    expect(input).toHaveValue('Hello World');
  });

  it('displays validation states correctly', () => {
    render(
      <CustomInput 
        variant="error" 
        helper="This field is required" 
        placeholder="Email"
      />
    );
    
    expect(screen.getByText('This field is required')).toHaveClass('text-destructive');
  });
});
```

#### 3. Modal Testing
```typescript
// CustomModal.test.tsx
describe('CustomModal', () => {
  it('opens and closes correctly', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    
    render(
      <CustomModal 
        open={true} 
        onOpenChange={handleOpenChange}
        title="Test Modal"
      >
        <p>Modal content</p>
      </CustomModal>
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    
    // Test close button
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('traps focus correctly', () => {
    render(
      <CustomModal open={true} title="Focus Test">
        <button>First Button</button>
        <button>Second Button</button>
      </CustomModal>
    );
    
    // Focus should be trapped within modal
    const firstButton = screen.getByText('First Button');
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    expect(document.activeElement).toBe(closeButton);
  });
});
```

## 🔄 Integration Testing

### E-commerce Flow Testing
```typescript
// EcommerceDashboard.integration.test.tsx
describe('E-commerce User Flows', () => {
  it('completes full shopping experience', async () => {
    const user = userEvent.setup();
    
    render(<EcommerceDashboard />);
    
    // Search for product
    const searchInput = screen.getByPlaceholderText('Search products...');
    await user.type(searchInput, 'MacBook');
    
    // Add to cart
    const addToCartButton = screen.getByText('Add to Cart');
    await user.click(addToCartButton);
    
    // Navigate to cart
    const cartTab = screen.getByRole('tab', { name: /shopping cart/i });
    await user.click(cartTab);
    
    // Verify item in cart
    expect(screen.getByText('MacBook Pro 16"')).toBeInTheDocument();
    
    // Update quantity
    const increaseButton = screen.getByRole('button', { name: /\+/ });
    await user.click(increaseButton);
    
    // Proceed to checkout
    const checkoutButton = screen.getByText('Proceed to Checkout');
    await user.click(checkoutButton);
    
    // Verify checkout form
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  });

  it('handles product filtering correctly', async () => {
    const user = userEvent.setup();
    
    render(<EcommerceDashboard />);
    
    // Filter by category
    const electronicsFilter = screen.getByText('Electronics');
    await user.click(electronicsFilter);
    
    // Verify filtered results
    const products = screen.getAllByText(/MacBook|iPhone/);
    expect(products.length).toBeGreaterThan(0);
    
    // Search within category
    const searchInput = screen.getByPlaceholderText('Search products...');
    await user.type(searchInput, 'iPhone');
    
    // Verify search results
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.queryByText('MacBook Pro 16"')).not.toBeInTheDocument();
  });
});
```

### Component Library Integration
```typescript
// ComponentLibrary.integration.test.tsx
describe('Component Library Integration', () => {
  it('demonstrates all component variants', async () => {
    const user = userEvent.setup();
    
    render(<ComponentLibrary />);
    
    // Test button variants
    expect(screen.getByText('Gradient')).toHaveClass('bg-gradient-primary');
    expect(screen.getByText('Glow Effect')).toHaveClass('shadow-glow');
    
    // Test input validation
    const errorInput = screen.getByDisplayValue('Invalid input');
    expect(errorInput).toHaveClass('border-destructive');
    
    // Test modal functionality
    const openModalButton = screen.getByText('Open Modal Demo');
    await user.click(openModalButton);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

## ♿ Accessibility Testing

### ARIA Testing
```typescript
// accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentLibrary />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(<ComponentLibrary />);
    
    // Tab through interactive elements
    await user.tab();
    expect(document.activeElement).toHaveAttribute('role', 'tab');
    
    await user.tab();
    expect(document.activeElement).toHaveAttribute('role', 'button');
  });

  it('provides screen reader support', () => {
    render(
      <CustomButton aria-label="Save document">
        <SaveIcon />
      </CustomButton>
    );
    
    const button = screen.getByRole('button', { name: 'Save document' });
    expect(button).toHaveAttribute('aria-label', 'Save document');
  });
});
```

### Focus Management Testing
```typescript
describe('Focus Management', () => {
  it('manages focus in modal correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <button>Outside Button</button>
        <CustomModal open={true} title="Focus Test">
          <input placeholder="First Input" />
          <button>Modal Button</button>
        </CustomModal>
      </div>
    );
    
    // Focus should be trapped in modal
    await user.tab();
    expect(document.activeElement).toHaveAttribute('placeholder', 'First Input');
    
    await user.tab();
    expect(document.activeElement).toHaveTextContent('Modal Button');
    
    // Tabbing again should cycle back to first element
    await user.tab();
    expect(document.activeElement).toHaveAttribute('aria-label', 'Close');
  });
});
```

## 🚀 Performance Testing

### Bundle Size Testing
```typescript
// performance.test.ts
describe('Performance Metrics', () => {
  it('maintains acceptable bundle sizes', async () => {
    const bundleStats = await import('../dist/stats.json');
    
    const mainChunk = bundleStats.chunks.find(chunk => 
      chunk.names.includes('main')
    );
    
    // Main bundle should be under 500KB
    expect(mainChunk.size).toBeLessThan(500 * 1024);
  });

  it('lazy loads components correctly', async () => {
    const { container } = render(<App />);
    
    // Initially, lazy components should not be loaded
    expect(container.querySelector('[data-testid="lazy-component"]')).toBeNull();
    
    // After triggering lazy load
    const loadButton = screen.getByText('Load Component Dynamically');
    await userEvent.click(loadButton);
    
    // Component should be loaded
    await waitFor(() => {
      expect(screen.getByText('Lazy Loaded Component')).toBeInTheDocument();
    });
  });
});
```

### Core Web Vitals Testing
```typescript
// webVitals.test.ts
describe('Web Vitals Performance', () => {
  it('measures LCP correctly', (done) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      
      // LCP should be under 2.5 seconds
      expect(lcp.startTime).toBeLessThan(2500);
      done();
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    
    render(<App />);
  });

  it('has minimal layout shift', (done) => {
    let cls = 0;
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
      
      // CLS should be under 0.1
      expect(cls).toBeLessThan(0.1);
      done();
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    
    render(<EcommerceDashboard />);
  });
});
```

## 🔧 Test Utilities & Helpers

### Custom Render Function
```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Mock Factories
```typescript
// mocks/factories.ts
export const createMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: '/test-image.jpg',
  rating: 4.5,
  category: 'Electronics',
  inStock: true,
  description: 'Test product description',
  ...overrides,
});

export const createMockCartItem = (overrides = {}) => ({
  ...createMockProduct(),
  quantity: 1,
  ...overrides,
});
```

## 📋 Test Scripts Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:accessibility": "axe-cli http://localhost:3000",
    "test:lighthouse": "lighthouse-ci autorun"
  }
}
```

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
    },
  },
});
```

## 🎯 Testing Best Practices

### 1. Test Structure (AAA Pattern)
```typescript
describe('Component', () => {
  it('should behave correctly', async () => {
    // Arrange
    const props = { variant: 'primary' };
    const user = userEvent.setup();
    
    // Act
    render(<Component {...props} />);
    await user.click(screen.getByRole('button'));
    
    // Assert
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### 2. Test Naming Convention
- **Unit Tests**: `Component.test.tsx`
- **Integration Tests**: `Feature.integration.test.tsx`  
- **E2E Tests**: `userFlow.e2e.test.ts`
- **Accessibility**: `accessibility.test.tsx`

### 3. Testing Priorities
1. **Critical User Paths**: Authentication, checkout, core features
2. **Component API**: Props, events, state changes
3. **Error Handling**: Error states, edge cases
4. **Accessibility**: Keyboard navigation, screen readers
5. **Performance**: Bundle size, loading times

## 📊 Test Reporting

### Coverage Reports
```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Continuous Integration
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
      - run: npm run test:lighthouse
```

This comprehensive testing strategy ensures code quality, accessibility compliance, and performance standards for the Frontend Engineer assessment.