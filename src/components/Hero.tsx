import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/utils/format';

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-dark opacity-20" aria-hidden="true" />

      <div
        className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-500/15 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col items-center py-24 text-center lg:py-36">

        {/* Badge */}
        <div
          className={cx(
            "mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          🚀 Trusted by growing businesses worldwide
        </div>

        {/* Heading */}
        <h1
          className={cx(
            "max-w-5xl text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Smarter Business Operations
          <br />
          Powered by{" "}
          <span className="text-gradient-light">
            Intelligent AI Automation
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cx(
            "mt-8 max-w-3xl text-lg leading-8 text-ink-300 sm:text-xl transition-all duration-700 delay-150",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Nexora AI helps modern organizations automate repetitive workflows,
          improve collaboration, reduce operational costs, and gain real-time
          business insights through one secure cloud platform.
        </p>

        {/* Buttons */}
        <div
          className={cx(
            "mt-10 flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-300",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Button
            to="/contact"
            variant="primary"
            size="lg"
            className="bg-white text-ink-900 hover:bg-ink-100"
          >
            Get Started
          </Button>

          <Button
            to="/product"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Explore Platform
          </Button>
        </div>

        {/* Stats */}
        <div
          className={cx(
            "mt-16 grid grid-cols-1 gap-10 text-center sm:grid-cols-3 transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div>
            <h3 className="text-4xl font-bold text-white">500+</h3>
            <p className="mt-2 text-ink-400">
              Businesses Using Nexora
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">60%</h3>
            <p className="mt-2 text-ink-400">
              Reduction in Manual Tasks
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">99.9%</h3>
            <p className="mt-2 text-ink-400">
              Cloud Platform Uptime
            </p>
          </div>
        </div>

      </Container>

      <div ref={ref} className="sr-only" />
    </section>
  );
}