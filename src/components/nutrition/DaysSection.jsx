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
import { useFoodById } from '../../service/nutrition/useFoodById';
import { useSpinnerStore } from '../../store';

export const DaysSection = ({ selectNav, editable, setAlert, dataPlan, data, day }) => {
    const showSpinner = useSpinnerStore((state) => state.showSpinner);
    const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
    const alimentos = useCrearPlan((state) => state.alimentos);
    const setAlimentos = useCrearPlan((state) => state.setAlimentos);
    const [tipoComida, setTipoComida] = useState("");
    const [openAddFood, setOpenAddFood] = useState(false);
    const agregarDia = useStoreDias((state) => state.agregarDia);
    const isEditable = useStorePlanForView((state) => state.isEditable);
    const [loading, setLoading] = useState(false);
    const nombrePlan = useStoreNutrition((state) => state.nombrePlanNutrition);
    const [calculoMacros, setCalculoMacros] = useState({
        kcal: 0,
        prot: 0,
        hc: 0,
        grasas: 0,
    });

    const dataLength = data.length;

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await createPlanNutrition(nombrePlan, alimentos);
            if (response.status == 200 || response.status == "209") {
                setAlert(true);
            }
            console.log(response, "Respuesta del servidor");
        } catch (error) {
            console.error("Error al crear el plan:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (tipoComida) => {
        setOpenAddFood(true);
        setTipoComida(tipoComida);
    };

    const columnsEditable = ["Alimento", "Cantidad", "Porcion(gr)", ""];
    const columns = ["Alimento", "Cantidad", "Porcion(gr)"];
    const comidas = [
        { name: "Desayuno", keys: "desayuno" },
        { name: "Media Mañana", keys: "mediaMañana" },
        { name: "Almuerzo", keys: "almuerzo" },
        { name: "Media Tarde", keys: "mediaTarde" },
        { name: "Cena", keys: "cena" },
    ];

    const calculateMacros = async (comidas) => {

        let totalKcal = 0;
        let totalProt = 0;
        let totalHc = 0;
        let totalGrasas = 0;

        // Recorrer cada comida
        for (const comida of comidas) {
            // Recorrer cada alimento en la comida
            for (const alimento of comida.alimentos) {


                try {
                    // Obtener los datos del alimento desde la API
                    const response = await useFoodById(alimento.alimentoId);

                    console.log(response.data, "response de data");

                    const foodData = response.data;

                    // Calcular los valores nutricionales basados en la cantidad
                    totalKcal += foodData.calorias * alimento.cantidad;
                    totalProt += foodData.proteinas * alimento.cantidad;
                    totalHc += foodData.carbohidratos * alimento.cantidad;
                    totalGrasas += foodData.grasas * alimento.cantidad;
                } catch (error) {
                    console.error("Error al obtener los datos del alimento:", error);
                }
            }
        }

        // Actualizar el estado con los valores totales
        setCalculoMacros({
            kcal: totalKcal,
            prot: totalProt,
            hc: totalHc,
            grasas: totalGrasas,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            await calculateMacros(data);
        };

        fetchData();
    }, [data]);


    return (
        <form className='mt-3'>
            {data.length > 0 ? (
                data.map((com, i) => {


                    const alimentos = data[com.tipoComida];
                    return (
                        <div className='mb-28 pb-12 border-b-2 ' key={i}>
                            <h1>editar</h1>
                            <h1 className={"text-3xl lg:text-4xl underline text-black font-semibold  text-center mb-5 w-full justify-center"} > {com.tipoComida}</h1>
                            {isEditable && (
                                <div className="flex justify-end">
                                    <Tooltip className='mb-4' title={`Añadir alimentos al ${com.name ? com?.name : com?.tipoComida}`}>
                                        <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                                            <RiAddCircleLine
                                                onClick={() => handleClick(com.tipoComida)}
                                                className="cursor-pointer text-3xl text-white"
                                            />
                                        </span>
                                    </Tooltip>
                                </div>
                            )}
                            <div className='flex w-full justify-center items-center'>

                                <TableDays openAdd={openAddFood} day={day} editable={editable} tipoComida={com.tipoComida} arregloColumns={isEditable ? columnsEditable : columns} arreglo={com.alimentos} />
                            </div>
                            <div className='w-full flex justify-center'>
                                <InfoNutri index={i} setCalculoMacros={setCalculoMacros} comidas={com.alimentos} />

                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    {comidas.map((comida, index) => {

                        let alimentosFiltrados = alimentos
                            .filter(a => a.dia === day)
                            .flatMap(a => a.comidas)
                            .find(c => c.tipoComida === comida.name)?.alimentos || [];

                        return (
                            <div className='mb-28 pb-12 border-b-2 ' key={index}>
                                <h1 className={"text-3xl lg:text-4xl underline text-black font-semibold  text-center mb-5 w-full justify-center"} > {comida.name}</h1>
                                {isEditable && (
                                    <div className="flex justify-end">
                                        <Tooltip className='mb-4' title={`Añadir alimentos al ${comida.name}`}>
                                            <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                                                <RiAddCircleLine
                                                    onClick={() => handleClick(com.tipoComida)}
                                                    className="cursor-pointer text-3xl text-white"
                                                />
                                            </span>
                                        </Tooltip>
                                    </div>
                                )}
                                <div className='flex w-full justify-center items-center'>

                                    <TableDays openAdd={openAddFood} tipoComida={comida.name} day={day} arregloColumns={isEditable ? columnsEditable : columns} arreglo={alimentosFiltrados} />
                                </div>
                                <div className='w-full flex justify-center'>
                                    <InfoNutri index={index} setCalculoMacros={setCalculoMacros} comidas={alimentosFiltrados} />

                                </div>
                            </div>
                            // <div key={index} className='mb-28 pb-12 border-b-2 ' >
                            //     <h1 className={"text-3xl lg:text-4xl underline text-black font-semibold  text-center mb-5 w-full justify-center"} > {comida.name}</h1>
                            //     <div className="flex flex-col gap-5">
                            //         <div className="flex justify-end">
                            //             <Tooltip className='mb-4' title={`Añadir alimentos al ${comida.name}`}>
                            //                 <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                            //                     <RiAddCircleLine
                            //                         onClick={() => handleClick(comida.name)}
                            //                         className="cursor-pointer text-3xl text-white"
                            //                     />
                            //                 </span>
                            //             </Tooltip>
                            //         </div>
                            //         <div className='flex w-full justify-center items-center'>
                            //             <TableDays openAdd={openAddFood} tipoComida={comida.name} day={day} arregloColumns={isEditable ? columnsEditable : columns} arreglo={alimentosFiltrados} />
                            //         </div>
                            //     </div>
                            //     <InfoNutri index={index} setCalculoMacros={setCalculoMacros} comidas={alimentosFiltrados} />
                            // </div>
                        );
                    })}
                </>
            )}
            <ModalAddFoodToPlan editable={editable} nombreDia={day} tipoComida={tipoComida} open={openAddFood} setOpen={setOpenAddFood} />
            {day === "Sábado" && isEditable && !editable && (
                <div className='flex justify-end w-full'>
                    <ButtonSpinner onClick={handleSubmit} loading={loading} label='Guardar plan' />
                </div>
            )}
            <div className='flex flex-col items-center justify-center'>
                <Title className={"text-customTextGreen"} title={`Información nutricional del día ${day}`} />
                <Macros day={day} macros={calculoMacros} />
            </div>
        </form>
    );
};