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
          gsap.to('[data-animate="growth-line"]', {
            scaleX: 1,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: '[data-animate="growth-line"]',
              start: 'top 90%',
              once: true,
            },
          });

          gsap.to('[data-animate="growth-heading"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
                ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
                stagger: 0.1,
              }),
            start: 'top 88%',
            once: true,
          });
        }, section);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  // Accent colors for each card
  const cardAccents = [
    { color: 'var(--color-accent)', glow: 'rgba(0, 221, 179, 0.08)' },
    { color: 'var(--color-accent-warm)', glow: 'rgba(245, 166, 35, 0.06)' },
    { color: 'var(--color-accent)', glow: 'rgba(0, 221, 179, 0.08)' },
    { color: 'var(--color-accent-warm)', glow: 'rgba(245, 166, 35, 0.06)' },
  ];

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-surface-alt)' }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0, 221, 179, 0.12), transparent)',
        }}
      />

      <div className="content-max-width">
        {/* Section header - left aligned for editorial feel */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <div
            data-animate="growth-line"
            className="accent-line mb-6"
            style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
          />
          <h2
            data-animate="growth-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1]"
            style={{ color: 'var(--color-text)' }}
          >
            {heading}
          </h2>
          <p
            data-animate="growth-desc"
            className="mt-5 text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.7] font-light"
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
              className="card-glow rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 md:left-10 md:right-10 h-px"
                style={{
                  background: `linear-gradient(90deg, ${cardAccents[index].color}, transparent)`,
                  opacity: 0.3,
                }}
              />

              {/* Number index */}
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase mb-6 block"
                style={{ color: cardAccents[index].color, opacity: 0.6 }}
              >
                0{index + 1}
              </span>

              <div
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-3 tabular-nums"
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
                className="text-sm font-semibold uppercase tracking-[0.05em] mb-3"
                style={{ color: cardAccents[index].color }}
              >
                {stat.label}
              </div>
              {stat.context && (
                <p
                  className="text-sm leading-[1.7] font-light"
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
