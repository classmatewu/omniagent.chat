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
        // Staggered entrance
        gsap.to('[data-animate="hero-tag"]', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 0.1,
        });
        gsap.to('[data-animate="hero-headline"]', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 0.25,
        });
        gsap.to('[data-animate="hero-sub"]', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 0.45,
        });
        gsap.to('[data-animate="hero-cta"]', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 0.65,
        });
        gsap.to('[data-animate="hero-scroll"]', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 1.0,
        });

        // Orbital rings slow rotation
        gsap.to('.orbital-ring', {
          rotation: 360,
          duration: 120,
          ease: 'none',
          repeat: -1,
        });
        gsap.to('.orbital-ring-reverse', {
          rotation: -360,
          duration: 90,
          ease: 'none',
          repeat: -1,
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
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-x-hidden overflow-y-visible noise-overlay hero-mesh"
      style={{ background: 'var(--color-surface-dark)' }}
    >
      {/* Orbital rings decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="orbital-ring absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: '1px solid rgba(0, 221, 179, 0.04)',
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="orbital-ring-reverse absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: '1px solid rgba(245, 166, 35, 0.03)',
            left: '50%',
            top: '50%',
          }}
        />
        {/* Dot on ring */}
        <div
          className="orbital-ring absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 12px rgba(0, 221, 179, 0.5)',
            }}
          />
        </div>
      </div>

      {/* Grid overlay for depth */}
      <div className="grid-overlay absolute inset-0 pointer-events-none" />

      <div className="content-max-width text-center relative z-10 overflow-visible">
        {/* Tag line */}
        <div
          data-animate="hero-tag"
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.15em] uppercase"
          style={{
            border: '1px solid rgba(0, 221, 179, 0.15)',
            color: 'var(--color-accent)',
            background: 'rgba(0, 221, 179, 0.04)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 6px var(--color-accent)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          The Future is Autonomous
        </div>

        <h1
          data-animate="hero-headline"
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.5] tracking-[-0.02em] pb-2"
          style={{ color: 'var(--color-text)' }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-animate="hero-sub"
            className="mt-6 md:mt-8 text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.7] max-w-2xl mx-auto font-light"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {subheadline}
          </p>
        )}

        <div data-animate="hero-cta" className="mt-10 md:mt-14 flex items-center justify-center gap-4">
          <a
            href="#growth"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-400"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-surface-dark)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 24px rgba(0, 221, 179, 0.35), 0 0 60px rgba(0, 221, 179, 0.15)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Explore the Data
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-400"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 221, 179, 0.2)';
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(0, 221, 179, 0.04)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          data-animate="hero-scroll"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Scroll
          </span>
          <div
            className="w-[1px] h-8"
            style={{
              background: 'linear-gradient(180deg, var(--color-accent), transparent)',
              animation: 'scroll-bounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
