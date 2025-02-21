import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useCreateFood } from "../../service/nutrition/useCreateFood";
import { useGetFood } from "../../service/nutrition/useGetFood";
export const ModalAddFood = ({ open, setOpen, setData }) => {
    const [load, setLoad] = useState(false)
    const [form, setForm] = useState({
        alimento: "",
        porcion: 0,
        calorias: 0,
        carbohidratos: 0,
        proteinas: 0,
        grasas: 0,
    });

    useEffect(() => {
        setForm({
            alimento: "",
            porcion: 0,
            calorias: 0,
            carbohidratos: 0,
            proteinas: 0,
            grasas: 0,
        });
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "number" ? Number(value) : value,
        }));
    };


    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        setLoad(true)
        e.preventDefault();
        try {
            const resp = await useCreateFood(form)
            if (resp && resp.status == 201 || resp.status == "201") {
                const responseData = await useGetFood()
                console.log(responseData, "response al crear");
                if (responseData) {

                    setData(responseData.data)
                }

            }

        } catch (e) {
            console.log(e, "err");

        } finally {
            setOpen(false);
            setLoad(false)
            setForm({
                alimento: "",
                porcion: 0,
                calorias: 0,
                carbohidratos: 0,
                proteinas: 0,
                grasas: 0,
            });
        }



    };
    console.log(typeof (form.calorias), "form");

    return (
        <ModalLayout Icon={MdOutlineEdit} open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl">Agregar alimento:</span>

            </div>
            <form >
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
                <ButtonSpinner loading={load} onClick={handleSubmit} label="Guardar Cambios" />
            </form>
        </ModalLayout>
    );
};
