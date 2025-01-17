import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";

export const ModalAddFood = ({ open, setOpen }) => {
    // Si no hay un elemento editable, no se renderiza nada




    // Estado del formulario inicializado con los datos del elemento editable
    const [form, setForm] = useState({
        alimento: "",
        porcion :"",
        calorias : "",
        carbohidratos : "",
        proteinas : "",
        grasas : "",
    });

    // Efecto para actualizar el formulario cuando cambie el elemento editable
    useEffect(() => {
        setForm({
            alimento: "",
            porcion :"",
            calorias : "",
            carbohidratos : "",
            proteinas : "",
            grasas : "",
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
        // Aquí puedes implementar la lógica para guardar los cambios

        setOpen(false); // Cerrar el modal después de guardar
    };
    console.log(typeof (form.calorias), "form");

    return (
        <ModalLayout Icon={MdOutlineEdit} open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Agregar alimento:</span>

            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="porcion">
                        Nombre
                    </label>
                    <CustomInput
                        name="alimento"
                        value={form.alimento}
                        onChange={handleChange}
                        placeholder="Nombre"
                        label="Nombre"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="porcion">
                        Porción:
                    </label>
                    <CustomInput
                        type="number"
                        name="porcion"
                        value={form.porcion}
                        onChange={handleChange}
                        placeholder="Porción"
                        label="Porción"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="calorias">
                        Calorías:
                    </label>
                    <CustomInput
                        type="number"
                        name="calorias"

                        value={form.calorias}
                        onChange={handleChange}
                        placeholder="Calorías"
                        label="Calorías"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="calorias">
                        Carbohidratos
                    </label>
                    <CustomInput
                        name="carbohidratos"
                        type="number"

                        value={form?.carbohidratos}
                        onChange={handleChange}
                        placeholder="Carbohidratos"
                        label="Carbohidratos"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label
                        className="font-semibold text-start w-full"
                        htmlFor="proteinas"
                    >
                        Proteínas:
                    </label>
                    <CustomInput
                        name="proteinas"
                        type="number"
                        value={form.proteinas}
                        onChange={handleChange}
                        placeholder="Proteínas"
                        label="Proteínas"
                        className="mb-4"
                    />
                </div>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="grasas">
                        Grasas:
                    </label>
                    <CustomInput
                        name="grasas"
                        type="number"
                        value={form.grasas}
                        onChange={handleChange}
                        placeholder="Grasas"
                        label="Grasas"
                        className="mb-4"
                    />
                </div>
                <ButtonSpinner label="Guardar Cambios" type="submit" />
            </form>
        </ModalLayout>
    );
};
