import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const customInputVariants = cva(
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        success: "border-success focus-visible:ring-success",
        error: "border-destructive focus-visible:ring-destructive",
        warning: "border-warning focus-visible:ring-warning",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof customInputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helper?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, variant, size, leftIcon, rightIcon, helper, ...props }, ref) => {
    const inputClasses = cn(
      customInputVariants({ variant, size }),
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    const helperTextClasses = cn(
      "text-xs mt-1",
      variant === "success" && "text-success",
      variant === "error" && "text-destructive", 
      variant === "warning" && "text-warning",
      variant === "default" && "text-muted-foreground"
    );

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          className={inputClasses}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        {helper && (
          <p className={helperTextClasses}>
            {helper}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput, customInputVariants };