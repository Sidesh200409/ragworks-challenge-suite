import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const customCardVariants = cva(
  "rounded-lg border text-card-foreground shadow-soft transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        gradient: "bg-gradient-card border-primary/20",
        interactive: "bg-card border-border hover:shadow-medium hover:border-primary/30 cursor-pointer hover:-translate-y-1",
        elevated: "bg-card border-border shadow-medium hover:shadow-large",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CustomCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customCardVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  image?: string;
  badge?: React.ReactNode;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    title, 
    description, 
    action, 
    image, 
    badge, 
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(customCardVariants({ variant, size, className }))}
        {...props}
      >
        {image && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={title || "Card image"} 
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        {badge && (
          <div className="mb-3">
            {badge}
          </div>
        )}
        
        {(title || description) && (
          <div className="space-y-2 mb-4">
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        {action && (
          <div className="flex justify-end">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CustomCard.displayName = "CustomCard";

export { CustomCard, customCardVariants };