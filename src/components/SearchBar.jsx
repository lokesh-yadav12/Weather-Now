import { useEffect, useMemo, useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search city...' }) {
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value.trim()), 400);
    return () => clearTimeout(id);
  }, [value]);

  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced, onSearch]);

  const clearable = useMemo(() => value.length > 0, [value]);

  return (
    <div className="searchbar">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search city"
      />
      {clearable && (
        <button className="clear-btn" onClick={() => setValue('')} aria-label="Clear">
          ×
        </button>
      )}
    </div>
  );
}


