import { Menu, Search, Bell, User } from "lucide-react";

/**
 * Header
 *
 * `title` is passed down by each route/page so the shell never
 * needs to know about page-level content.
 */
export default function Header({ title = "Dashboard", onMenuClick = () => {} }) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)]/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/80 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg border border-transparent p-2 text-[var(--color-text-secondary)] transition-all duration-200 ease-[var(--ease-tactile)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] md:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <h1 className="text-[19px] font-semibold tracking-tight text-[var(--color-text-primary)]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Search"
          className="flex h-9 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-secondary)] transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
        >
          <Search className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden text-[13px] sm:inline">Search</span>
          <kbd className="hidden rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-1.5 py-0.5 text-[10.5px] text-[var(--color-text-secondary)] sm:inline">
            ⌘K
          </kbd>
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
        >
          <Bell className="h-4 w-4" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        </button>

        <div className="mx-1 h-6 w-px bg-[var(--color-border)]" />

        <button
          aria-label="Profile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
        >
          <User className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
