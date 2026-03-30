import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isLeaving, setIsLeaving] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
      editRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsLeaving(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <div
      id={`todo-item-${todo.id}`}
      className={`group relative flex items-center gap-3 px-5 py-4 rounded-xl
                   bg-surface-800/50 backdrop-blur-sm border border-surface-700/30
                   hover:bg-surface-800/80 hover:border-surface-600/50
                   transition-all duration-300 ease-out
                   ${isLeaving ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'}
                   ${todo.completed ? 'opacity-60' : ''}`}
    >
      {/* Custom checkbox */}
      <button
        id={`todo-toggle-${todo.id}`}
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                     transition-all duration-300 transform hover:scale-110
                     ${todo.completed
                       ? 'bg-gradient-to-br from-success-400 to-success-500 border-success-400 shadow-lg shadow-success-500/30'
                       : 'border-surface-500 hover:border-primary-400'}`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-[scale-in_0.2s_ease-out]">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </button>

      {/* Text / Edit */}
      {isEditing ? (
        <input
          ref={editRef}
          id={`todo-edit-input-${todo.id}`}
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-surface-700/50 text-white text-base px-3 py-1.5 rounded-lg border border-primary-500/50 focus:outline-none focus:border-primary-400"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-base cursor-default select-none transition-all duration-300
                       ${todo.completed ? 'line-through text-surface-500' : 'text-surface-100'}`}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          id={`todo-edit-btn-${todo.id}`}
          onClick={() => setIsEditing(true)}
          className="p-1.5 rounded-lg text-surface-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200"
          aria-label="Edit todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </button>
        <button
          id={`todo-delete-btn-${todo.id}`}
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          aria-label="Delete todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
