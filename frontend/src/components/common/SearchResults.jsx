export default function SearchResults({ results, activeIndex, onSelect, onHover, query }) {
  if (query.trim().length > 0 && results.length === 0) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          No results for <span className="text-[var(--color-text-primary)]">"{query}"</span>
        </p>
      </div>
    );
  }

  const grouped = results.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <div className="max-h-[360px] overflow-y-auto px-2 py-2">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-1">
          <div className="px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
            {category}
          </div>
          {items.map((item) => {
            flatIndex += 1;
            const isActive = flatIndex === activeIndex;
            return (
              <button
                key={item.id}
                onMouseEnter={() => onHover(flatIndex)}
                onClick={() => onSelect(item)}
                className={[
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors duration-150 ease-[var(--ease-tactile)]",
                  isActive
                    ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]/60 hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                <span>{item.label}</span>
                {item.type === "page" ? (
                  <span className="text-[10.5px] font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
                    Page
                  </span>
                ) : (
                  <span className="text-[10.5px] font-medium uppercase tracking-wide text-[var(--color-accent)]">
                    Jump to
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}