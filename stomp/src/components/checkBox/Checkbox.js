function Checkbox(props) {
const { id, label, checked, onChange, disabled = false } = props;
  return (
    <label className="checkbox-container" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
}

export default Checkbox;
