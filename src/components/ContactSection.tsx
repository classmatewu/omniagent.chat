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
    <section ref={sectionRef} id="contact" className="section-padding">
      <div className="content-max-width text-center">
        <div data-animate="contact-content">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[rgb(var(--color-text))] mb-6">
            {heading}
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-muted))] mb-8 font-light">
            Interested in partnerships, inquiries, or just want to say hello?
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-block text-xl md:text-2xl font-medium text-[rgb(var(--color-accent))] hover:opacity-80 transition-opacity duration-200 underline underline-offset-4 decoration-[rgb(var(--color-accent)/0.3)] hover:decoration-[rgb(var(--color-accent))]"
          >
            {displayLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
