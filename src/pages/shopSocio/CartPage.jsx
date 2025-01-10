import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import useStoreCart from "../../store/useStoreCart";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { BsCartX } from "react-icons/bs";
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
  console.log(cart, "cart");

  return (
    <MainLayout>
      <div className="min-h-screen animate-fade-in-down md:mx-auto  rounded shadow-xl w-full overflow-hidden mb-20 p-3">
        <Link
          className="w-1/12  md:w-[50px] flex justify-center items-center py-1 rounded text-white  bg-customNavBar hover:bg-customTextGreen"
          to={"/shopsocio"}
        >
          <MdOutlineKeyboardReturn className="text-lg font-semibold md:text-2xl " />
        </Link>
        <div className="container mx-auto ">
          <h1 className="flex  gap-4 text-2xl font-semibold mb-4 mt-3">
            Carrito de compras

          </h1>
          <div className="flex flex-col md:flex-row  gap-4">
            {/* Lista de productos */}
            <div className="md:w-3/4 mr-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center mt-10 justify-center">
                  <p className="text-customTextBlue text-xl">Su carrito está vacío.</p>
                  <BsCartX className="text-5xl md:text-9xl font-semibold mt-8"></BsCartX>

                </div>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className=" flex justify-between rounded-xl shadow-lg p-3  mb-4"
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
                        <p>Precio: ${product?.precio * product?.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
            {/* Resumen del carrito */}
            <div className="w-full mt-6 md:mt-0 md:w-1/3">
              <div className=" rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold mb-1">Resumen</h2>
                  <SellOutlinedIcon className='text-customTextBlue'></SellOutlinedIcon>
                </div>
                <hr className="py-[0.4px] rounded-lg bg-gray-700" />
                {cart?.length > 0 && cart.map((prod) => {
                  return (

                    <div className="flex justify-between mb-2 mt-2">
                      <span className="font-semibold">{prod.nombre}</span>
                      <span className="font-semibold">
                        ${prod?.precio * prod?.quantity}
                      </span>
                    </div>
                  )
                })}
                <hr className="py-[0.4px] rounded-lg bg-gray-700" />
                <div className="flex justify-between  text-2xl mb-6 mt-2 bg ">

                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-center text-center">

                  {cart.length === 0 ? (
                    <button
                      disabled
                      className="w-full bg-gray-500 font-semibold text-white py-2 px-4 rounded-lg"
                    >
                      Pagar
                    </button>
                  ) : (
                    <Link
                      to={"/shopsocio/cart/checkout"}
                      className="w-full bg-blue-500 font-semibold hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                      Pagar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
