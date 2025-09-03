import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomModal = DialogPrimitive.Root;

const CustomModalTrigger = DialogPrimitive.Trigger;

const CustomModalPortal = DialogPrimitive.Portal;

const CustomModalClose = DialogPrimitive.Close;

const CustomModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
CustomModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const CustomModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: "sm" | "default" | "lg" | "xl";
  }
>(({ className, children, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <CustomModalPortal>
      <CustomModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-large duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        <CustomModalClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </CustomModalClose>
      </DialogPrimitive.Content>
    </CustomModalPortal>
  );
});
CustomModalContent.displayName = DialogPrimitive.Content.displayName;

const CustomModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
CustomModalHeader.displayName = "CustomModalHeader";

const CustomModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
CustomModalFooter.displayName = "CustomModalFooter";

const CustomModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CustomModalTitle.displayName = DialogPrimitive.Title.displayName;

const CustomModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CustomModalDescription.displayName = DialogPrimitive.Description.displayName;

interface CustomModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: "sm" | "default" | "lg" | "xl";
  children?: React.ReactNode;
}

const CustomModalComponent = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  size = "default",
  children 
}: CustomModalProps) => {
  return (
    <CustomModal open={open} onOpenChange={onOpenChange}>
      <CustomModalContent size={size}>
        <CustomModalHeader>
          {title && <CustomModalTitle>{title}</CustomModalTitle>}
          {description && <CustomModalDescription>{description}</CustomModalDescription>}
        </CustomModalHeader>
        {children}
      </CustomModalContent>
    </CustomModal>
  );
};

export {
  CustomModal,
  CustomModalPortal,
  CustomModalOverlay,
  CustomModalTrigger,
  CustomModalClose,
  CustomModalContent,
  CustomModalHeader,
  CustomModalFooter,
  CustomModalTitle,
  CustomModalDescription,
};

export default CustomModalComponent;