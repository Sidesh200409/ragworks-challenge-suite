import { useState } from 'react';
import { CustomButton } from './ui/CustomButton';
import { CustomInput } from './ui/CustomInput';
import { CustomModal } from './ui/CustomModal';
import { CustomCard } from './ui/CustomCard';
import { 
  Play, 
  Code, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Search, 
  Mail, 
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export const ComponentLibrary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Component Library Development
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          A comprehensive collection of reusable, accessible, and fully typed React components 
          built with modern web standards and best practices.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">React 18+</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">TypeScript</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">WCAG 2.1 AA</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Storybook</span>
        </div>
      </div>

      {/* Button Components */}
      <section className="space-y-6">
        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Play className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">Button Components</h2>
          </div>
          
          <div className="space-y-8">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton variant="default">Default</CustomButton>
                <CustomButton variant="secondary">Secondary</CustomButton>
                <CustomButton variant="outline">Outline</CustomButton>
                <CustomButton variant="ghost">Ghost</CustomButton>
                <CustomButton variant="gradient">Gradient</CustomButton>
                <CustomButton variant="glow">Glow Effect</CustomButton>
                <CustomButton variant="success">Success</CustomButton>
                <CustomButton variant="warning">Warning</CustomButton>
                <CustomButton variant="destructive">Destructive</CustomButton>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <CustomButton size="sm">Small</CustomButton>
                <CustomButton size="default">Default</CustomButton>
                <CustomButton size="lg">Large</CustomButton>
                <CustomButton size="xl">Extra Large</CustomButton>
              </div>
            </div>

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">States & Icons</h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton loading>Loading</CustomButton>
                <CustomButton disabled>Disabled</CustomButton>
                <CustomButton leftIcon={<CheckCircle size={16} />}>With Left Icon</CustomButton>
                <CustomButton rightIcon={<AlertCircle size={16} />}>With Right Icon</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Input Components */}
      <section className="space-y-6">
        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">Input Components</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Basic Inputs</h3>
              <div className="space-y-4">
                <CustomInput placeholder="Default input" />
                <CustomInput 
                  placeholder="Search..." 
                  leftIcon={<Search size={16} />}
                />
                <CustomInput 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  leftIcon={<Lock size={16} />}
                  rightIcon={
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Validation States</h3>
              <div className="space-y-4">
                <CustomInput 
                  placeholder="Valid input"
                  variant="success"
                  helper="This input is valid"
                />
                <CustomInput 
                  placeholder="Invalid input"
                  variant="error"
                  helper="Please enter a valid value"
                />
                <CustomInput 
                  placeholder="Email address"
                  leftIcon={<Mail size={16} />}
                  variant="warning"
                  helper="Email format might be incorrect"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Components */}
      <section className="space-y-6">
        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Info className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">Modal Components</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Accessible modal dialogs with proper focus management and keyboard navigation.
            </p>
            <div className="flex gap-4">
              <CustomButton onClick={() => setIsModalOpen(true)}>
                Open Demo Modal
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Card Components */}
      <section className="space-y-6">
        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">Card Components</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomCard 
              variant="default"
              title="Default Card"
              description="Standard card with basic styling and content layout."
              action={<CustomButton size="sm">View Details</CustomButton>}
            />
            <CustomCard 
              variant="gradient"
              title="Gradient Card"
              description="Enhanced card with beautiful gradient background effects."
              action={<CustomButton size="sm" variant="secondary">Explore</CustomButton>}
            />
            <CustomCard 
              variant="interactive"
              title="Interactive Card"
              description="Clickable card with hover effects and smooth transitions."
              onClick={() => console.log('Card clicked')}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <div className="border border-border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-success">Accessibility</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  WCAG 2.1 AA compliant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  Full keyboard navigation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  Screen reader support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  Proper ARIA attributes
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Development</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  Fully typed with TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  Comprehensive unit tests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  Storybook documentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  Modern React patterns
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Component Library Demo"
        description="This modal demonstrates the accessibility and functionality of our modal component system."
      >
        <div className="space-y-6">
          <p className="text-muted-foreground">
            This modal includes proper focus management, keyboard navigation (try pressing Tab and Escape), 
            and ARIA attributes for optimal accessibility and screen reader support.
          </p>
          <div className="space-y-4">
            <h4 className="font-medium">Features demonstrated:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Focus trapping within the modal</li>
              <li>• Escape key closes the modal</li>
              <li>• Backdrop click closes the modal</li>
              <li>• Proper ARIA labels and descriptions</li>
              <li>• Smooth animations and transitions</li>
            </ul>
          </div>
          <div className="flex gap-3 pt-4">
            <CustomButton size="sm" onClick={() => setIsModalOpen(false)}>
              Close Modal
            </CustomButton>
            <CustomButton size="sm" variant="outline">
              Secondary Action
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};