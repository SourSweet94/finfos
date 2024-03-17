import React from "react";
import { Button as BSButton } from "react-bootstrap";
// import "../styles/button.css";

interface ButtonProps {
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: string;
  style?: {};
}

const Button = ({
  onClick,
  type = "button",
  disabled,
  children,
  variant = "secondary",
  style,
}: ButtonProps) => {
  return (
    <BSButton
      type={type}
      disabled={disabled}
      style={{minWidth: '80px', ...style}}
      onClick={onClick}
      className="mx-2 btn"
      variant={variant}
    >
      {children}
    </BSButton>
  );
};

export default Button;
