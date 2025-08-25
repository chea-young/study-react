function Button({
  label,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
}) {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
