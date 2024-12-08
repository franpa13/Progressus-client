import React from "react";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const QuantitySelector = ({ quantity, maxQuantity }) => {
  const [count, setCount] = useState(quantity);
  return (
    <div className="flex items-center  ">
      <button>
        <IoRemoveCircleOutline
          className="cursor-pointer"
          onClick={() => count > 1 && setCount(count - 1)}
          size={27}
        ></IoRemoveCircleOutline>
      </button>
      <span className="w-12 mx-3 px-1 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button>
        <IoAddCircleOutline
          className="cursor-pointer"
          onClick={() => count < maxQuantity && setCount(count + 1)}
          size={27}
        ></IoAddCircleOutline>
      </button>
    </div>
  );
};
