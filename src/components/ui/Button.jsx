// src/components/ui/Button.jsx
import React from "react";

const variantClassMap = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  outlineSuccess: "btn-outline-success",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...rest
}) {
  const variantClass = variantClassMap[variant] || "btn-primary";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
