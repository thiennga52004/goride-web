const PricingCard = ({ config, onEdit }) => {
  return (
    <div className="pricing-card" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--glass-border)' }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>{config?.vehicleType || 'Vehicle'}</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Pricing Card — chờ implement</p>
    </div>
  );
};

export default PricingCard;
