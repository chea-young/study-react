function Button({ label, onClick, disabled = false, className = '', type = 'button' }) {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

import PropTypes from 'prop-types';

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
