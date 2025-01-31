import React, { useEffect, useState } from 'react';
import { Title } from '../ui/title/Title';
import { Macros } from './Macros';
import { TableDays } from './TableDays';
import { InfoNutri } from './InfoNutri';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
import { SnackbarDefault } from '../ui/snackbar/Snackbar';
import { useCrearPlan, useStorePlanForView } from '../../store/useStoreNutrition';
import { useStoreDias } from '../../store/useStoreNutrition';
import { Tooltip } from '@mui/material';
import { createPlanNutrition } from '../../service/nutrition/createPlanNutrition';
import { RiAddCircleLine } from 'react-icons/ri';
import { useStoreNutrition } from '../../store/useStoreNutrition';
import { ModalAddFoodToPlan } from './ModalAddFoodToPlan';
export const DaysSection = ({ selectNav, editable, setAlert, dataPlan, data, day }) => {


    const alimentos = useCrearPlan((state) => state.alimentos);
    const setAlimentos = useCrearPlan((state) => state.setAlimentos);
    const [tipoComida, setTipoComida] = useState("")
    const [openAddFood, setOpenAddFood] = useState(false);
    const agregarDia = useStoreDias((state) => state.agregarDia);
    const isEditable = useStorePlanForView((state) => state.isEditable);
    const [loading, setLoading] = useState(false)
    const nombrePlan = useStoreNutrition((state) => state.nombrePlanNutrition);
    const [dia, setDia] = useState({
        dia: day,
        comidas: [
            {
                tipoComida: "Desayuno",
                alimentos: [],
            },
            {
                tipoComida: "Media Mañana",
                alimentos: [],
            },
            {
                tipoComida: "Almuerzo",
                alimentos: [],
            },
            {
                tipoComida: "Media Tarde",
                alimentos: [],
            },
            {
                tipoComida: "Cena",
                alimentos: [],
            },
        ],
    });

    const agregarAlimento = (tipoComida, alimento) => {
        setDia((prevDia) => ({
            ...prevDia,
            comidas: prevDia.comidas.map((comida) =>
                comida.tipoComida === tipoComida
                    ? {
                        ...comida,
                        alimentos: [...comida.alimentos, alimento],
                    }
                    : comida
            ),
        }));
    };



    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await createPlanNutrition(nombrePlan, alimentos);
            if (response.status == 200 || response.status == "209") {
                setAlert(true)

            }
            console.log(response, "Respuesta del servidor");
        } catch (error) {
            console.error("Error al crear el plan:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleClick = (tipoComida) => {
        console.log(tipoComida , "click");
        
        setOpenAddFood(true)


        setTipoComida(tipoComida)
    }


    const columnsEditable = ["Alimento", "Cantidad", "Medida", ""]
    const columns = ["Alimento", "Cantidad", "Medida"]
    const comidas = [{ name: "Desayuno", keys: "desayuno" }, { name: "Media Mañana", keys: "mediaMañana" }, { name: "Almuerzo", keys: "almuerzo" }, { name: "Media Tarde", keys: "mediaTarde" }, { name: "Cena", keys: "cena" }]
    return (
        <form className='mt-3'>

            {data.length > 0 ? data.map((com, i) => {

                console.log(com, "commm");

                const alimentos = data[com.tipoComida]
                return (
                    <div className='my-5  border-b-2 pb-4' key={i}>
                        <Title className={"text-customTextBlue text-center mb-5 w-full justify-center"} title={com.tipoComida}></Title>
                        {isEditable && (
                            <div className="flex justify-end">
                                <Tooltip title={`Añadir alimentos al ${com.name}`}>
                                    <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                                        <RiAddCircleLine
                                            onClick={() => handleClick(com.tipoComida)}
                                            className="cursor-pointer text-3xl text-white"
                                        />
                                    </span>
                                </Tooltip>
                            </div>
                        )}
                        <div className='w-full flex flex-col  md:flex-row  md:justify-between md:items-center  '>

                            <div className='w-full   flex items-center justify-center'>
                                <TableDays day={day} editable={editable} tipoComida={com.tipoComida} arregloColumns={isEditable ? columnsEditable : columns} arreglo={com.alimentos}></TableDays>

                            </div>
                            {/* <Macros></Macros> */}
                        </div>
                        <InfoNutri></InfoNutri>

                    </div>

                )
            }) : (

                <>
                    {comidas.map((comida, index) => {
                        // Filtrar solo los alimentos que pertenecen al día seleccionado
                        let alimentosFiltrados = alimentos
                            .filter(a => a.dia === day) // Filtra por el día
                            .flatMap(a => a.comidas) // Obtiene todas las comidas de ese día
                            .find(c => c.tipoComida === comida.name)?.alimentos || []; // Encuentra la comida y extrae los alimentos



                        return (
                            <div key={index} className='my-6'>
                                <Title className="text-customTextBlue text-center mb-5 w-full justify-center" title={comida.name} />

                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-end">
                                        <Tooltip title={`Añadir alimentos al ${comida.name}`}>
                                            <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                                                <RiAddCircleLine
                                                    onClick={() => handleClick(comida.name)}
                                                    className="cursor-pointer text-3xl text-white"
                                                />
                                            </span>
                                        </Tooltip>
                                    </div>

                                    {/* Renderizar alimentos filtrados */}
                                    <TableDays tipoComida={comida.name} day={day} arregloColumns={isEditable ? columnsEditable : columns} arreglo={alimentosFiltrados} />
                                </div>
                                <InfoNutri></InfoNutri>
                            </div>
                        );
                    })}
                </>




            )}
            {/* <div className='flex justify-end w-full'>
                <ButtonSpinner label='Guardar dia'></ButtonSpinner>

            </div> */}
            <ModalAddFoodToPlan editable ={editable} nombreDia={day} tipoComida={tipoComida} open={openAddFood} setOpen={setOpenAddFood}></ModalAddFoodToPlan>
            {day === "Sábado" && isEditable && !editable && <div className='flex justify-end w-full'>
                <ButtonSpinner onClick={handleSubmit} loading={loading} label='Guardar plan'></ButtonSpinner>
            </div>}




        </form>
    );
};
