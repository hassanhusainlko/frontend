// src/components/ui/FileInput.jsx
import React from "react";

export default function FileInput({
  label,
  id,
  name,
  onChange,
  accept,
  helperText,
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
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...rest}
      />
      {helperText && !error && <div className="form-text">{helperText}</div>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
