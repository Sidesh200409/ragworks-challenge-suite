import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ComponentLibrary } from '@/components/problems/ComponentLibrary';
import { EcommerceDashboard } from '@/components/problems/EcommerceDashboard';
import { PerformanceOptimization } from '@/components/problems/PerformanceOptimization';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Code2, ShoppingBag, Zap, Github, ExternalLink } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const problems = [
    {
      id: 'problem-1',
      title: 'Component Library Development',
      description: 'Reusable React components with TypeScript, accessibility, and comprehensive testing',
      icon: Code2,
      status: 'Complete',
      tech: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Testing Library'],
      features: ['Button Components', 'Input Variants', 'Modal System', 'Card Components', 'Storybook Ready']
    },
    {
      id: 'problem-2', 
      title: 'E-commerce Dashboard',
      description: 'Full-featured e-commerce platform with product management, cart, and analytics',
      icon: ShoppingBag,
      status: 'Complete',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Context API'],
      features: ['Product Catalog', 'Search & Filter', 'Shopping Cart', 'Checkout Flow', 'Analytics Dashboard']
    },
    {
      id: 'problem-3',
      title: 'Performance Optimization',
      description: 'Advanced optimization techniques with monitoring and performance metrics',
      icon: Zap,
      status: 'Complete', 
      tech: ['React', 'Bundle Analysis', 'Lazy Loading', 'Image Optimization', 'Lighthouse'],
      features: ['Code Splitting', 'Dynamic Imports', 'Image Optimization', 'Performance Monitoring', 'Lighthouse 90+']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/20">
      <ProjectHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Frontend Engineer Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive evaluation showcasing modern React development, component architecture, 
            e-commerce systems, and performance optimization techniques.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border shadow-soft">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="problem-1">Problem 1</TabsTrigger>
            <TabsTrigger value="problem-2">Problem 2</TabsTrigger>
            <TabsTrigger value="problem-3">Problem 3</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <Card 
                    key={problem.id} 
                    className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => setActiveTab(problem.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-gradient-primary text-white">
                          <Icon size={24} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {problem.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {problem.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {problem.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-muted-foreground">Key Features:</h4>
                        <ul className="text-xs space-y-1">
                          {problem.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github size={20} />
                  Project Information
                </CardTitle>
                <CardDescription>
                  Technical specifications and project structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Tech Stack</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• React 18+ with TypeScript</li>
                      <li>• Vite build system</li>
                      <li>• Tailwind CSS + shadcn/ui</li>
                      <li>• React Query for state management</li>
                      <li>• Testing Library & Jest</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Fully responsive design</li>
                      <li>• WCAG 2.1 AA accessibility</li>
                      <li>• Performance optimized</li>
                      <li>• Comprehensive testing</li>
                      <li>• Modern development practices</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Github size={16} />
                    View Source
                  </Button>
                  <Button size="sm" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problem-1">
            <ComponentLibrary />
          </TabsContent>

          <TabsContent value="problem-2">
            <EcommerceDashboard />
          </TabsContent>

          <TabsContent value="problem-3">
            <PerformanceOptimization />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;