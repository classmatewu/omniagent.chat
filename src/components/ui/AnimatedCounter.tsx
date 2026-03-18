'use client';

import { useEffect, useRef } from 'react';
import type { AnimatedCounterProps } from '@/types';

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated.current) return;

    // Respect prefers-reduced-motion — show final value immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      hasAnimated.current = true;
      return;
    }

    // Start with 0
    el.textContent = `${prefix}0${suffix}`;

    let ctx: ReturnType<typeof import('gsap').default.context> | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        const obj = { val: 0 };

        ctx = gsap.context(() => {
          gsap.to(obj, {
            val: value,
            duration,
            ease: 'power2.out',
            snap: { val: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              if (el) {
                el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
              }
            },
            onComplete: () => {
              hasAnimated.current = true;
            },
          });
        }, el);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
