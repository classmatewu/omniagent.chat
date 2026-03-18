export default function Footer() {
  return (
    <footer className="py-8 border-t border-[rgb(var(--color-border)/0.5)]">
      <div className="content-max-width text-center">
        <p className="text-sm text-[rgb(var(--color-text-muted))]">
          &copy; {new Date().getFullYear()}{' '}
          <span className="gradient-text font-medium">omniagent.chat</span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
