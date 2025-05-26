import React, { useState } from 'react'

import { Location } from '../ui/location/Location'
import { Title } from '../ui/title/Title'

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DaysSection } from './DaysSection'
export const SectionPlanSocio = ({ plan }) => {
    
    
    const [selectNav, setSelectNav] = useState("Lunes")
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return (

        <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
            <div className="b p-3">
                <Location
                    route={`Planes nutricionales`}
                    subroute={"Mi Plan"}
                ></Location>

                <Title title={"Mi plan nutricional"}></Title>
            </div>
            {/* DIVISION GRAY */}
            <div className="w-full h-2 md:h-4 bg-customGray"></div>
            {/* ////////////////////////////////////////////// */}
            <section className="p-3 mb-4">
                <div className="flex flex-row-reverse justify-between items-start py-2 pb-4 md:pb-0 md:py-4">
                    <Title title={plan?.nombre}></Title>
                    <div
                        className="w-1/12  md:w-[50px] flex justify-center items-center py-1 rounded text-white  bg-customNavBar hover:bg-customTextGreen"

                    >
                        <CalendarMonthOutlinedIcon className="text-lg font-semibold md:text-2xl " />
                    </div>
                </div>
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
                {
                    plan?.dias?.map((plan) => {
                        if (plan.dia === selectNav) {
                            return (
                                <div key={plan.dia}>
                                    <DaysSection dataPlan={plan} day={plan.dia} data={plan.comidas}></DaysSection>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </section>
        </section>

    )
}
