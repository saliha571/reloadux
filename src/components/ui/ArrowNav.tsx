import styles from "./ArrowNav.module.css";

interface ArrowNavProps {
  onPrev: () => void;
  onNext: () => void;
  size?: number;
  className?: string;
}

export function ArrowNav({ onPrev, onNext, size = 40, className = "" }: ArrowNavProps) {
  return (
    <div className={`${styles.arrows} ${className}`.trim()}>
      <button
        className={styles.arrow}
        onClick={onPrev}
        aria-label="Previous"
        style={{ width: size, height: size }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className={styles.arrow}
        onClick={onNext}
        aria-label="Next"
        style={{ width: size, height: size }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
