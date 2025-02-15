import React from 'react';
import imgNutri from "/imgnutri-min.jpg";
import { Title } from '../ui/title/Title';

export const WaitPlan = () => {
    return (
        <div className="flex flex-col justify-start items-center w-full mt-20 text-center p-4">
            <img className="w-1/6 md:w-1/12 rounded-md mb-4" src={imgNutri} alt="Nutrición" />
            <Title title="Aún no se te ha asignado un plan nutricional. Mantente atento a las notificaciones." />
        </div>
    );
};
