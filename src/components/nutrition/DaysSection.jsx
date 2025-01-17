import React from 'react';
import { Title } from '../ui/title/Title';
import { Macros } from './Macros';
import { TableDays } from './TableDays';
import { InfoNutri } from './InfoNutri';
export const DaysSection = ({ data }) => {
    const columns = ["Alimento", "Cantidad", "Medida", ""]
    const comidas = [{ name: "Desayuno", keys: "desayuno" }, { name: "Media Mañana", keys: "mediaMañana" }, { name: "Almuerzo", keys: "almuerzo" }, { name: "Media Tarde", keys: "mediaTarde" }, { name: "Cena", keys: "cena" }]
    return (
        <div className='mt-3'>
            {comidas.map((com, i) => {
                const alimentos = data[com.keys]
                return (
                    <div className='my-5  border-b-2 pb-4' key={i}>
                        <Title className={"text-customTextBlue text-center w-full justify-center"} title={com.name}></Title>
                        <div className='w-full flex flex-col  md:flex-row  md:justify-between md:items-center  '>
                            <div className='w-full md:w-2/3  flex justify-center'>
                                <TableDays arregloColumns={columns} arreglo={alimentos}></TableDays>

                            </div>
                            <Macros></Macros>
                        </div>
                        <InfoNutri></InfoNutri>
                    </div>

                )
            })}


        </div>
    );
};
