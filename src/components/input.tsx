import React from "react";

interface IInputProps {
  isFrom: boolean;
  value: string;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  placeholder: string;
}

const Input: React.FC<IInputProps> = ({
  isFrom,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="component-input">
      <input
        value={value}
        onChange={onChange}
        maxLength={10}
        placeholder={placeholder}
        className="component-input__input"
        pattern="[0-9]*"
      />
    </div>
  );
};

export default Input;
