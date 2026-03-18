'use client';

import { useRef, useEffect } from 'react';
import type { ContactSectionProps } from '@/types';

export default function ContactSection({ heading, email, displayLabel }: ContactSectionProps) {
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
          gsap.to('[data-animate="contact-content"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
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
      id="contact"
      className="section-padding"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="content-max-width text-center">
        <div data-animate="contact-content">
          <h2
            className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1] mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            {heading}
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Interested in partnerships, inquiries, or just want to say hello?
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-[var(--color-accent)] text-lg hover:underline underline-offset-4 transition-all duration-200"
          >
            {displayLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
