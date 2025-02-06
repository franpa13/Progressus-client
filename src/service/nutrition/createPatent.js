

import { api } from "../api";

// TRAER METRIC DEL USER
export const createPatent= async (form) => {
    console.log(form , "form");
    
    try {
        const response = await api.post(`/CrearPaciente?Nombre=${form.nombre}&Objetivo=${form.objetivo}&PorcentajeDeGrasa=${form.porcentajeDeGrasa}&Edad=${form.edad}&Peso=${form.peso}`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};


