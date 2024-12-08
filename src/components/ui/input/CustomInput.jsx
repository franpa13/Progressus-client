import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const CustomInput = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  Icon,
  iconColor,
  required,
  label,
  classNameInput,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  return (
    <div
      className={`flex bg-white items-center border border-gray-300 rounded-sm w-full ${className} ${
        type === "file" ? "overflow-hidden" : ""
      }`}
    >
      {Icon && <span className="p-1">{<Icon className={iconColor} />}</span>}

      <input
     
        required={required}
        name={name}
        type={inputType()}
        value={type === "file" ? undefined : value} // Elimina value si es file
        onChange={onChange}
        placeholder={type === "file" ? undefined : placeholder} // No aplica placeholder para file
        disabled={disabled}
        className={`flex-1 p-1.5 md:p-2 focus:outline-none font-medium ${
          type === "file"
            ? "cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            : ""
        } ${classNameInput}`}
        aria-label={placeholder}
      />
      {type === "password" && (
        <span className="p-2 cursor-pointer" onClick={toggleShowPassword}>
          {showPassword ? (
            <AiFillEyeInvisible className="text-gray-500" />
          ) : (
            <AiFillEye className="text-gray-500" />
          )}
        </span>
      )}
    </div>
  );
};
