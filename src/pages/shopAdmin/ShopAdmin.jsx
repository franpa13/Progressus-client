import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Location,
  Title,
  TableStock,
  Button,
  CustomInput,
  ModalAddProd,
  SnackbarDefault,
} from "../../components";
import { useGetAllProducts } from "../../service/shop/useGetAllProducts";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export const ShopAdmin = () => {
  const [alertAddProd, setAlertAddProd] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [findElement, setFindElement] = useState("");
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const traerProducts = async () => {
      try {
        const traerProd = await useGetAllProducts();
        const allProducts = traerProd?.data.value || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoadSkeleton(false);
      }
    };
    traerProducts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFindElement(value);
    // Filtrar productos en tiempo real
    const filtered = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(value) ||
        product.descripcion.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const arregloCol = ["Nombre", "Descripcion", "Stock", "Precio", "Modificar"];

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Shop`}
            subroute={"Administrar productos"}
          ></Location>
          <Title title={"Shop"}></Title>
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          <div className="md:flex md:justify-end">
            <div className="md:w-2/3 md:flex md:justify-end md:items-center md:gap-5">
              <div className="bg-red-500 w-[320px]">
                <CustomInput
                  classNameInput="md:p-1.5"
                  className="border-gray-300 md:p-0"
                  Icon={CiSearch}
                  placeholder="Buscar"
                  value={findElement}
                  onChange={handleChange}
                ></CustomInput>
              </div>
              <Button
                onClick={() => setModal(true)}
                Icon={IoMdAdd}
                className="md:py-[11px] md:px-5 cursor-pointer flex flex-row-reverse items-center gap-1 text-sm"
                label={"Agregar producto"}
                classNameIcon={"text-xl md:text-lg"}
              ></Button>
            </div>
          </div>
        </section>
        {/* Pasar la lista filtrada a la tabla */}
        <TableStock
         setData={setFilteredProducts}
          loading={loadSkeleton}
          arregloColumns={arregloCol}
          arreglo={filteredProducts}
        ></TableStock>
      </section>
      <ModalAddProd
        setFilteredProducts={setFilteredProducts}
        setProd={setProducts}
        setAlertAddProd={setAlertAddProd}
        open={modal}
        setOpen={setModal}
      ></ModalAddProd>
      <SnackbarDefault
        severity={"success"}
        message={"Producto agregado correctamente"}
        open={alertAddProd}
        setOpen={setAlertAddProd}
      ></SnackbarDefault>
    </MainLayout>
  );
};
