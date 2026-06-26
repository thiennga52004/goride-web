const Drawer = ({ isOpen, onClose, title, children, width = '480px' }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000 }}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width, background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', padding: '24px', overflowY: 'auto', animation: 'slideInRight var(--transition-slow) ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
