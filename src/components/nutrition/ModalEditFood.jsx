import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useEditFood } from "../../service/nutrition/useEditFood";
import { useGetFood } from "../../service/nutrition/useGetFood";

export const ModalEditFood = ({ open, setOpen, elementEditable, setFood }) => {

    if (!elementEditable) return null;


    const [load, setLoad] = useState(false)

    const [form, setForm] = useState({
        alimento: elementEditable?.nombre || "",
        porcion: elementEditable?.porcion || 0,
        calorias: elementEditable?.calorias || 0,
        carbohidratos: elementEditable?.carbohidratos || 0,
        proteinas: elementEditable?.proteinas || 0,
        grasas: elementEditable?.grasas || 0,
    });


    useEffect(() => {
        setForm({
            limento: elementEditable?.nombre || "",
            porcion: elementEditable?.porcion || 0,
            calorias: elementEditable?.calorias || 0,
            carbohidratos: elementEditable?.carbohidratos || 0,
            proteinas: elementEditable?.proteinas || 0,
            grasas: elementEditable?.grasas || 0,
        });
    }, [elementEditable]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        setLoad(true)
        e.preventDefault();
        try {

            const resp = await useEditFood(form, elementEditable)
            console.log(resp, "Res");
            if (resp.status == 200 || resp.status == 201 || resp.status == "200" || resp.status == "201") {
                const response = await useGetFood()

                if (resp) {

                    setFood(response.data)
                }
            }
        } catch (e) {
            console.log(e, "errores");

        } finally {
            setLoad(false)
            setOpen(false);
        }

    };

    return (
        <ModalLayout Icon={MdOutlineEdit} open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Editar alimento:</span>
                <span className="font-bold text-xl text-center text-customTextGreen">
                    {elementEditable?.nombre}
                </span>
            </div>
            <form >
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
                        type="number"
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
                        type="number"
                        name="grasas"
                        value={form.grasas}
                        onChange={handleChange}
                        placeholder="Grasas"
                        label="Grasas"
                        className="mb-4"
                    />
                </div>
                <ButtonSpinner loading={load} onClick={handleSubmit} label="Guardar Cambios" />
            </form>
        </ModalLayout>
    );
};
