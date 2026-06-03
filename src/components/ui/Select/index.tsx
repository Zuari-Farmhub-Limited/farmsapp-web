"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options:      SelectOption[];
  value?:       string;
  onChange?:    (value: string) => void;
  placeholder?: string;
  disabled?:    boolean;
  className?:   string;
}

function Select({ options, value, onChange, placeholder = "Select", disabled, className }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange} disabled={disabled}>
      <RadixSelect.Trigger
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDown size={16} className="text-gray-400" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-white shadow-card"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm outline-none hover:bg-surface data-[highlighted]:bg-surface data-[state=checked]:text-primary"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <Check size={14} />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export { Select };
