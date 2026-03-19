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
        background: isMenuOpen
          ? 'rgba(0, 0, 0, 0.95)'
          : isScrolled
            ? 'rgba(0, 0, 0, 0.72)'
            : 'transparent',
        backdropFilter: isScrolled || isMenuOpen ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled || isMenuOpen ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom: isMenuOpen
          ? '1px solid transparent'
          : isScrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid transparent',
      }}
    >
      <div className="content-max-width flex items-center justify-between h-12 md:h-[44px]">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
        >
          <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <circle cx="256" cy="256" r="256" fill="#f5f5f7"/>
            <g fill="#000">
              <path d="M152 128 Q108 168 96 224 Q84 280 116 328 Q132 354 160 368 L172 344 Q148 332 136 312 Q112 272 120 228 Q128 184 164 152 Z"/>
              <path d="M152 128 Q176 108 208 104 Q224 102 236 108 L224 132 Q214 128 204 128 Q182 130 164 148 Z"/>
              <path d="M160 368 Q184 388 216 396 Q232 400 244 396 L236 372 Q226 374 216 372 Q194 366 176 352 Z"/>
              <path d="M360 384 Q404 344 416 288 Q428 232 396 184 Q380 158 352 144 L340 168 Q364 180 376 200 Q400 240 392 284 Q384 328 348 360 Z"/>
              <path d="M352 144 Q328 124 296 116 Q280 112 268 116 L276 140 Q286 138 296 140 Q318 146 336 160 Z"/>
              <path d="M360 384 Q336 404 304 408 Q288 410 276 404 L284 380 Q294 384 304 382 Q326 378 344 364 Z"/>
              <circle cx="256" cy="256" r="20"/>
            </g>
          </svg>
          <span
            className="text-sm font-normal tracking-tight"
            style={{ color: '#f5f5f7' }}
          >
            {brandName}
          </span>
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
