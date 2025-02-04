export const useCalculatorMacros = (comidas) => {
    let totalMacros = {
        kcal: 0,
        grasas: 0,
        carbohidratos: 0,
        proteinas: 0
    };

    comidas.forEach((comida) => {
        const alimentosFiltrados = alimentos
            .filter(a => a.dia === day) // Filtra los alimentos por día
            .flatMap(a => a.comidas) // Extrae todas las comidas de ese día
            .find(c => c.tipoComida === comida.name)?.alimentos || []; // Encuentra la comida y extrae los alimentos

        alimentosFiltrados.forEach(alimento => {
            totalMacros.kcal += alimento.kcal || 0;
            totalMacros.grasas += alimento.grasas || 0;
            totalMacros.carbohidratos += alimento.carbohidratos || 0;
            totalMacros.proteinas += alimento.proteinas || 0;
        });
    });

    return totalMacros;
};