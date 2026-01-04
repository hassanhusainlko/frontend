// src/components/ui/Select.jsx
import React from "react";

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  error,
  wrapperClassName = "",
  className = "",
  placeholder = "Choose...",
  ...rest
}) {
  const selectId = id || name;

  return (
    <div className={`mb-3 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? "is-invalid" : ""} ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
