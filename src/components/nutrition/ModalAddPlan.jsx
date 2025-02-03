import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { CustomInput } from '../ui/input/CustomInput';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
import { useCrearPlan, useStoreNutrition, useStorePlanForView } from '../../store/useStoreNutrition';
import { useNavigate } from 'react-router-dom';
export const ModalAddPlan = ({ open, setOpen }) => {
    const namePlan = useStoreNutrition(state => state.nombrePlanNutrition);
    const limpiarAlimentos = useCrearPlan(state => state.limpiarAlimentos);
    const setIsEditable = useStorePlanForView((state) => state.setIsEditable);
    const setNombre = useStoreNutrition(state => state.setNombre);
    const navigate = useNavigate();
    // Estado del formulario inicializado con los datos del nuevo plan
    const [form, setForm] = useState({
        nombre: ""
    });


    useEffect(() => {
        setForm({
            nombre: ""
        });
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "number" ? Number(value) : value, // Convierte a número si el tipo es "number"
        }));
    };


    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        limpiarAlimentos()
        console.log("limpiaaaa");
        
        setNombre(form.nombre); // actualizar el localstorage
        setOpen(false); // Cerrar el modal después de guardar
        setIsEditable(true);
        navigate("/plansnutrition/createplannutrition")
    };


    return (
        <ModalLayout open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Agregar plan:</span>

            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="porcion">
                        Nombre
                    </label>
                    <CustomInput
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        label="Nombre"
                        className="mb-4"
                    />
                </div>
                <div className='flex justify-center'>
                    <ButtonSpinner label="Añadir plan" type="submit" />

                </div>
            </form>

        </ModalLayout>
    )
}
