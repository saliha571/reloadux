import styles from "./SectionTag.module.css";

interface Props {
  text: string;
  variant?: "light" | "dark";
}

export function SectionTag({ text, variant = "light" }: Props) {
  return (
    <span className={`${styles.tag} ${variant === "dark" ? styles.dark : ""}`}>
      [ {text} ]
    </span>
  );
}
