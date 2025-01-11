import React from "react";

export const SizeSelector = ({ selectedSize, availableSizes }) => {
  console.log(selectedSize , "selectedSisze");
  
  return (
    <div className="my-1 ">
      <h3 className="">Talles Disponibles</h3>
      <div className="flex">
        <button className={"hover:underline text-lg font-smibold  underline"}>
          {selectedSize !== "string" ? selectedSize : ""}
        </button>
        {/* {availableSizes.map((size)=>{
           return (
            <button key={size} className={clsx("mx-2 hover:underline text-lg",{
                "underline": size === selectedSize
            })}>{size}</button>
           )
        })} */}
      </div>
    </div>
  );
};
