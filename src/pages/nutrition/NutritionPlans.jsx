import React, { useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CustomInput, Location, TableNutrition, Title } from '../../components'
import { CiSearch } from 'react-icons/ci'
const arregloCol = ["Nombre", "Edad", "Objetivo", "Peso", "Plan", "Opciones"]
const arreglo = [
    { nombre: "Juan Pérez", edad: 30, objetivo: "Perder peso", peso: "70kg", plan: "Plan A" },
    { nombre: "Ana Gómez", edad: 25, objetivo: "Tonificar", peso: "58kg", plan: "Plan B" },
    { nombre: "Luis García", edad: 40, objetivo: "Ganar masa muscular", peso: "85kg", plan: "Plan C" },
    { nombre: "María López", edad: 35, objetivo: "Mantener forma", peso: "62kg", plan: "Plan D" },
    { nombre: "Pedro Sánchez", edad: 28, objetivo: "Definición", peso: "76kg", plan: "Plan E" },
    { nombre: "Laura Torres", edad: 22, objetivo: "Perder peso", peso: "60kg", plan: "Plan A" },
];
export const NutritionPlans = () => {
    const [findElement, setFindElement] = useState("");
    const handleChange = (e) => {
        setFindElement(e.target.value);
    };
    // BUSCAR ELEMENTO
    return (
        <MainLayout>
            <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
                <div className="b p-3">
                    <Location
                        route={`Pacientes`}
                        subroute={"Mis Pacientes"}
                    ></Location>

                    <Title title={"Pacientes"}></Title>
                </div>
                {/* DIVISION GRAY */}
                <div className="w-full h-2 md:h-4 bg-customGray"></div>
                {/* ////////////////////////////////////////////// */}
                <section className="p-3 mb-4">
                    <div className='flex justify-end md:w-1/5'>

                    <CustomInput
                        classNameInput="md:p-1.5"
                        className="border-gray-300 md:p-0"
                        Icon={CiSearch}
                        placeholder="Buscar"
                        value={findElement}
                        onChange={handleChange}
                    ></CustomInput>
                    </div>
                </section>
                <TableNutrition arregloColumns={arregloCol} arreglo={arreglo}></TableNutrition>
            </section>
        </MainLayout>
    )
}
