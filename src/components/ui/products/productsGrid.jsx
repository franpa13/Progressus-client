
import React, { useState } from "react";
import { ProductItem } from "./productItem";

export const ProductGrid = ({ products }) => {

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-10 mb-10">
      {products.map((product) => {
        return (
            <ProductItem key={product.id} product={product} ></ProductItem>
          
        );
      })}
    </div>
    
  );
};