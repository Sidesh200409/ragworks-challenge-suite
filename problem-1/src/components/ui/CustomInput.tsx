import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        success: "border-success focus-visible:ring-success",
        error: "border-error focus-visible:ring-error",
        warning: "border-warning focus-visible:ring-warning",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  helper?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, leftIcon, rightIcon, helper, ...props }, ref) => {
    const hasError = variant === "error"
    const hasSuccess = variant === "success"
    const hasWarning = variant === "warning"

    return (
      <div className="space-y-2">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              inputVariants({ variant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {helper && (
          <p className={cn(
            "text-xs",
            hasError && "text-error",
            hasSuccess && "text-success",
            hasWarning && "text-warning",
            !hasError && !hasSuccess && !hasWarning && "text-muted-foreground"
          )}>
            {helper}
          </p>
        )}
      </div>
    )
  }
)
CustomInput.displayName = "CustomInput"

export { CustomInput, inputVariants }