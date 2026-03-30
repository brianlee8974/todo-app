import { useState, useRef, type FormEvent } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} id="todo-form" className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-2xl opacity-0 group-focus-within:opacity-75 blur-sm transition-opacity duration-500" />

      <div className="relative flex items-center bg-surface-800/80 backdrop-blur-xl rounded-2xl border border-surface-700/50 overflow-hidden shadow-2xl">
        {/* Plus icon */}
        <div className="pl-5 pr-2 text-surface-400 group-focus-within:text-primary-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>

        <input
          ref={inputRef}
          id="todo-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent text-white text-lg py-4.5 px-3 placeholder:text-surface-500 focus:outline-none"
          autoComplete="off"
        />

        <button
          type="submit"
          id="todo-add-btn"
          disabled={!text.trim()}
          className="m-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl
                     hover:from-primary-500 hover:to-primary-400 disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25"
        >
          Add
        </button>
      </div>
    </form>
  );
}
