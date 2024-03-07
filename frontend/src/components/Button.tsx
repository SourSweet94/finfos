import React from "react";
import { Button as BSButton } from "react-bootstrap";
import "../styles/button.css";

interface ButtonProps {
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  style?: {};
}

const Button = ({
  onClick,
  type = "button",
  disabled,
  children,
  style,
}: ButtonProps) => {
  return (
    <BSButton
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
      className="mx-2 btn"
    >
      {children}
    </BSButton>
  );
};

export default Button;
