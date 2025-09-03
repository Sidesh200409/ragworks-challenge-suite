import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Menu, Palette } from 'lucide-react';
import { useState } from 'react';

export const ProjectHeader = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">FE</span>
              </div>
              <div>
                <h1 className="font-semibold">Frontend Engineer Assessment</h1>
                <p className="text-xs text-muted-foreground">Ragworks AI</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              React + TypeScript
            </Badge>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              All Systems Operational
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost" 
              size="sm"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              <Palette size={16} />
              <span className="hidden sm:inline">Theme</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
              <Github size={16} />
              Source
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Deploy</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};