import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "new" | "sale" | "bestseller" | "default";
  className?: string;
}

export default function Badge({ label, variant = "default", className }: BadgeProps) {
  const variants = {
    new: "bg-lumi-yellow text-gray-900",
    sale: "bg-red-500 text-white",
    bestseller: "bg-lumi-pink text-white",
    default: "bg-lumi-lilac text-white",
  };

  return (
    <span
      className={cn(
        "inline-block text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
