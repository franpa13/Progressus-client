import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import useStoreCart from "../../store/useStoreCart";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardReturn } from "react-icons/md";

export const CartPage = () => {
  const cart = useStoreCart((state) => state.cart);
  const removeFromCart = useStoreCart((state) => state.removeFromCart);
  // Calcular el subtotal del carrito
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };
  const deleteItem = (id) => {
    removeFromCart(id);
  };
  return (
    <MainLayout>
      <div className="min-h-screen animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20 p-3">
        <Link
          className="w-1/12  md:w-1/12 flex justify-center items-center py-1 rounded text-black hover:text-white bg-customGreenLigth hover:bg-customTextGreen"
          to={"/shopsocio"}
        >
          <MdOutlineKeyboardReturn className="text-lg md:text-2xl " />
        </Link>
        <div className="container mx-auto ">
          <h1 className="text-2xl font-semibold mb-4 mt-3">
            Carrito de compras
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Lista de productos */}
            <div className="md:w-3/4">
              {cart.length === 0 ? (
                <p>Su carrito está vacío.</p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white flex justify-between rounded-lg shadow-md p-6 mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 mr-4"
                        src={product.imagenUrl}
                        alt={product.nombre}
                      />
                      <div>
                        <h2 className="font-semibold">{product.nombre}</h2>
                        <p>Cantidad: {product.quantity}</p>
                        {product.talle == "" ||
                        !product.talle ||
                        product.talle == "string" ? (
                          <></>
                        ) : (
                          <p>Talle : {product?.talle || ""}</p>
                        )}
                        <p>Precio: ${product.precio}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
            {/* Resumen del carrito */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Resumen</h2>

                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
