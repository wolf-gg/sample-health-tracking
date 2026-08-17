export const CompletedTargetsIndicator: React.FC = () => (
  <span
    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-sm"
    aria-label="Reached all daily targets"
    title="Reached all daily targets"
  >
    ✓
  </span>
)
