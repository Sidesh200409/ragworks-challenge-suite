import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        gradient: "gradient-primary border-primary/20 text-primary-foreground",
        interactive: "border-border hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02]",
        outline: "border-2 border-dashed border-border bg-background",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string
  description?: string
  action?: React.ReactNode
}

const CustomCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, title, description, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-2 mb-4">
          {title && (
            <h3 className={cn(
              "text-xl font-semibold leading-none tracking-tight",
              variant === "gradient" && "text-primary-foreground"
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn(
              "text-sm",
              variant === "gradient" ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
      {action && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {action}
        </div>
      )}
    </div>
  )
)
CustomCard.displayName = "CustomCard"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { CustomCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }