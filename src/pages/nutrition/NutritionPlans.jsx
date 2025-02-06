import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CustomInput, Location, PatentTable, Title } from '../../components'
import { CiSearch } from 'react-icons/ci'
import { useGetPatents } from '../../service/nutrition/useGetPatents'
import { Button } from '../../components'
import { ModalAddPatent } from '../../components/nutrition/ModalAddPatent'
import { IoMdAdd } from 'react-icons/io'
const arregloCol = ["Nombre", "Edad", "Objetivo", "%Grasa", "Peso(kg)", "Acciones"]
const arreglo = [
    { nombre: "Juan Pérez", edad: 30, objetivo: "Perder peso", peso: 70, plan: "No" },
    { nombre: "Ana Gómez", edad: 25, objetivo: "Tonificar", peso: 58, plan: "SI" },
    { nombre: "Luis García", edad: 40, objetivo: "Ganar masa muscular", peso: 85, plan: "Si" },
    { nombre: "María López", edad: 35, objetivo: "Mantener forma", peso: 62, plan: "Si" },
    { nombre: "Pedro Sánchez", edad: 28, objetivo: "Definición", peso: 76, plan: "Si" },
    { nombre: "Laura Torres", edad: 22, objetivo: "Perder peso", peso: 60, plan: "No" },
];
export const NutritionPlans = () => {
    const [patents, setPatents] = useState([]);
    const [findElement, setFindElement] = useState("");
    const [loading, setLoading] = useState(false)
    const [addPatent, setAddPatent] = useState(false)
    const handleChange = (e) => {
        setFindElement(e.target.value);
    };
    useEffect(() => {
        setLoading(true)
        const traerPacientes = async () => {
            try {
                const data = await useGetPatents();
                setPatents(data.data);
            } catch (e) {
                console.log(e, "errores");

            }
            finally {
                setLoading(false)
            }
        }
        traerPacientes();
    }, []);
    console.log(patents, "patents");
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

                <section className="flex justify-between items-start p-3 mb-4">
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
                    <div className="flex mt-2 md:mt-0 justify-end">
                        <Button
                            onClick={() => setAddPatent(true)}
                            className="flex justify-start items-center gap-1"
                            Icon={IoMdAdd}
                            label="Añadir paciente"
                        />
                    </div>
                </section>

                <PatentTable setPatents={setPatents} loading={loading} arregloColumns={arregloCol} arreglo={patents}></PatentTable>
            </section>
            <ModalAddPatent setPatents={setPatents} open={addPatent} setOpen={setAddPatent}></ModalAddPatent>
        </MainLayout>
    )
}
