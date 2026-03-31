export default function Footer() {
  return (
    <footer
      className="py-8 relative"
      style={{
        background: 'var(--color-surface-dark)',
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)',
        }}
      />

      <div className="content-max-width flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xs font-light tracking-wide"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          &copy; {new Date().getFullYear()} omniagent.chat
        </p>
        <div className="flex items-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 6px var(--color-accent)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
          <span
            className="text-[10px] font-medium tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
