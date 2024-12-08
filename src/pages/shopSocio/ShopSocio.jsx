import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Location, Title } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import { ProductGrid } from "../../components";
import { useGetAllProducts } from "../../service/shop/useGetAllProducts";
import useStoreCart from "../../store/useStoreCart";
import { SnackbarDefault } from "../../components";
import alertToCartStore from "../../store/alertToCart";
import { Link } from "react-router-dom";
export const ShopSocio = () => {
  const alertToCart = alertToCartStore(state=>state.alertToCart)
  const setAlertToCart = alertToCartStore(state=>state.setAlertToCart)
  const [products, setProducts] = useState([]);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const cart = useStoreCart((state) => state.cart);
  useEffect(() => {
    const traerProducts = async () => {
      try {
        const traerProd = await useGetAllProducts();

        setProducts(traerProd?.data.value || []);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoadSkeleton(false);
      }
    };
    traerProducts();
  }, []);

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="flex justify-between items-center p-3">
          <div>
            <Location
              route={`Tienda`}
              subroute={"Todos los productos"}
            ></Location>

            <Title title={"Tienda"}></Title>
          </div>
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
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3">
          <ProductGrid
            setAlertToCart={setAlertToCart}
            loadSkeleton={loadSkeleton}
            products={products}
          ></ProductGrid>
        </section>
      </section>
 
    </MainLayout>
  );
};
