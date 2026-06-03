"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:   "bg-primary text-white hover:bg-primary-700 active:bg-primary-800",
        secondary: "bg-surface text-primary border border-primary hover:bg-primary-50",
        accent:    "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark",
        ghost:     "text-primary hover:bg-primary-50",
        danger:    "bg-danger text-white hover:opacity-90",
        outline:   "border border-border text-gray-700 hover:bg-surface",
      },
      size: {
        sm:   "h-8  px-3 text-sm",
        md:   "h-10 px-4 text-sm",
        lg:   "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant:   "primary",
      size:      "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? children : (
          <>
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {children}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
