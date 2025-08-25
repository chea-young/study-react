function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
}) {
  return (
    <div className="textarea-wrapper">
      {label && <label htmlFor={id} className="textarea-label">{label}</label>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="textarea"
      />
    </div>
  );
}

export default Textarea;
