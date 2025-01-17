import React from 'react'

export const Macros = () => {
  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm md:w-1/3 mx-auto mt-16">
    <table className="w-full text-sm leading-5">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-left font-medium text-gray-600">Nutrient</th>
          <th className="py-3 px-4 text-left font-medium text-gray-600">Amount per Serving (100g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-3 px-4 text-left font-medium text-gray-600">Calories</td>
          <td className="py-3 px-4 text-left">240</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-left font-medium text-gray-600">Total Fat</td>
          <td className="py-3 px-4 text-left">12g</td>
        </tr>
        <tr>
          <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">Saturated Fat</td>
          <td className="py-3 px-4 text-left">3.5g</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">Trans Fat</td>
          <td className="py-3 px-4 text-left">0g</td>
        </tr>
        <tr>
          <td className="py-3 px-4 text-left font-medium text-gray-600">Cholesterol</td>
          <td className="py-3 px-4 text-left">45mg</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-left font-medium text-gray-600">Sodium</td>
          <td className="py-3 px-4 text-left">430mg</td>
        </tr>
        <tr>
          <td className="py-3 px-4 text-left font-medium text-gray-600">Total Carbohydrate</td>
          <td className="py-3 px-4 text-left">19g</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">Dietary Fiber</td>
          <td className="py-3 px-4 text-left">3g</td>
        </tr>
        <tr>
          <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">Sugars</td>
          <td className="py-3 px-4 text-left">4g</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-left font-medium text-gray-600">Protein</td>
          <td className="py-3 px-4 text-left">22g</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
