import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import type { FilterType } from './types';

export default function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const totalCount = todos.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12 sm:py-20">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <main className="relative w-full max-w-xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent">
              Taskflow
            </span>
          </h1>
          <p className="text-surface-400 text-sm tracking-wide uppercase">
            Stay organized. Get things done.
          </p>
        </header>

        {/* Progress bar */}
        {totalCount > 0 && (
          <div id="progress-section" className="space-y-2">
            <div className="flex justify-between text-xs text-surface-400">
              <span>{completedCount} of {totalCount} completed</span>
              <span className="font-semibold text-primary-400">{progress}%</span>
            </div>
            <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Filter bar */}
        {totalCount > 0 && (
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* Todo list */}
        <section id="todo-list" className="space-y-2">
          {filteredTodos.length === 0 ? (
            <EmptyState filter={totalCount === 0 ? 'all' : filter} />
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-surface-600 text-xs pt-4">
          Double-click a task to edit · Data saved locally
        </footer>
      </main>
    </div>
  );
}
