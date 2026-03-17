import styles from "./CarouselDots.module.css";

interface CarouselDotsProps {
  count: number;
  active: number;
  onDot: (index: number) => void;
  direction?: "horizontal" | "vertical";
  label?: string;
}

export function CarouselDots({
  count,
  active,
  onDot,
  direction = "vertical",
  label = "slide",
}: CarouselDotsProps) {
  return (
    <div
      className={`${styles.dots} ${direction === "horizontal" ? styles.horizontal : styles.vertical}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          className={`${styles.dot} ${i === active ? styles.active : ""}`}
          onClick={() => onDot(i)}
          aria-label={`Go to ${label} ${i + 1}`}
        />
      ))}
    </div>
  );
}
