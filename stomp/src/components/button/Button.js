function Button({ label, onClick, disabled = false, className = "" }) {
  return (
    <button
      className={className}
      type={"button"}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
