"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  helperText?:string;
  startIcon?: React.ReactNode;
  endIcon?:   React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, startIcon, endIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
            {label}
          </label>
        ) : null}

        <div className="relative flex items-center">
          {startIcon ? (
            <span className="absolute left-3 text-gray-400">{startIcon}</span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "disabled:bg-surface disabled:cursor-not-allowed",
              error && "border-danger focus:ring-danger",
              startIcon && "pl-10",
              endIcon   && "pr-10",
              className,
            )}
            {...props}
          />

          {endIcon ? (
            <span className="absolute right-3 text-gray-400">{endIcon}</span>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs text-danger">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
