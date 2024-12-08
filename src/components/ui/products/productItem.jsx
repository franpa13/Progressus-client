import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
export const ProductItem = ({ product }) => {
  console.log(product, " product");

  return (
    <Link
      to={`/shopsocio/product/${product?.id}`}
      className="rounded overflow-hidden shadow-lg flex flex-col"
    >
      <a href="#"></a>
      <div className="relative">
        <a href="#">
          <img
            className={`w-full h-80 md:h-72 object-cover`}
            src={product.imagenUrl}
            alt="Sunset in the mountains"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
        <a href="#!">
          <div className="text-xs absolute top-0 right-0 bg-customTextBlue px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-black transition duration-500 ease-in-out">
            {product.categoria}
          </div>
        </a>
      </div>
      <div className="px-3 py-2 mb-auto">
        <a
          href="#"
          className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
        >
          {product.nombre}
        </a>
        <p className="text-gray-500 text-sm">{product.descripcion}</p>
      </div>
      {product.popular && (
        <div className="px-2 py-2 flex flex-row items-center justify-between ">
          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <FcLike></FcLike>
            <span className="ml-1"> Popular</span>
          </span>
        </div>
      )}
    </Link>
  );
};
