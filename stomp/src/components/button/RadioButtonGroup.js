function RadioButtonGroup(props) {
  const { name, options = [], selectedValue, onChange } = props;

  return (
    <div>
      {options.map((option) => (
        <label key={option.value} style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
