import styles from "./NextStepsSection.module.css";
import type { NextStep } from "@/lib/types";

interface Props {
  steps: NextStep[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string }[];
  };
}

export function NextStepsSection({ steps, contactInfo }: Props) {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.steps}>
            <h3 className={styles.heading}>Next Steps</h3>
            {steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <span className={styles.number}>{step.number}</span>
                <p className={styles.text}>{step.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.contact}>
            <h3 className={styles.heading}>Hate contact forms? Direct Contact!</h3>
            <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className={styles.link}>
              {contactInfo.phone}
            </a>
            <a href={`mailto:${contactInfo.email}`} className={styles.link}>
              {contactInfo.email}
            </a>
            {contactInfo.team.map((person) => (
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.person}
              >
                <span className={styles.personName}>{person.name}</span>
                <span className={styles.personRole}>{person.role}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
