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
          gsap.to('[data-animate="domain-name"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
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
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: priceEl,
                start: 'top 80%',
                once: true,
              },
            });

            // Subtle glow pulse after reveal
            gsap.to(priceEl, {
              textShadow: '0 0 40px rgb(var(--color-accent) / 0.3)',
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 1.5,
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
            ease: 'power3.out',
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
    <section ref={sectionRef} id="domain" className="section-padding domain-showcase relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgb(var(--color-accent)/0.04)] blur-3xl pointer-events-none" />

      <div className="content-max-width text-center relative z-10">
        <p
          data-animate="domain-name"
          className="text-lg md:text-xl text-[rgb(var(--color-accent))] font-medium tracking-widest uppercase mb-4"
        >
          {domainName}
        </p>

        <div
          data-animate="domain-price"
          className="my-8 md:my-12"
        >
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gradient-text glow-accent inline-block">
            <AnimatedCounter value={salePriceNumeric} prefix="$" duration={2.5} />
          </div>
          <p className="mt-4 text-base md:text-lg text-[rgb(var(--color-text-muted))] font-light">
            The highest publicly disclosed domain sale in history
          </p>
        </div>

        <p
          data-animate="domain-context"
          className="text-base md:text-lg text-[rgb(var(--color-text-muted))] max-w-2xl mx-auto leading-relaxed font-light"
        >
          {context}
        </p>

        <div className="section-divider mt-12 md:mt-16" />
      </div>
    </section>
  );
}
