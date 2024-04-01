import React from "react";
import { Button as BSButton } from "react-bootstrap";
// import "../styles/button.css";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: string;
  style?: {};
  className?: string;
}

const Button = ({
  onClick,
  type = "button",
  disabled,
  children,
  variant = "secondary",
  style,
  className,
}: ButtonProps) => {
  return (
    <BSButton
      type={type}
      disabled={disabled}
      style={{minWidth: '80px', ...style}}
      onClick={onClick}
      className={`btn ${className}`}
      variant={variant}
    >
      {children}
    </BSButton>
  );
};

export default Button;
