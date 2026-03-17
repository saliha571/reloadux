import Link from "next/link";
import styles from "./FlairButton.module.css";

interface FlairButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

const ArrowIcon = () => (
  <svg
    className={styles.arrow}
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 19"
    fill="none"
  >
    <g clipPath="url(#clip0_flair)">
      <path d="M5.41602 13H20.5827" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.084 19.5L20.584 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.084 6.5L20.584 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_flair">
        <rect width="26" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export function FlairButton({
  href,
  children,
  size = "md",
  variant = "light",
  showArrow = true,
  className = "",
  onClick,
}: FlairButtonProps) {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";
  const variantClass = variant === "dark" ? styles.dark : "";

  return (
    <Link
      href={href}
      className={`${styles.btn} ${sizeClass} ${variantClass} ${className}`.trim()}
      onClick={onClick}
    >
      <span className={styles.flair} />
      <span className={styles.label}>
        {children}
        {showArrow && <ArrowIcon />}
      </span>
    </Link>
  );
}
