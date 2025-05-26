import React from 'react';

export const Macros = ({ day, macros }) => {
  console.log(macros, "macros del dia ", day);

  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm md:w-1/3 mx-auto mt-5">
      <table className="w-full text-sm leading-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center font-medium text-gray-600">Nutriente</th>
            <th className="py-3 px-4 text-center font-medium text-gray-600">Cantidad(gr)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 px-4 text-center font-medium text-gray-600">Calorías</td>
            <td className="py-3 px-4 text-center">{macros.kcal ? macros.kcal.toFixed(2) : (<>...</>)}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-center font-medium text-gray-600">Carbohidratos</td>
            <td className="py-3 px-4 text-center">{macros.hc? macros.hc.toFixed(2) : (<>...</>) }</td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-center font-medium text-gray-600 pl-8">Grasas</td>
            <td className="py-3 px-4 text-center">{macros.grasas ? macros.grasas.toFixed(2) : (<>...</>)}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-center font-medium text-gray-600 pl-8">Proteínas</td>
            <td className="py-3 px-4 text-center">{macros.prot? macros.prot.toFixed(2) : (<>...</>)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
