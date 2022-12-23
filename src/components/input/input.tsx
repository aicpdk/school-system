import classnames from "classnames";
import React from "react";

type InputProps = {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: "text" | "password";
  placeholder?: string;
  label: string;
  isDisabled?: boolean;
  isErrored?: string;
};

export const Input: React.FC<InputProps> = ({
  isErrored,
  isDisabled,
  label,
  name,
  type = "text",
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="w-full font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event)}
        type={type}
        placeholder={placeholder}
        name={name}
        className={classnames(
          "rounded-md border-2 border-solid bg-white p-2 outline-none focus:border-gray-500",
          {
            "border-red-500": isErrored,
            "border-gray-300": isDisabled,
          }
        )}
      />
    </div>
  );
};
