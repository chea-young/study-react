function TextInput(props) {
  const {
    name,
    label,
    value,

    placeholder = '',
    type = 'text',
    disabled = false,
    ...rest
  } = props;

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        name={name}
        className="border rounded px-2 py-1 w-full"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}

import PropTypes from 'prop-types';

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};


export default TextInput;
