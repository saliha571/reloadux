import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  children,
  href,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
