import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";

export const ModalEditFood = ({ open, setOpen, elementEditable }) => {
    // Si no hay un elemento editable, no se renderiza nada
    if (!elementEditable) return null;
  console.log(elementEditable , "element editable");
  

    // Estado del formulario inicializado con los datos del elemento editable
    const [form, setForm] = useState({
        alimento: elementEditable?.nombre || "",
        porcion: elementEditable?.porcion || "",
        calorias: elementEditable?.calorias || "",
        carbohidratos: elementEditable.carbohidratos || "",
        proteinas: elementEditable?.proteinas || "",
        grasas: elementEditable?.grasas || "",
    });

    // Efecto para actualizar el formulario cuando cambie el elemento editable
    useEffect(() => {
        setForm({
            alimento: elementEditable?.nombre || "",
            porcion: elementEditable?.porcion || "",
            calorias: elementEditable?.calorias || "",
            carbohidratos: elementEditable.carbohidratos || "",
            proteinas: elementEditable?.proteinas || "",
            grasas: elementEditable?.grasas || "",
        });
    }, [elementEditable]);
    console.log(form, "form");
    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para guardar los cambios
        console.log("Formulario enviado:", form);
        setOpen(false); // Cerrar el modal después de guardar
    };

    return (
        <ModalLayout Icon={MdOutlineEdit} open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Editar alimento:</span>
                <span className="font-bold text-xl text-center text-customTextGreen">
                    {elementEditable?.nombre}
                </span>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold text-start w-full" htmlFor="porcion">
                        Porción:
                    </label>
                    <CustomInput
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
                        name="calorias"
                        type="number"
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
                     
                        value={form.carbohidratos}
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
