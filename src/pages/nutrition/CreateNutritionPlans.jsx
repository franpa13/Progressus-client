import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { Location, Title, DaysSection, SnackbarDefault } from '../../components'
import { useCrearPlan, useStorePlanForView } from '../../store/useStoreNutrition'
import { useStoreNutrition } from '../../store/useStoreNutrition'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardReturn } from 'react-icons/md'
export const CreateNutritionPlans = () => {
    const nombrePlanNutrition = useStoreNutrition(state => state.nombrePlanNutrition);
    const isEditable = useStorePlanForView((state) => state.isEditable);
    const setAlimentos = useCrearPlan((state) => state.setAlimentos);
    // SOLO PARA VER
    const planForView = useStorePlanForView(state => state.planForView);
 const [alert, setAlert] = useState(false)
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const nutritionPlan = [
        {
            dia: "Lunes",
            comidas: {
                desayuno: [{ alimento: "Pan integral", cantidad: 2, medida: "rebanadas" }],
                mediaMañana: [{ alimento: "Fruta (Manzana)", cantidad: 1, medida: "pieza" }],
                almuerzo: [
                    { alimento: "Pollo a la plancha", cantidad: 150, medida: "gramos" },
                    { alimento: "Arroz integral", cantidad: 100, medida: "gramos" },
                    { alimento: "Verduras al vapor", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Yogur natural", cantidad: 1, medida: "vaso" }],
                cena: [
                    { alimento: "Sopa de verduras", cantidad: 1, medida: "plato" },
                    { alimento: "Pan integral", cantidad: 1, medida: "rebanada" }
                ]
            }
        },
        {
            dia: "Martes",
            comidas: {
                desayuno: [{ alimento: "Cereal integral", cantidad: 50, medida: "gramos" }],
                mediaMañana: [{ alimento: "Fruta (Pera)", cantidad: 1, medida: "pieza" }],
                almuerzo: [
                    { alimento: "Pescado al horno", cantidad: 200, medida: "gramos" },
                    { alimento: "Puré de papa", cantidad: 100, medida: "gramos" },
                    { alimento: "Ensalada mixta", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Nueces", cantidad: 20, medida: "gramos" }],
                cena: [
                    { alimento: "Tortilla de espinaca", cantidad: 1, medida: "pieza" },
                    { alimento: "Pan integral", cantidad: 1, medida: "rebanada" }
                ]
            }
        },
        {
            dia: "Miercoles",
            comidas: {
                desayuno: [{ alimento: "Avena", cantidad: 40, medida: "gramos" }],
                mediaMañana: [{ alimento: "Fruta (Plátano)", cantidad: 1, medida: "pieza" }],
                almuerzo: [
                    { alimento: "Carne de res", cantidad: 150, medida: "gramos" },
                    { alimento: "Quinoa", cantidad: 100, medida: "gramos" },
                    { alimento: "Brócoli al vapor", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Leche descremada", cantidad: 1, medida: "taza" }],
                cena: [
                    { alimento: "Crema de zanahoria", cantidad: 1, medida: "plato" },
                    { alimento: "Pan integral", cantidad: 1, medida: "rebanada" }
                ]
            }
        },
        {
            dia: "Jueves",
            comidas: {
                desayuno: [{ alimento: "Tostadas integrales", cantidad: 2, medida: "rebanadas" }],
                mediaMañana: [{ alimento: "Fruta (Naranja)", cantidad: 1, medida: "pieza" }],
                almuerzo: [
                    { alimento: "Pollo al curry", cantidad: 150, medida: "gramos" },
                    { alimento: "Arroz basmati", cantidad: 100, medida: "gramos" },
                    { alimento: "Ensalada verde", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Barra de granola", cantidad: 1, medida: "pieza" }],
                cena: [
                    { alimento: "Sopa de pollo", cantidad: 1, medida: "plato" },
                    { alimento: "Pan integral", cantidad: 1, medida: "rebanada" }
                ]
            }
        },
        {
            dia: "Viernes",
            comidas: {
                desayuno: [{ alimento: "Huevos revueltos", cantidad: 2, medida: "piezas" }],
                mediaMañana: [{ alimento: "Fruta (Kiwi)", cantidad: 2, medida: "piezas" }],
                almuerzo: [
                    { alimento: "Pechuga de pollo", cantidad: 150, medida: "gramos" },
                    { alimento: "Pasta integral", cantidad: 100, medida: "gramos" },
                    { alimento: "Verduras salteadas", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Almendras", cantidad: 15, medida: "piezas" }],
                cena: [
                    { alimento: "Tacos de pescado", cantidad: 2, medida: "piezas" },
                    { alimento: "Ensalada de col", cantidad: 1, medida: "plato" }
                ]
            }
        },
        {
            dia: "Sabado",
            comidas: {
                desayuno: [{ alimento: "Pan francés", cantidad: 2, medida: "rebanadas" }],
                mediaMañana: [{ alimento: "Fruta (Mango)", cantidad: 1, medida: "pieza" }],
                almuerzo: [
                    { alimento: "Lasaña de verduras", cantidad: 1, medida: "porción" },
                    { alimento: "Ensalada verde", cantidad: 1, medida: "plato" }
                ],
                mediaTarde: [{ alimento: "Batido de proteínas", cantidad: 1, medida: "vaso" }],
                cena: [
                    { alimento: "Pizza casera", cantidad: 2, medida: "rebanadas" },
                    { alimento: "Ensalada César", cantidad: 1, medida: "plato" }
                ]
            }
        }
    ];
    console.log(planForView, "planForView");
    // useEffect(() => {
    //     if (isEditable) {
    //         setAlimentos(planForView.dias)
    //     }
    // }, [])

    const [selectNav, setSelectNav] = useState("Lunes")
    return (
        <MainLayout >
            <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
                <div className="b p-3">
                    <Location
                        route={`Pacientes`}
                        subroute={"Crear Plan"}
                    ></Location>

                    <Title title={"Nuevo Plan de nutricion"}></Title>
                </div>
                {/* DIVISION GRAY */}
                <div className="w-full h-2 md:h-4 bg-customGray"></div>
                {/* ////////////////////////////////////////////// */}
                <section className='p-3'>

                    <div className="flex flex-row-reverse justify-between items-start py-2 pb-4 md:pb-0 md:py-4">
                        <Title title={nombrePlanNutrition == null ? planForView.nombre : nombrePlanNutrition}></Title>

                        <Link
                            className="w-1/12  md:w-[50px] flex justify-center items-center py-1 rounded text-white  bg-customNavBar hover:bg-customTextGreen"
                            to={"/plansnutrition"}
                        >
                            <MdOutlineKeyboardReturn className="text-lg font-semibold md:text-2xl " />
                        </Link>
                    </div>
                    <span className={"font-semibold flex text-center mb-5 w-full justify-center gap-1"}>
                        Nota: El plan se guarda en el día <span className='text-customTextBlue'>Sábado</span>
                    </span>
                    <div className="flex flex-wrap justify-between md:justify-center  w-full md:gap-10">
                        {days.map((day, i) => {
                            return (

                                <span
                                    key={i}
                                    onClick={() => setSelectNav(day)}
                                    className={`transition-all font-bold cursor-pointer p-1  ${selectNav === day &&
                                        "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
                                        }`}
                                >
                                    {day}
                                </span>
                            )
                        })}

                    </div>

                    {nombrePlanNutrition == null ? (
                        planForView.dias.map((plan) => {
                            if (plan.dia === selectNav) {
                                return (
                                    <div key={plan.dia}>
                                        <DaysSection dataPlan={plan} day={plan.dia} data={plan.comidas}></DaysSection>
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (

                        <DaysSection setAlert={setAlert} day={selectNav} data={[]}></DaysSection>

                    )}



                </section>
            </section>
            <SnackbarDefault open={alert} setOpen={setAlert} message="El plan se guardo correctamente" />
        </MainLayout>
    )
}
