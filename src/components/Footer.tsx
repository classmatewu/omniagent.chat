export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{
        background: 'var(--color-surface-dark)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="content-max-width text-center">
        <p className="text-xs" style={{ color: 'rgba(245, 245, 247, 0.45)' }}>
          Copyright &copy; {new Date().getFullYear()} omniagent.chat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
