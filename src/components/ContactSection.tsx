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
          gsap.to('[data-animate="contact-line"]', {
            scaleX: 1,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          });

          gsap.to('[data-animate="contact-content"]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
      className="section-padding relative"
      style={{ background: 'var(--color-surface-alt)' }}
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0, 221, 179, 0.12), transparent)',
        }}
      />

      <div className="content-max-width">
        <div className="max-w-xl mx-auto text-center">
          <div
            data-animate="contact-line"
            className="accent-line mx-auto mb-8"
            style={{ transformOrigin: 'center', transform: 'scaleX(0)' }}
          />

          <div data-animate="contact-content">
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              {heading}
            </h2>
            <p
              className="text-base mb-10 font-light leading-[1.7]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Interested in partnerships, inquiries, or just want to say hello?
            </p>

            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-400"
              style={{
                border: '1px solid var(--color-border-accent)',
                color: 'var(--color-accent)',
                background: 'rgba(0, 221, 179, 0.04)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'var(--color-accent)';
                el.style.color = 'var(--color-surface-dark)';
                el.style.borderColor = 'var(--color-accent)';
                el.style.boxShadow =
                  '0 0 24px rgba(0, 221, 179, 0.3), 0 0 60px rgba(0, 221, 179, 0.1)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0, 221, 179, 0.04)';
                el.style.color = 'var(--color-accent)';
                el.style.borderColor = 'rgba(0, 221, 179, 0.2)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              {displayLabel}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
