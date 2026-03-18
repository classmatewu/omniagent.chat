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
            ease: 'power3.out',
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
    <section ref={sectionRef} id="contact" className="section-padding relative">
      <div className="content-max-width text-center">
        <div data-animate="contact-content">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-6">
            {heading}
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-muted))] mb-8 font-light">
            Interested in partnerships, inquiries, or just want to say hello?
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'var(--gradient-accent)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {displayLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
