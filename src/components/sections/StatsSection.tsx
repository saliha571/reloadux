import { StatCounter } from "@/components/ui/StatCounter";
import styles from "./StatsSection.module.css";
import type { Stat } from "@/lib/types";

interface Props {
  stats: Stat[];
}

export function StatsSection({ stats }: Props) {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
