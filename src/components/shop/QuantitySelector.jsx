import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const QuantitySelector = ({ id, quantity, maxQuantity,updateQuantityTwo, updateQuantity ,noExist}) => {
  const [count, setCount] = useState(quantity);

  
  const handleIncrement = () => {
    if (count < maxQuantity) {
      const newCount = count + 1;
      setCount(newCount);
      if(noExist){
        updateQuantityTwo(newCount)
      }
      updateQuantity(id, newCount);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      if(noExist){
        updateQuantityTwo(newCount)
      }
      updateQuantity(id, newCount);
    }
  };

  return (
    <div className="flex items-center">
      <button>
        <IoRemoveCircleOutline
          className="cursor-pointer"
          onClick={handleDecrement}
          size={27}
        />
      </button>
      <span className="w-12 mx-3 px-1 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button>
        <IoAddCircleOutline
          className="cursor-pointer"
          onClick={handleIncrement}
          size={27}
        />
      </button>
    </div>
  );
};
