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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? 'rgba(0, 0, 0, 0.72)'
          : 'transparent',
        backdropFilter: isScrolled ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      <div className="content-max-width flex items-center justify-between h-12 md:h-[44px]">
        {/* Brand */}
        <a
          href="#home"
          className="text-sm font-normal tracking-tight transition-opacity duration-200 hover:opacity-70"
          style={{ color: '#f5f5f7' }}
        >
          {brandName}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs transition-opacity duration-200 hover:opacity-70"
              style={{ color: 'rgba(245, 245, 247, 0.8)' }}
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
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'translate-y-[7.5px] rotate-45' : ''
              }`}
              style={{ background: '#f5f5f7' }}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
              style={{ background: '#f5f5f7' }}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? '-translate-y-[7.5px] -rotate-45' : ''
              }`}
              style={{ background: '#f5f5f7' }}
            />
          </div>
        </button>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 top-12 z-40 md:hidden"
            style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)' }}
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
                  className="text-2xl font-light transition-opacity duration-200 hover:opacity-70"
                  style={{ color: '#f5f5f7' }}
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
