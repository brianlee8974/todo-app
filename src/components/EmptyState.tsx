import type { FilterType } from '../types';

interface EmptyStateProps {
  filter: FilterType;
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const messages: Record<FilterType, { icon: string; title: string; subtitle: string }> = {
    all: {
      icon: '✨',
      title: 'No tasks yet',
      subtitle: 'Add your first task above to get started!',
    },
    active: {
      icon: '🎉',
      title: 'All caught up!',
      subtitle: 'You have no active tasks. Great job!',
    },
    completed: {
      icon: '📋',
      title: 'Nothing completed yet',
      subtitle: 'Complete some tasks and they\'ll show up here.',
    },
  };

  const { icon, title, subtitle } = messages[filter];

  return (
    <div id="empty-state" className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4 animate-bounce">{icon}</div>
      <h2 className="text-xl font-semibold text-surface-300 mb-2">{title}</h2>
      <p className="text-surface-500 text-sm max-w-xs">{subtitle}</p>
    </div>
  );
}
