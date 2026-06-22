const Avatar = ({ src, name, size = 40, className = '' }) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  if (src) {
    return <img src={src} alt={name} className={className} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  }

  return (
    <div className={`avatar ${className}`} style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--accent-purple)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.38,
      fontWeight: 600,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

export default Avatar;
