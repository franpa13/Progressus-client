import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { CustomInput, Location, Title } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import { ProductGrid } from "../../components";
import { useGetAllProducts } from "../../service/shop/useGetAllProducts";
import useStoreCart from "../../store/useStoreCart";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export const ShopSocio = () => {
  const [products, setProducts] = useState([]);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

 
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product?.nombre?.toLowerCase().includes(query) ||
      product?.id?.toString().includes(query)
    );
  });

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="flex justify-between items-center p-3">
          <div>
            <Location route="Tienda" subroute="Todos los productos" />
            <Title title="Tienda" />
          </div>
          <Link
            to={"/shopsocio/cart"}
            className="relative cursor-pointer rounded transition-all p-1"
          >
            <span className="absolute text-xs rounded-full px-1 font-bold -top-1 bg-red-700 text-white -right-1">
              {cart?.length}
            </span>
            <FiShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
        </div>

        {/* DIVISIÓN GRIS */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>

        <section className="p-3">
          <div className="flex justify-start mb-4 w-1/5">
            <CustomInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              Icon={CiSearch}
              placeholder="Buscar producto por nombre..."
            />
          </div>

          <ProductGrid
            loadSkeleton={loadSkeleton}
            products={filteredProducts}
          />
        </section>
      </section>
    </MainLayout>
  );
};
