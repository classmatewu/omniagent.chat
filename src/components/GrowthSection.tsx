'use client';

import { useRef, useEffect } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import type { GrowthSectionProps } from '@/types';

export default function GrowthSection({ heading, description, statistics }: GrowthSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      section.querySelectorAll('[data-animate]').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    let ctx: ReturnType<typeof import('gsap').default.context> | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.to('[data-animate="growth-heading"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '[data-animate="growth-heading"]',
              start: 'top 85%',
              once: true,
            },
          });

          gsap.to('[data-animate="growth-desc"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '[data-animate="growth-desc"]',
              start: 'top 85%',
              once: true,
            },
          });

          const cards = section.querySelectorAll('[data-animate="stat-card"]');
          ScrollTrigger.batch(cards, {
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.15,
              }),
            start: 'top 85%',
            once: true,
          });
        }, section);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="growth" className="section-padding">
      <div className="content-max-width">
        <div className="text-center mb-16 md:mb-20">
          <h2
            data-animate="growth-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[rgb(var(--color-text))]"
          >
            {heading}
          </h2>
          <p
            data-animate="growth-desc"
            className="mt-6 text-lg md:text-xl text-[rgb(var(--color-text-muted))] max-w-2xl mx-auto leading-relaxed font-light"
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              data-animate="stat-card"
              className="text-center p-8 rounded-2xl bg-[rgb(var(--color-surface-alt))] border border-[rgb(var(--color-border)/0.5)]"
            >
              <div className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-accent))] mb-3">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="text-base font-semibold text-[rgb(var(--color-text))] mb-2">
                {stat.label}
              </div>
              {stat.context && (
                <p className="text-sm text-[rgb(var(--color-text-muted))] leading-relaxed">
                  {stat.context}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
