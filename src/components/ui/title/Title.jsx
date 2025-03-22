import React from "react";

export const Title = ({ title, icon ,className }) => {
  return (
    <div>
      <h1 className={`text-lg md:text-2xl xl:text-3xl font-semibold flex items-center gap-1 ${className}`}>
        {title}
        {icon && icon}
      </h1>
    </div>
  );
};
