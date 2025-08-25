function TextInput(props) {
  const { label, value, onChange, placeholder = '', type = 'text', disabled = false } = props;

  return (
    <div style={{ marginBottom: '1rem', width: '30rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
        }}
      />
    </div>
  );
}

export default TextInput;
