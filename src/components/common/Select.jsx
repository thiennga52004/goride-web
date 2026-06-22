const Select = ({ label, options = [], value, onChange, id, className = '', ...props }) => {
  return (
    <div className={`select-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <select id={id} className="select-field" value={value} onChange={onChange} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
