import type { FilterType } from '../types';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div id="filter-bar" className="flex items-center justify-between flex-wrap gap-3">
      {/* Filter pills */}
      <div className="flex items-center gap-1 bg-surface-800/60 backdrop-blur-sm rounded-xl p-1 border border-surface-700/30">
        {filters.map(f => (
          <button
            key={f.key}
            id={`filter-${f.key}`}
            onClick={() => onFilterChange(f.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                         ${filter === f.key
                           ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                           : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats & clear */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-surface-400">
          <span className="text-primary-400 font-semibold">{activeCount}</span> remaining
        </span>

        {completedCount > 0 && (
          <button
            id="clear-completed-btn"
            onClick={onClearCompleted}
            className="text-surface-500 hover:text-red-400 transition-colors duration-200 underline underline-offset-2 decoration-dotted"
          >
            Clear done ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
