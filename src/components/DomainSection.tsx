'use client';

import { useRef, useEffect } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import type { DomainSectionProps } from '@/types';

export default function DomainSection({
  domainName,
  salePrice,
  salePriceNumeric,
  context,
}: DomainSectionProps) {
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
          gsap.to('[data-animate="domain-label"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          });

          gsap.to('[data-animate="domain-name"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          });

          const priceEl = section.querySelector('[data-animate="domain-price"]');
          if (priceEl) {
            gsap.to(priceEl, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
              scrollTrigger: {
                trigger: priceEl,
                start: 'top 80%',
                once: true,
              },
            });
          }

          gsap.to('[data-animate="domain-context"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
            },
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
      id="domain"
      className="section-padding relative overflow-hidden noise-overlay"
      style={{ background: 'var(--color-surface-dark)' }}
    >
      {/* Subtle ambient glow behind price */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="content-max-width text-center relative z-10">
        <p
          data-animate="domain-label"
          className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          Record-Breaking Domain Sale
        </p>

        <p
          data-animate="domain-name"
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] mb-8 md:mb-12"
          style={{ color: 'var(--color-text-on-dark)' }}
        >
          {domainName}
        </p>

        <div data-animate="domain-price" className="mb-8 md:mb-12">
          <div
            className="text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-[-0.03em] leading-[1.0] tabular-nums"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            <AnimatedCounter value={salePriceNumeric} prefix="$" duration={2.5} />
          </div>
          <p
            className="mt-4 text-base md:text-lg font-normal"
            style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            The highest publicly disclosed domain sale in history
          </p>
        </div>

        <p
          data-animate="domain-context"
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-on-dark-secondary)' }}
        >
          {context}
        </p>
      </div>
    </section>
  );
}
