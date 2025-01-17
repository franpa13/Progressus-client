import React, { useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { Button, CustomInput, Location, Title } from '../../components'
import { TableNutrition } from '../../components'
import { CiSearch } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import { ModalAddFood } from '../../components'
const alimentos = [
  {
    alimento: "Manzana",
    porcion: "1 unidad (150g)",
    calorias: 95,
    carbohidratos: "25g",
    proteinas: "0.5g",
    grasas: "0.3g",
  },
  {
    alimento: "Pollo",
    porcion: "100g",
    calorias: 165,
    carbohidratos: "0g",
    proteinas: "31g",
    grasas: "3.6g",
  },
  {
    alimento: "Leche",
    porcion: "1 vaso (250ml)",
    calorias: 150,
    carbohidratos: "12g",
    proteinas: "8g",
    grasas: "8g",
  },
  {
    alimento: "Espinaca",
    porcion: "1 taza (30g)",
    calorias: 7,
    carbohidratos: "1.1g",
    proteinas: "0.9g",
    grasas: "0.1g",
  },
  {
    alimento: "Arroz integral",
    porcion: "1 taza (195g)",
    calorias: 216,
    carbohidratos: "45g",
    proteinas: "5g",
    grasas: "1.8g",
  },
];
const columnasAlimentos = [
  "Alimento",
  "Porción(gr)",
  "Calorías(kcal)",
  "Carbohidratos(gr)",
  "Proteínas(gr)",
  "Grasas(gr)",
  "Opciones",
];

export const Food = () => {
  const [findElement, setFindElement] = useState("");
  const [addElement, setAddElement] = useState(false)
  const handleChange = (e) => {
    setFindElement(e.target.value);
  };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Alimentos`}
            subroute={"Gestionar alimentos"}
          ></Location>

          <Title title={"Alimentos"}></Title>
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
            <div className="flex mt-2 md:mt-0 justify-end">
              <Button
                onClick={()=>setAddElement(true)}
                className="flex  justify-start items-center gap-1 "
                Icon={IoMdAdd}
                label={`Añadir alimentos`}
              ></Button>
            </div>
          </div>
        </section>
        <TableNutrition arreglo={alimentos} arregloColumns={columnasAlimentos} alimentos={true} ></TableNutrition>
        <ModalAddFood open={addElement} setOpen={setAddElement}></ModalAddFood>
      </section>
    </MainLayout>
  )
}
