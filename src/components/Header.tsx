'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { HeaderProps } from '@/types';

export default function Header({ brandName, navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isMenuOpen
          ? 'rgba(7, 8, 12, 0.98)'
          : isScrolled
            ? 'rgba(7, 8, 12, 0.85)'
            : 'transparent',
        backdropFilter: isScrolled || isMenuOpen ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled || isMenuOpen ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom:
          isScrolled && !isMenuOpen
            ? '1px solid rgba(0, 221, 179, 0.06)'
            : '1px solid transparent',
      }}
    >
      <div className="content-max-width flex items-center justify-between h-14 md:h-[52px]">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80 group"
        >
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="omniagent.chat"
              width={28}
              height={28}
              className="rounded-md relative z-10"
            />
            <div
              className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: '0 0 12px rgba(0, 221, 179, 0.3)',
              }}
            />
          </div>
          <span
            className="text-sm font-medium tracking-[-0.01em]"
            style={{ color: 'var(--color-text)' }}
          >
            {brandName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:bg-[rgba(0,221,179,0.06)]"
              style={{ color: 'rgba(232, 234, 240, 0.6)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(232, 234, 240, 0.6)';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          ref={toggleRef}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300"
          style={{
            background: isMenuOpen ? 'rgba(0, 221, 179, 0.08)' : 'transparent',
          }}
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-400 ${
                isMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
              style={{ background: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)' }}
            />
            <span
              className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-400 ${
                isMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
              style={{ background: 'var(--color-text)' }}
            />
            <span
              className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-400 ${
                isMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
              style={{ background: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)' }}
            />
          </div>
        </button>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 top-14 z-40 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(7, 8, 12, 0.98) 0%, rgba(7, 8, 12, 0.95) 100%)',
              backdropFilter: 'blur(24px)',
            }}
            onClick={handleBackdropClick}
          >
            <nav
              ref={menuRef}
              id="nav-menu"
              role="navigation"
              aria-label="Main"
              className="flex flex-col items-start justify-center h-full px-8 gap-2"
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="group flex items-center gap-4 py-4 w-full transition-all duration-300"
                  style={{
                    color: 'var(--color-text)',
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <span
                    className="text-[10px] font-mono tracking-widest transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-3xl font-light tracking-[-0.02em] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    {item.label}
                  </span>
                  <div
                    className="flex-1 h-px transition-all duration-300 group-hover:bg-[rgba(0,221,179,0.2)]"
                    style={{ background: 'var(--color-border)' }}
                  />
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
