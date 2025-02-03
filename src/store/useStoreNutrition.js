import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Almacenar el nombre nada mas en el localstoarage 
export const useStoreNutrition = create(
    persist(
        (set) => ({
            nombrePlanNutrition: "",
            setNombre: (nuevoNombre) => set({ nombrePlanNutrition: nuevoNombre }),
        }),
        {
            name: "nombreplannutrition-storage",
            getStorage: () => localStorage,
        }
    )
);

export const useStoreDias = create(
    persist(
        (set) => ({
            planNutricional: {

                dias: [],
            },
            // Función para actualizar el plan nutricional completo
            setPlanNutricional: (nuevoPlan) => set({ planNutricional: nuevoPlan }),
            // Función para agregar un día al arreglo de días
            agregarDia: (nuevoDia) =>
                set((state) => ({
                    planNutricional: {
                        ...state.planNutricional,
                        dias: [...state.planNutricional.dias, nuevoDia],
                    },
                })),
            // Función para eliminar un día por su índice
            eliminarDia: (index) =>
                set((state) => ({
                    planNutricional: {
                        ...state.planNutricional,
                        dias: state.planNutricional.dias.filter((_, i) => i !== index),
                    },
                })),
            // Función para actualizar un día específico
            actualizarDia: (index, diaActualizado) =>
                set((state) => ({
                    planNutricional: {
                        ...state.planNutricional,
                        dias: state.planNutricional.dias.map((dia, i) =>
                            i === index ? diaActualizado : dia
                        ),
                    },
                })),
        }),
        {
            name: "plannutricional-storage", // Nombre del storage en localStorage
            getStorage: () => localStorage, // Usar localStorage como almacenamiento
        }
    )
);

export const useStorePlanForView = create(
    persist(
        (set) => ({
            planForView: [],
            setPlanForView: (plan) => set({ planForView: plan }),
            isEditable: false,
            setIsEditable: (isEditable) => set({ isEditable: isEditable })
        }),
        {
            name: "planforview-storage",
            getStorage: () => localStorage,
        }
    )
);



export const useCrearPlan = create(
    persist(
        (set, get) => ({
            alimentos: [],

            // Agregar alimento para un día y tipo de comida específicos
            agregarAlimento: (dia, tipoComida, nuevoAlimento) => {
                const alimentos = [...get().alimentos];

                // Buscar el día existente
                let diaExistente = alimentos.find(item => item.dia === dia);
                if (!diaExistente) {
                    diaExistente = { dia, comidas: [] };
                    alimentos.push(diaExistente);
                }

                // Buscar tipo de comida dentro del día
                let tipoExistente = diaExistente.comidas.find(comida => comida.tipoComida === tipoComida);
                if (!tipoExistente) {
                    tipoExistente = { tipoComida, alimentos: [] };
                    diaExistente.comidas.push(tipoExistente);
                }

                // Agregar el nuevo alimento al tipo de comida
                tipoExistente.alimentos.push(nuevoAlimento);

                set({ alimentos });
            },

            // Eliminar alimento del tipo de comida en un día específico
            eliminarAlimento: (dia, tipoComida, alimentoId) => {
                const alimentos = [...get().alimentos];

                const diaExistente = alimentos.find(item => item.dia === dia);
                if (diaExistente) {
                    const tipoExistente = diaExistente.comidas.find(comida => comida.tipoComida === tipoComida);
                    if (tipoExistente) {
                        tipoExistente.alimentos = tipoExistente.alimentos.filter(
                            alimento => alimento.alimentoId !== alimentoId
                        );
                    }
                }

                set({ alimentos });
            },

            limpiarAlimentos: () => {
                set({ alimentos: [] });
            },
            setAlimentos: (nuevosAlimentos) => {
                set({ alimentos: nuevosAlimentos });
            },
        }),
        {
            name: "crearplan-storage",
        }
    )
);


export const useEditPlan = create(
    persist(
        (set, get) => ({
            planEditado: null, // Almacena el plan que se está editando

            // Función para cargar un plan existente para editar
            cargarPlanParaEditar: (plan) => {
                set({ planEditado: plan });
            },

            // Función para actualizar un día específico en el plan editado
            actualizarDiaEnPlanEditado: (index, diaActualizado) => {
                const { planEditado } = get();
                if (planEditado) {
                    const nuevosDias = planEditado.dias.map((dia, i) =>
                        i === index ? diaActualizado : dia
                    );
                    set({ planEditado: { ...planEditado, dias: nuevosDias } });
                }
            },

            // Función para agregar un día al plan editado
            agregarDiaAlPlanEditado: (nuevoDia) => {
                const { planEditado } = get();
                if (planEditado) {
                    set({ planEditado: { ...planEditado, dias: [...planEditado.dias, nuevoDia] } });
                }
            },

            // Función para eliminar un día del plan editado
            eliminarDiaDelPlanEditado: (index) => {
                const { planEditado } = get();
                if (planEditado) {
                    const nuevosDias = planEditado.dias.filter((_, i) => i !== index);
                    set({ planEditado: { ...planEditado, dias: nuevosDias } });
                }
            },

            // Función para eliminar un alimento específico dentro de un día y tipo de comida
            eliminarAlimentoEnPlanEditado: (diaNombre, tipoComida, alimentoId) => {


                const { planEditado } = get();
                if (planEditado) {
                    const nuevosDias = planEditado.dias.map((dia) => {
                        if (dia.dia === diaNombre) {
                            const nuevasComidas = dia.comidas.map((comida) => {
                                if (comida.tipoComida === tipoComida) {
                                    const nuevosAlimentos = comida.alimentos.filter(
                                        (alimento) => alimento.alimentoId !== alimentoId
                                    );
                                    return { ...comida, alimentos: nuevosAlimentos };
                                }
                                return comida;
                            });
                            return { ...dia, comidas: nuevasComidas };
                        }
                        return dia;
                    });
                    set({ planEditado: { ...planEditado, dias: nuevosDias } });
                }
            },
            agregarAlimentoEnPlanEditado: (diaNombre, tipoComida, nuevoAlimento) => {
                console.log( "store" , diaNombre , tipoComida , nuevoAlimento);
                
                const { planEditado } = get();
                if (planEditado) {
                    const nuevosDias = planEditado.dias.map((dia) => {
                        if (dia.dia === diaNombre) {
                            const nuevasComidas = dia.comidas.map((comida) => {
                                if (comida.tipoComida === tipoComida) {
                                    return {
                                        ...comida,
                                        alimentos: [...comida.alimentos, nuevoAlimento],
                                    };
                                }
                                return comida;
                            });
                            return { ...dia, comidas: nuevasComidas };
                        }
                        return dia;
                    });
                    set({ planEditado: { ...planEditado, dias: nuevosDias } });
                }
            },

            // Función para limpiar el plan editado
            limpiarPlanEditado: () => {
                set({ planEditado: null });
            },
        }),
        {
            name: "editplan-storage", // Nombre del storage en localStorage
            getStorage: () => localStorage, // Usar localStorage como almacenamiento
        }
    )
);