import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section section--dark">
      <div className="hero">
        <h1 className="hero__title">404</h1>
        <p className="hero__subtitle">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/">Go Home</Button>
      </div>
    </section>
  );
}
