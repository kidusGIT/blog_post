import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  className,
  containerClass,
  isTextArea = false,
  value,
}) => {
  return (
    <div className={containerClass}>
      {isTextArea ? (
        <textarea
          name={name}
          cols="30"
          rows="10"
          placeholder={placeholder}
          className={className}
          defaultValue={value}
        ></textarea>
      ) : (
        <input
          className={className}
          defaultValue={value}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
