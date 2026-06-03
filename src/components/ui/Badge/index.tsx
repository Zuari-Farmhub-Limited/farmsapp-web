import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:       "bg-primary-100 text-primary",
        accent:        "bg-amber-100 text-amber-700",
        success:       "bg-green-100 text-green-700",
        danger:        "bg-red-100 text-danger",
        info:          "bg-blue-100 text-info",
        outline:       "border border-border text-gray-600",
        homeDelivery:  "bg-green-50 text-green-700 border border-green-200",
        discount:      "bg-accent text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
