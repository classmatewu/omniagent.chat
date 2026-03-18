'use client';

import { useRef, useEffect } from 'react';
import type { HeroSectionProps } from '@/types';

export default function HeroSection({ headline, subheadline }: HeroSectionProps) {
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

    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        gsap.to('[data-animate="hero-headline"]', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
          delay: 0.2,
        });
        gsap.to('[data-animate="hero-sub"]', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
          delay: 0.5,
        });
        gsap.to('[data-animate="hero-cta"]', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
          delay: 0.8,
        });
      }, section);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center min-h-screen pt-24 overflow-hidden noise-overlay"
      style={{ background: 'var(--color-surface-dark)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="content-max-width text-center relative z-10">
        <h1
          data-animate="hero-headline"
          className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.0] tracking-[-0.03em]"
          style={{ color: 'var(--color-text-on-dark)' }}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            data-animate="hero-sub"
            className="mt-6 md:mt-8 text-[clamp(1.1rem,2.5vw,1.5rem)] leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            {subheadline}
          </p>
        )}
        <div data-animate="hero-cta" className="mt-10 md:mt-14">
          <a
            href="#growth"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] text-lg font-normal hover:underline underline-offset-4 transition-all duration-200"
          >
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
