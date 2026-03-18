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
          ease: 'power3.out',
          delay: 0.2,
        });
        gsap.to('[data-animate="hero-sub"]', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
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
      className="relative flex items-center justify-center min-h-screen section-padding pt-24"
    >
      <div className="content-max-width text-center">
        <h1
          data-animate="hero-headline"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[rgb(var(--color-text))]"
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            data-animate="hero-sub"
            className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-[rgb(var(--color-text-muted))] max-w-3xl mx-auto leading-relaxed font-light"
          >
            {subheadline}
          </p>
        )}
      </div>
    </section>
  );
}
