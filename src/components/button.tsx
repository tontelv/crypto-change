import React from "react";

interface IButtonProps {
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  disabled: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`component-button ${disabled && "component-button-disabled"}`}
    >
      {children}
    </button>
  );
};

export default Button;
