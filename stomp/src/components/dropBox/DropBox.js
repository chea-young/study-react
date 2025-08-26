const DropBox = (props) => {
  const { label, value, onChange, options = [] } = props;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className="border rounded px-2 py-1 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

import PropTypes from "prop-types";

DropBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default DropBox;
