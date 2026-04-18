import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95";

    const variants = {
      primary:
        "bg-lumi-pink text-white hover:bg-pink-500 focus:ring-lumi-pink shadow-md hover:shadow-lg",
      secondary:
        "bg-lumi-yellow text-gray-900 hover:bg-yellow-400 focus:ring-lumi-yellow shadow-md hover:shadow-lg",
      outline:
        "border-2 border-lumi-pink text-lumi-pink bg-transparent hover:bg-lumi-pink hover:text-white focus:ring-lumi-pink",
      ghost:
        "text-lumi-pink bg-transparent hover:bg-pink-50 focus:ring-lumi-pink",
      danger:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 gap-1.5",
      md: "text-base px-6 py-3 gap-2",
      lg: "text-lg px-8 py-4 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
