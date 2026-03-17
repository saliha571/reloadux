import Image from "next/image";
import styles from "./TeamGrid.module.css";
import type { TeamMember } from "@/lib/types";

interface Props {
  team: TeamMember[];
}

export function TeamGrid({ team }: Props) {
  return (
    <section className="section section--light">
      <div className="container">
        <h2 className={styles.header}>Meet the Team</h2>
        <div className={styles.grid}>
          {team.map((member) => (
            <div key={member.name} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image src={member.image} alt={member.name} fill className={styles.image} />
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
