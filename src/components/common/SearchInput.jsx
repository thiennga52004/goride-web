import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Tìm kiếm...', className = '' }) => {
  return (
    <div className={`search-input ${className}`} style={{ position: 'relative' }}>
      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '10px 12px 10px 36px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
      />
    </div>
  );
};

export default SearchInput;
