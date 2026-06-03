"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open:        boolean;
  onClose:     () => void;
  title?:      string;
  description?:string;
  children:    React.ReactNode;
  className?:  string;
}

function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-xl bg-white p-6 shadow-modal",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {title ? (
                <Dialog.Title className="text-lg font-bold text-gray-900">
                  {title}
                </Dialog.Title>
              ) : null}
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-gray-500">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-surface hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { Modal };
