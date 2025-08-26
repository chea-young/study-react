import PropTypes from "prop-types";

function TextInput(props) {
  const {
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    disabled = false,
  } = props;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        className="border rounded px-2 py-1 w-full"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

TextInput.propTypes = {
  key: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextInput;
