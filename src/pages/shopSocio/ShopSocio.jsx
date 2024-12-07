import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Location, Title } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import { ProductGrid } from "../../components";
import { useGetAllProducts } from "../../service/shop/useGetAllProducts";
export const ShopSocio = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const traerProducts = async () => {
      const traerProd = await useGetAllProducts();

      setProducts(traerProd?.data.value || []);
    };
    traerProducts();
  }, []);

  console.log(products, "products");
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
          <div
            to={"/notifications"}
            className=" hidden  md:block relative cursor-pointer  rounded transition-all p-1"
          >
            <span className="absolute text-xs rounded-full px-1 font-bold -top-1 bg-red-700 text-white -right-1">
              3
            </span>
            <FiShoppingCart className="w-9 h-9 md:w-7 md:h-7"></FiShoppingCart>
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3">
            <ProductGrid products={products}></ProductGrid>
        </section>
      </section>
    </MainLayout>
  );
};
