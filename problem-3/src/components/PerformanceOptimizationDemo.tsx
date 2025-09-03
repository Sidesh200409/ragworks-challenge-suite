import { useState, Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { PerformanceMetrics } from './PerformanceMetrics';
import { BundleAnalyzer } from './BundleAnalyzer';
import { ImageOptimization } from './ImageOptimization';
import { 
  Zap, 
  BarChart3, 
  Package, 
  Image as ImageIcon, 
  Code, 
  Gauge,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Lazy load heavy components
const CodeSplittingDemo = lazy(() => import('./CodeSplittingDemo'));
const LazyLoadingDemo = lazy(() => import('./LazyLoadingDemo'));
const MemoryOptimizationDemo = lazy(() => import('./MemoryOptimizationDemo'));

export const PerformanceOptimizationDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Performance Optimization</h1>
              <p className="text-muted-foreground">Comprehensive React app optimization techniques</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Gauge size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="bundle" className="flex items-center gap-2">
              <Package size={16} />
              Bundle
            </TabsTrigger>
            <TabsTrigger value="code-splitting" className="flex items-center gap-2">
              <Code size={16} />
              Code Splitting
            </TabsTrigger>
            <TabsTrigger value="lazy-loading" className="flex items-center gap-2">
              <ImageIcon size={16} />
              Lazy Loading
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon size={16} />
              Images
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <Zap size={16} />
              Memory
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Performance Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-green-500" />
                    Performance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-500 mb-2">95</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">First Contentful Paint: 1.2s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Largest Contentful Paint: 2.1s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Cumulative Layout Shift: 0.05</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bundle Size */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    Bundle Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Before</span>
                      <Badge variant="destructive">1,240 KB</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">After</span>
                      <Badge variant="default">680 KB</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Reduction</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">45%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Accessibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-500 mb-2">98</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">ARIA labels complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Color contrast 4.5:1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Keyboard navigation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Optimization Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Techniques Implemented</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">✅ Implemented</h4>
                    <div className="space-y-2">
                      {[
                        'Code splitting with React.lazy()',
                        'Dynamic imports for heavy components',
                        'Image lazy loading and optimization',
                        'Bundle size analysis and reduction',
                        'Memoization with React.memo()',
                        'Efficient re-rendering strategies',
                        'Web Vitals monitoring',
                        'Service Worker caching',
                        'Tree shaking optimization',
                        'CSS-in-JS optimization'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-600">🚀 Performance Gains</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">First Load Time</span>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">3.2s</div>
                          <div className="text-sm font-semibold text-green-600">1.8s</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Bundle Size</span>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">1.24MB</div>
                          <div className="text-sm font-semibold text-green-600">680KB</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Lighthouse Score</span>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">72</div>
                          <div className="text-sm font-semibold text-green-600">95</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={() => window.open('https://pagespeed.web.dev/', '_blank')}>
                    Run PageSpeed Insights
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('metrics')}>
                    View Real-time Metrics
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('bundle')}>
                    Analyze Bundle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <PerformanceMetrics />
          </TabsContent>

          {/* Bundle Analysis Tab */}
          <TabsContent value="bundle" className="space-y-6">
            <BundleAnalyzer />
          </TabsContent>

          {/* Code Splitting Tab */}
          <TabsContent value="code-splitting" className="space-y-6">
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <CodeSplittingDemo />
            </Suspense>
          </TabsContent>

          {/* Lazy Loading Tab */}
          <TabsContent value="lazy-loading" className="space-y-6">
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <LazyLoadingDemo />
            </Suspense>
          </TabsContent>

          {/* Image Optimization Tab */}
          <TabsContent value="images" className="space-y-6">
            <ImageOptimization />
          </TabsContent>

          {/* Memory Optimization Tab */}
          <TabsContent value="memory" className="space-y-6">
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <MemoryOptimizationDemo />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};