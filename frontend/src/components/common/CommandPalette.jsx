import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";
import { searchIndex } from "../../data/searchIndex";
import SearchResults from "./SearchResults";

const RECENT_KEY_LIMIT = 5;

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setDebouncedQuery("");
      setActiveIndex(0);
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return searchIndex;
    return searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  const handleSelect = useCallback(
    (item) => {
      setRecent((prev) => {
        const next = [item, ...prev.filter((r) => r.id !== item.id)];
        return next.slice(0, RECENT_KEY_LIMIT);
      });

      const [path, hash] = item.path.split("#");
      navigate(path);

      if (hash) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(hash);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        });
      }

      onClose();
    },
    [navigate, onClose]
  );

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = results[activeIndex];
        if (item) handleSelect(item);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, activeIndex, handleSelect, onClose]);

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  if (!open) return null;

  const showRecent = query.trim().length === 0 && recent.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-[var(--ease-tactile)]"
      />

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl transition-all duration-200 ease-[var(--ease-tactile)]">
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3.5">
          <Search className="h-4.5 w-4.5 shrink-0 text-[var(--color-text-secondary)]" strokeWidth={1.75} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, metrics, insights..."
            className="w-full bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded-md p-1 text-[var(--color-text-secondary)] transition-colors duration-150 ease-[var(--ease-tactile)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {showRecent && (
          <div className="border-b border-[var(--color-border)] px-2 py-2">
            <div className="px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
              Recent
            </div>
            {recent.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[13.5px] text-[var(--color-text-secondary)] transition-colors duration-150 ease-[var(--ease-tactile)] hover:bg-[var(--color-surface-elevated)]/60 hover:text-[var(--color-text-primary)]"
              >
                <span>{item.label}</span>
                <span className="text-[10.5px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        )}

        <SearchResults
          results={results}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onHover={setActiveIndex}
          query={debouncedQuery}
        />

        <div className="flex items-center gap-4 border-t border-[var(--color-border)] px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
            <ArrowUp className="h-3 w-3" strokeWidth={1.75} />
            <ArrowDown className="h-3 w-3" strokeWidth={1.75} />
            Navigate
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
            <CornerDownLeft className="h-3 w-3" strokeWidth={1.75} />
            Select
          </span>
          <span className="ml-auto text-[11px] text-[var(--color-text-secondary)]">Esc to close</span>
        </div>
      </div>
    </div>
  );
}