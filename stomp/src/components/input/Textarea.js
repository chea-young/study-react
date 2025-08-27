function Textarea({ id, label, value, placeholder = '', rows = 4, disabled = false }) {
  return (
    <div className="textarea-wrapper">
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="textarea"
      />
    </div>
  );
}

import PropTypes from 'prop-types';

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Textarea;
