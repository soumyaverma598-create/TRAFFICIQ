import { useEffect, useRef } from "react";
import { CheckCheck } from "lucide-react";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({ open, notifications, onMarkRead, onMarkAllRead, onClose, anchorRef }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[340px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl transition-all duration-200 ease-[var(--ease-tactile)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-[13.5px] font-semibold text-[var(--color-text-primary)]">
          Notifications
        </span>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-1 text-[11.5px] font-medium text-[var(--color-accent)] transition-opacity duration-150 ease-[var(--ease-tactile)] hover:opacity-80"
          >
            <CheckCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[380px] overflow-y-auto px-2 py-2">
        {notifications.length === 0 ? (
          <div className="px-4 py-10 text-center text-[13px] text-[var(--color-text-secondary)]">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
}