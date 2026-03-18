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
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
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
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
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
                duration: 0.7,
                ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
                stagger: 0.12,
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
    <section
      ref={sectionRef}
      id="growth"
      className="section-padding"
      style={{ background: 'var(--color-surface-alt)' }}
    >
      <div className="content-max-width">
        <div className="text-center mb-16 md:mb-20">
          <h2
            data-animate="growth-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1]"
            style={{ color: 'var(--color-text)' }}
          >
            {heading}
          </h2>
          <p
            data-animate="growth-desc"
            className="mt-5 text-[clamp(1rem,1.5vw,1.25rem)] max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {statistics.map((stat, index) => (
            <div
              key={index}
              data-animate="stat-card"
              className="rounded-2xl p-8 md:p-10 transition-colors duration-300"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-[-0.02em] mb-2 tabular-nums"
                style={{ color: 'var(--color-text)' }}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div
                className="text-base font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {stat.label}
              </div>
              {stat.context && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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
