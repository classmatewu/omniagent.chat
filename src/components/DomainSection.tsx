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
          // Horizontal rule expand
          gsap.to('[data-animate="domain-rule-top"]', {
            scaleX: 1,
            duration: 1,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          });

          gsap.to('[data-animate="domain-label"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
            },
          });

          gsap.to('[data-animate="domain-rule-bottom"]', {
            scaleX: 1,
            duration: 1,
            delay: 0.6,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
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
      {/* Warm glow behind price */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 166, 35, 0.05) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 221, 179, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="content-max-width text-center relative z-10">
        {/* Top decorative rule */}
        <div
          data-animate="domain-rule-top"
          className="mx-auto mb-12 h-px max-w-xs"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.3), transparent)',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
          }}
        />

        <p
          data-animate="domain-label"
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: 'var(--color-accent-warm)' }}
        >
          Record-Breaking Domain Sale
        </p>

        <p
          data-animate="domain-name"
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-10 md:mb-14"
          style={{ color: 'var(--color-text-on-dark)' }}
        >
          {domainName}
        </p>

        <div data-animate="domain-price" className="mb-10 md:mb-14">
          <div
            className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold tracking-[-0.04em] leading-[1.0] tabular-nums"
            style={{
              background:
                'linear-gradient(135deg, var(--color-accent-warm) 0%, #f7c948 50%, var(--color-accent-warm) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <AnimatedCounter value={salePriceNumeric} prefix="$" duration={2.5} />
          </div>
          <p
            className="mt-5 text-sm md:text-base font-medium tracking-wide uppercase"
            style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            The highest publicly disclosed domain sale in history
          </p>
        </div>

        <p
          data-animate="domain-context"
          className="text-base md:text-lg max-w-2xl mx-auto leading-[1.8] font-light"
          style={{ color: 'var(--color-text-on-dark-secondary)' }}
        >
          {context}
        </p>

        {/* Bottom decorative rule */}
        <div
          data-animate="domain-rule-bottom"
          className="mx-auto mt-12 h-px max-w-xs"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.3), transparent)',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
  );
}
