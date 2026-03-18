'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for GSAP ScrollTrigger animations.
 * Handles plugin registration, reduced-motion check, and cleanup.
 *
 * Usage:
 *   const containerRef = useScrollAnimation((gsap, ScrollTrigger, ctx) => {
 *     gsap.from('.element', { opacity: 0, y: 20, scrollTrigger: { trigger: '.element' } });
 *   });
 */
export function useScrollAnimation(
  animationFactory: (
    gsap: typeof import('gsap').default,
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger,
  ) => void,
) {
  const containerRef = useRef<HTMLElement>(null);
  const factoryRef = useRef(animationFactory);
  factoryRef.current = animationFactory;

  const setupAnimations = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Make all animated elements visible immediately
      container.querySelectorAll('[data-animate]').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    let ctx: ReturnType<typeof import('gsap').default.context> | undefined;

    // Dynamically import GSAP to keep it out of the critical path
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.config({
          limitCallbacks: true,
          ignoreMobileResize: true,
        });

        ctx = gsap.context(() => {
          factoryRef.current(gsap, ScrollTrigger);
        }, container);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const cleanup = setupAnimations();
    return () => {
      cleanup?.();
    };
  }, [setupAnimations]);

  return containerRef;
}
