// src/components/ui/Input.jsx
import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error,
  wrapperClassName = "",
  className = "",
  ...rest
}) {
  const inputId = id || name;

  return (
    <div className={`mb-3 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
