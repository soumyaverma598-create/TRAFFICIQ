export default function SectionHeading({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}