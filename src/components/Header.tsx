'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { HeaderProps } from '@/types';

export default function Header({ brandName, navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Track scroll for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap and keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [isMenuOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first nav item
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a');
      firstLink?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgb(var(--color-surface)/0.85)] backdrop-blur-md border-b border-[rgb(var(--color-border)/0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="content-max-width flex items-center justify-between h-16 md:h-20">
        {/* Brand */}
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight text-[rgb(var(--color-text))]"
        >
          {brandName}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text))] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          ref={toggleRef}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-5 h-0.5 bg-[rgb(var(--color-text))] transition-all duration-300 ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[rgb(var(--color-text))] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[rgb(var(--color-text))] transition-all duration-300 ${
                isMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 top-16 z-40 bg-[rgb(var(--color-surface)/0.98)] backdrop-blur-lg md:hidden"
            onClick={handleBackdropClick}
          >
            <nav
              ref={menuRef}
              id="nav-menu"
              role="navigation"
              aria-label="Main"
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-2xl font-light text-[rgb(var(--color-text))] hover:text-[rgb(var(--color-accent))] transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
