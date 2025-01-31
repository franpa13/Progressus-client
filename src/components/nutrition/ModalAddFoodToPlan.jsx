import React, { useEffect, useState } from 'react';
import { ModalLayout } from '../../layout/ModalLayout';
import { CustomInput } from '../ui/input/CustomInput';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
import { useCrearPlan, useEditPlan, useStoreNutrition, useStorePlanForView } from '../../store/useStoreNutrition';
import { SelectDef } from '../ui/select/SelectDef';
import { useGetFood } from '../../service/nutrition/useGetFood';
import { useNavigate } from 'react-router-dom';

export const ModalAddFoodToPlan = ({ editable, nombreDia, tipoComida, open, setOpen }) => {
    console.log(tipoComida, "tipocomiaaaa");
    
    const agregarAlimentos = useCrearPlan((state) => state.agregarAlimento);
    const agregarAlimentoEnPlanEditado = useEditPlan((state) => state.agregarAlimentoEnPlanEditado);
    const [alimentos, setAlimentos] = useState([]);
    const [form, setForm] = useState({
        alimentoId: "",
        alimentoNombre: "",
        medida: "", // Nuevo estado para la medida
        cantidad: "", // Nuevo estado para la cantidad
    });

    useEffect(() => {
        setForm({
            alimentoId: "",
            alimentoNombre: "",
            medida: "", // Nuevo estado para la medida
            cantidad: "", // Nuevo estado para la cantidad
        });
        const traerAlimentos = async () => {
            try {
                const data = await useGetFood();
                setAlimentos(data.data);
            } catch (e) {
                console.log(e, "errores");
            } finally {
                console.log("final");
            }
        };
        
        traerAlimentos();
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    // Manejar cambios en el SelectDef

    const handleSelectChange = (value) => {
        const alimentoSeleccionado = alimentos?.find((alimento) => alimento.nombre === value);
        setForm((prevForm) => ({
            ...prevForm,
            alimentoId: alimentoSeleccionado.id,
            alimentoNombre: alimentoSeleccionado.nombre,
        }));
    };
    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editable) {
            agregarAlimentoEnPlanEditado(nombreDia, tipoComida, form)
        }
        agregarAlimentos(nombreDia, tipoComida, form)
        setOpen(false);
        console.log("Formulario enviado:", form);
        // Aquí puedes agregar la lógica para manejar el formulario
    };


    return (
        <ModalLayout open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Agregar alimento</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                    <label className="font-semibold text-start w-full" htmlFor="alimento">
                        Alimento
                    </label>
                    <SelectDef
                        value={form.alimentoNombre}
                        onChange={(e) => handleSelectChange(e.target.value)}
                        label="Seleccione un alimento"
                        options={alimentos.map((alimento) => alimento.nombre)}
                        fullWidth={true}
                        sx={{ minWidth: 120 }}

                        fontWeight="bold"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className="font-semibold text-start w-full" htmlFor="medida">
                        Medida en gramos
                    </label>
                    <CustomInput
                        name="medida"
                        value={form.medida}
                        onChange={handleChange}
                        placeholder="Ingrese la medida"
                        type="number"
                        disabled={false}
                        className=""
                        required={true}
                        label="Medida"
                        classNameInput=""
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className="font-semibold text-start w-full" htmlFor="cantidad">
                        Cantidad
                    </label>
                    <CustomInput
                        name="cantidad"
                        value={form.cantidad}
                        onChange={handleChange}
                        placeholder="Ingrese la cantidad"
                        type="number"
                        disabled={false}
                        className=""
                        required={true}
                        label="Cantidad"
                        classNameInput=""
                    />
                </div>
                <div className='flex justify-center'>
                    <ButtonSpinner label="Añadir alimento" type="submit" />
                </div>
            </form>
        </ModalLayout>
    );
};