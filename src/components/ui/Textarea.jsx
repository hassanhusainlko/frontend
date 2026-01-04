// src/components/ui/Textarea.jsx
import React from "react";

export default function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  rows = 3,
  placeholder = "",
  error,
  wrapperClassName = "",
  className = "",
  ...rest
}) {
  const textareaId = id || name;

  return (
    <div className={`mb-3 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
