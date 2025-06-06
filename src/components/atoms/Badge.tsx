import { twMerge } from "tailwind-merge";

export type BadgeProps = {
  text: string;
  variant: "primary" | "success" | "warning" | "danger";
  className?: string;
};

export default function Badge({ text, variant, className }: BadgeProps) {
  const variants = {
    danger: {
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    warning: {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
    },
    success: {
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    primary: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset",
        variants[variant].bgColor,
        variants[variant].textColor,
        className
      )}
    >
      {text}
    </span>
  );
}
