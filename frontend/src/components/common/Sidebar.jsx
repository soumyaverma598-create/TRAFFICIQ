import { NavLink } from "react-router-dom";
import { Radar, X } from "lucide-react";
import { navItems } from "./navConfig";

/**
 * Sidebar
 *
 * Desktop  (lg+):   fixed, full width (280px), labels visible.
 * Tablet   (md-lg):  fixed, collapsed to icon rail, labels hidden.
 * Mobile   (<md):    off-canvas drawer, toggled via `mobileOpen`.
 */
export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-[var(--ease-tactile)] md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[280px] flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 ease-[var(--ease-tactile)] md:w-20 md:translate-x-0 lg:w-[280px] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / project identity */}
        <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-[var(--color-border)] px-6 md:justify-center md:px-0 lg:justify-start lg:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            <Radar className="h-4.5 w-4.5 text-[var(--color-accent)]" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col leading-tight md:hidden lg:flex">
            <span className="text-[13.5px] font-semibold tracking-tight text-[var(--color-text-primary)]">
              Traffic Intelligence
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[var(--color-accent)]">
              AI PLATFORM
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto rounded-md p-1.5 text-[var(--color-text-secondary)] transition-colors duration-200 ease-[var(--ease-tactile)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] md:hidden"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5 md:items-center md:px-2 lg:items-stretch lg:px-3">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-200 ease-[var(--ease-tactile)]",
                  "md:w-11 md:justify-center md:px-0 lg:w-full lg:justify-start lg:px-3",
                  "hover:-translate-y-[1px]",
                  isActive
                    ? "border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                    : "border border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)]/60 hover:text-[var(--color-text-primary)]",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-[var(--color-accent)] transition-opacity duration-200 ease-[var(--ease-tactile)] ${
                      isActive ? "opacity-100" : "opacity-0"
                    } md:hidden lg:block`}
                  />
                  <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.75} />
                  <span className="md:hidden lg:inline">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer status slot */}
        <div className="shrink-0 border-t border-[var(--color-border)] px-6 py-4 md:px-2 lg:px-6">
          <div className="flex items-center gap-2 md:justify-center lg:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            <span className="text-[11px] font-medium tracking-wide text-[var(--color-text-secondary)] md:hidden lg:inline">
              MODEL ONLINE
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
