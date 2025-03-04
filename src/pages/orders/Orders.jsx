import React, { useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CustomInput, Location, Title, TableOrders } from '../../components'
import { CiSearch } from 'react-icons/ci'
const columns = ["ID" , "Fecha" , "Nombre del cliente" , "Precio" , "Estado" , "Opciones"]
const ordersData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  fecha: `2025-01-${(index % 31) + 1}`.padStart(10, '0'),
  nombreCliente: `Cliente ${index + 1}`,
  precio: `$${(Math.random() * 500).toFixed(2)}`,
  estado: index % 3 === 0 ? "Pendiente" : index % 3 === 1 ? "Completado" : "Cancelado",
  modificar: "Editar",
}));
export const Orders = () => {
  const [findElement, setFindElement] = useState("");
  const handleChange = (e) => {
    setFindElement(e.target.value);
  };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Pedidos`}
            subroute={"Gestionar pedidos"}
          ></Location>

          <Title title={"Pedidos"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <section className="p-3 mb-4">
          <div className='flex md:flex-row  flex-col justify-end items-start md:items-center md:gap-3 w-full'>
            <div>

              <CustomInput
                classNameInput="md:p-1.5"
                className="border-gray-300 md:p-0"
                Icon={CiSearch}
                placeholder="Buscar"
                value={findElement}
                onChange={handleChange}
              ></CustomInput>
            </div>

          </div>
        </section>
        <TableOrders arregloColumns={columns} arreglo={ordersData} ></TableOrders>
      </section>
    </MainLayout>
  )
}
