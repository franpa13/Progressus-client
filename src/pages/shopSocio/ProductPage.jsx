import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useGetProductById } from "../../service/shop/useGetProductById";
import { useSpinnerStore } from "../../store";
import { QuantitySelector, SnackbarDefault } from "../../components";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { LoadingSkeleton } from "../../components";
import { SizeSelector } from "../../components/shop/SizeSelector";

import { FaRegCircleCheck } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import useStoreCart from "../../store/useStoreCart";
import alertToCartStore from "../../store/alertToCart";
export const ProductPage = () => {
  const [alertCart, setAlertCart] = useState(false);
  const [prod, setProd] = useState(null);
  const { id } = useParams();
  const updateQuantity = useStoreCart((state) => state.updateQuantity);
  const openSpinner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [loading, setLoading] = useState(true);
  const cart = useStoreCart((state) => state.cart);

  const addCart = useStoreCart((state) => state.addToCart);
  useEffect(() => {
    openSpinner();
    const traerProd = async () => {
      try {
        const respProd = await useGetProductById(id);
        setProd(respProd?.data?.value || null);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        closeSpinner();
        setLoading(false); // Cambiar estado de carga
      }
    };
    traerProd();
  }, [id]);

  const selectSize = prod?.talle;

  const addToCart = () => {
    addCart(prod);
    setAlertCart(true);
  };


  return (
    <MainLayout>
      <div className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20 py-5">
        <div className="flex justify-start w-full md:w-full px-3">
          {loading ? (
            <LoadingSkeleton
              width={60}
              height={25}
              className={
                "w-1/12 md:w-2/3 flex justify-center items-center p-1 rounded "
              }
            ></LoadingSkeleton>
          ) : (
            <div className="w-full flex justify-between items-center">
              <Link
                className="w-1/12 md:w-1/12 flex justify-center items-center py-1 rounded text-black hover:text-white bg-customGreenLigth hover:bg-customTextGreen"
                to={"/shopsocio"}
              >
                <MdOutlineKeyboardReturn className="text-lg md:text-2xl " />
              </Link>
              <Link
                to={"/shopsocio/cart"}
                className=" relative cursor-pointer  rounded transition-all p-1"
              >
                <span className="absolute text-xs rounded-full px-1 font-bold -top-1 bg-red-700 text-white -right-1">
                  {cart?.length}
                </span>
                <FiShoppingCart className="w-6 h-6 md:w-7 md:h-7"></FiShoppingCart>
              </Link>
            </div>
          )}
        </div>

        {loading ? (
          // Skeletons de carga
          <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <LoadingSkeleton
                  variant="rectangular"
                  width="100%"
                  height={460}
                  className="mb-4"
                />
                <LoadingSkeleton
                  variant="rectangular"
                  width="50%"
                  height={50}
                  className="mb-4 mx-auto"
                />
              </div>
              <div className="md:flex-1 px-4">
                <LoadingSkeleton
                  variant="text"
                  count={1}
                  width="80%"
                  height={40}
                  className="mb-2"
                />
                <LoadingSkeleton
                  variant="text"
                  count={3}
                  width="50%"
                  height={40}
                />
                <LoadingSkeleton
                  variant="text"
                  count={3}
                  width="50%"
                  height={40}
                />
              </div>
            </div>
          </div>
        ) : (
          // Contenido del producto
          <div className="max-w-6xl mt-5 mx-auto px-4 sm:px-6 lg:px-8 text-lg font-semibold">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4 ">
                <div className="h-[460px] relative  bg-gray-300 mb-4">
                  <img
                    className="w-full h-full object-cover "
                    src={prod?.imagenUrl}
                    alt="Product Image"
                  />
                  <div className="hover:bg-transparent transition duration-300 rounded-lg absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </div>
              </div>
              <div className="md:flex-1 flex ml-4 flex-col gap-2 px-4">
                <h2 className="text-3xl font-semibold  mb-2">
                  {prod?.nombre || "Product Name"}
                </h2>
                <p className="text-gray-600 text-base mb-4">
                  {prod?.descripcion}
                </p>
                <div className="flex flex-col gap-3 mb-1">
                  <div className=" mr-4">
                    <span className=" ">Precio:</span>
                    <span className="font-semibold">
                      {" "}
                      $ {prod?.precio || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="">En stock :</span>
                    <span className="font-semibold">
                      {prod?.stock > 0 ? (
                        <FaRegCircleCheck className="text-customTextGreen"></FaRegCircleCheck>
                      ) : (
                        <MdOutlineCancel className="text-red-700 text-xl"></MdOutlineCancel>
                      )}
                    </span>
                  </div>
                </div>
                {/* <div className="mb-4">
                  <span className="font-bold text-gray-700">Select Color:</span>
                  <div className="flex items-center mt-2">
                    <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
                  </div>
                </div> */}
                {prod?.talle && (
                  <div className="mb-1">
                    <div className="flex items-center mt-2">
                      <SizeSelector selectedSize={selectSize}></SizeSelector>
                    </div>
                  </div>
                )}
                {prod.stock >= 1 && (
                  <div className="mb-1">
                    <div className="flex flex-col justify-center items-start mt-2">
                      <h2 className="mb-2">Cantidad</h2>
                      <QuantitySelector
                        id={prod.id}
                        quantity={1}
                        maxQuantity={prod.stock}
                        updateQuantity={updateQuantity}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <span className=" ">Marca:</span>
                  <p className=" text-base mt-1 font-semibold text-customTextGreen">
                    {prod?.marca}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start mt-4  items-end">
                  <div className="w-2/3 md:w-1/2 px-0">
                    <button
                      onClick={addToCart}
                      disabled={prod.stock == 0}
                      className={`w-full bg-customTextBlue hover:bg-blue-500 text-white py-2 px-2 rounded-xl font-medium`}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <SnackbarDefault
        open={alertCart}
        setOpen={setAlertCart}
        message={"Se añadio el producto al carrito de compras"}
        severity={"success"}
      ></SnackbarDefault>
    </MainLayout>
  );
};
